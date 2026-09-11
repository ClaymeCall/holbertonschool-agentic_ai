## Nom du tool
`update_customer_status`

## Vérifications
Avant d'accepter l'éxecution du tool, j'ai vérifié son nom et l'input de l'agent :

 Run update_customer_status

crm-server (MCP Server)
Met à jour le statut d'un client via son email.

Input:
```
{
    "email: "dev@entreprise.com",
    "new_status": "Inactif"
}

Note that MCP servers or malicious conversation content may attempt to misuse 'Code' through tools.

Output:
```
Le statut du client dev@entreprise.com a été mis à jour vers Inactif.
```

## Résultat
Le statut du client dev@entreprise.com a été mis à jour vers Inactif.

