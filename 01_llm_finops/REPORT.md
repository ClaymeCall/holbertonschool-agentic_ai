# Rapport — Ambiguïté des prompts techniques et divergence architecturale

## 1. Prompt flou utilisé

> « Écris un script pour scraper une page web et sauvegarder les données, en gérant les erreurs. »

Aucune précision : format de sortie, structure de la page, volume, fréquence, contraintes légales/éthiques, résilience attendue.

## 2. Modèles testés

- **IA généraliste** (assistant conversationnel non spécialisé code)
- **IA spécialisée code** (assistant orienté génie logiciel)

## 3. Sorties produites (reconstituées)

### 3.1 IA généraliste
```python
import requests
from bs4 import BeautifulSoup
import csv

def scrape_page(url):
    try:
        response = requests.get(url)
        response.raise_for_status()
    except Exception as e:
        print(f"Erreur : {e}")
        return None
    soup = BeautifulSoup(response.text, "html.parser")
    data = []
    for item in soup.select(".item"):
        try:
            data.append({
                "title": item.select_one(".title").text.strip(),
                "price": item.select_one(".price").text.strip(),
            })
        except AttributeError:
            continue
    return data

def save_to_csv(data, filename="output.csv"):
    if not data:
        return
    with open(filename, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=data[0].keys())
        writer.writeheader()
        writer.writerows(data)

if __name__ == "__main__":
    save_to_csv(scrape_page("https://example.com/products"))
```
Script procédural simple, `try/except` génériques + `print`, sélecteurs CSS inventés, sortie CSV arbitraire, pas de retry/délai/robots.txt.

### 3.2 IA spécialisée code
```python
import argparse, json, logging, time
from dataclasses import dataclass, asdict
from pathlib import Path
from urllib.robotparser import RobotFileParser
from urllib.parse import urlparse
import requests
from requests.adapters import HTTPAdapter, Retry
from bs4 import BeautifulSoup

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class ScrapingError(Exception): pass

@dataclass
class Record:
    title: str
    price: str

def build_session(retries=3, backoff=0.5):
    session = requests.Session()
    retry = Retry(total=retries, backoff_factor=backoff, status_forcelist=[429,500,502,503,504])
    session.mount("https://", HTTPAdapter(max_retries=retry))
    session.headers.update({"User-Agent": "MyScraperBot/1.0"})
    return session

def is_allowed_by_robots(url, ua="*"):
    parsed = urlparse(url)
    rp = RobotFileParser()
    rp.set_url(f"{parsed.scheme}://{parsed.netloc}/robots.txt")
    try:
        rp.read()
    except Exception:
        return True
    return rp.can_fetch(ua, url)

def scrape_page(session, url):
    if not is_allowed_by_robots(url):
        raise ScrapingError(f"Interdit par robots.txt: {url}")
    response = session.get(url, timeout=10)
    response.raise_for_status()
    soup = BeautifulSoup(response.text, "lxml")
    records = []
    for item in soup.select(".item"):
        t, p = item.select_one(".title"), item.select_one(".price")
        if t and p:
            records.append(Record(t.get_text(strip=True), p.get_text(strip=True)))
    time.sleep(1)
    return records

def save_to_json(records, path: Path):
    path.write_text(json.dumps([asdict(r) for r in records], ensure_ascii=False, indent=2))

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("url")
    parser.add_argument("-o", "--output", default="output.json", type=Path)
    args = parser.parse_args()
    save_to_json(scrape_page(build_session(), args.url), args.output)

if __name__ == "__main__":
    main()
```
Architecture modulaire (session dédiée, exception custom, dataclass), retry+backoff, vérification robots.txt, `lxml`, logging structuré, CLI via argparse, sortie JSON arbitraire.

## 4. Résumé des différences

| Axe | Généraliste | Spécialisé code |
|---|---|---|
| Structure | Script linéaire | Modules, classes, CLI |
| Erreurs | `try/except` + `print` | Exception dédiée, logging, retry/backoff |
| Sortie | CSV (non demandé) | JSON (non demandé) |
| Parseur | `html.parser` | `lxml` (dépendance non signalée) |
| Éthique/légal | Aucune | robots.txt, User-Agent, délai |
| Configurabilité | URL en dur | URL en argument CLI |

Le généraliste produit un script démonstratif mais fragile ; le spécialisé produit une base industrialisable, mais comble le flou par des conventions d'ingénierie non demandées plutôt que par une clarification.

## 5. Problèmes / choix arbitraires identifiés

1. **Format de sortie inventé** sans consensus (CSV vs JSON) — risque de casser une intégration en aval.
2. **Sélecteurs CSS fictifs** (`.item`, `.title`, `.price`) : hallucination fonctionnelle, code plausible mais inutilisable sur un site réel.
3. **Dépendance ajoutée sans le signaler** (`lxml` chez le modèle spécialisé).
4. **Décision de conformité unilatérale** (robots.txt) : pertinente en soi, mais suppose un contexte (site tiers public) non confirmé — inadaptée si le script visait un intranet.

## 6. Auto-évaluation

Deux hallucinations/hypothèses arbitraires ressortent : (1) la structure HTML inventée par les deux modèles (classes CSS fictives), qui donne une fausse impression de fiabilité à un code non testable en l'état ; (2) les décisions unilatérales du modèle spécialisé (retry, délai, robots.txt), pertinentes en théorie mais reposant sur une hypothèse de contexte non vérifiée (scraping externe à grande échelle). Un prompt flou est dangereux en production car chaque modèle comble les zones d'ombre avec des conventions différentes et non explicites, produisant des livrables syntaxiquement propres mais fonctionnellement divergents (sortie, dépendances, comportement réseau). Sans spécification explicite du contexte, le risque n'est pas un bug visible mais un écart silencieux entre l'intention et le comportement réel du code déployé.