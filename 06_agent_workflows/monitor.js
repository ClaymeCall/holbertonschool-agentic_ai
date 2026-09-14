// monitor.js
// Script de surveillance des tâches en temps réel pour un fichier tasks.json

const fs = require('fs').promises;
const path = require('path');
const winston = require('winston');

// Configuration du logger
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ level, message, timestamp }) => {
            return `[${timestamp}] ${level}: ${message}`;
        })
    ),
    transports: [new winston.transports.Console()],
});

// Validation des variables d'environnement
if (!process.env.TASKS_FILE) {
    logger.error('La variable d\'environnement TASKS_FILE est requise.');
    process.exit(1);
}

// Chemin du fichier tasks.json (monté en volume dans le conteneur)
const TASKS_FILE = process.env.TASKS_FILE;

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
const checkTasks = async () => {
    try {
        const data = await fs.readFile(TASKS_FILE, 'utf8');
        const tasks = JSON.parse(data);
        const pendingTask = tasks.find(task => task.status === 'pending');

        if (pendingTask && pendingTask.action) {
            logger.info(`Action détectée: "${pendingTask.action}"`);
        } else {
            logger.info('Aucune tâche en attente.');
        }
    } catch (err) {
        if (err.code === 'ENOENT') {
            logger.error(`Le fichier ${TASKS_FILE} est introuvable.`);
        } else if (err instanceof SyntaxError) {
            logger.error(`Le fichier ${TASKS_FILE} n'est pas un JSON valide.`);
        } else {
            logger.error(`Le fichier ${TASKS_FILE} est corrompu ou illisible.`);
        }
    }
};

// Vérification initiale
checkTasks().catch(logger.error);

// Surveillance périodique toutes les 5 secondes
setInterval(async () => {
    await checkTasks();
}, 5000);