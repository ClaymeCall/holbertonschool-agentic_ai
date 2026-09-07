const userRepository = require('../repositories/user.repository');

class DataExportService {
    async exportUsers() {
        const users = userRepository.findAll();
        if (!users.length) {
            throw new Error("Aucune donnée utilisateur à exporter");
        }
        return users;
    }
}

module.exports = new DataExportService();