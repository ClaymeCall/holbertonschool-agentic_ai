// monitor.js
// Script de surveillance des tâches en temps réel pour un fichier tasks.json

const fs = require('fs');
const path = require('path');

// Chemin du fichier tasks.json (monté en volume dans le conteneur)
const TASKS_FILE = path.join(__dirname, 'tasks.json');

// Fonction pour formater la date au format [YYYY-MM-DD HH:MM:SS]
const formatDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `[${year}-${month}-${day} ${hours}:${minutes}:${seconds}]`;
};

// Fonction pour lire et analyser le fichier tasks.json
const checkTasks = () => {
    fs.readFile(TASKS_FILE, 'utf8', (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                console.log(`${formatDate()} Erreur: Le fichier ${TASKS_FILE} est introuvable.`);
            } else {
                console.log(`${formatDate()} Erreur: Le fichier ${TASKS_FILE} est corrompu ou illisible.`);
            }
            return;
        }

        try {
            const tasks = JSON.parse(data);
            const pendingTask = tasks.find(task => task.status === 'pending');

            if (pendingTask) {
                console.log(`${formatDate()} Action détectée: "${pendingTask.action}"`);
            } else {
                console.log(`${formatDate()} Aucune tâche en attente.`);
            }
        } catch (e) {
            console.log(`${formatDate()} Erreur: Le fichier ${TASKS_FILE} n'est pas un JSON valide.`);
        }
    });
};

// Vérification initiale
checkTasks();

// Surveillance périodique toutes les 5 secondes
setInterval(checkTasks, 5000);