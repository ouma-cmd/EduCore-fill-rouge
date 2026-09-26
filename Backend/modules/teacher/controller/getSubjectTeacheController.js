const { AfficherSabjectTeacherServices } = require("../services/getSubjectsTeacherServices");

    // afficher un class
    async function afficherSubejctController(req, res) {
        
        const afficherSubject = await AfficherSabjectTeacherServices(req.user.id);
    if (afficherSubject) {
        return res.status(200).json(afficherSubject);
    }
    return res.status(400).json("class not fond");
    }
    module.exports = { afficherSubejctController };
