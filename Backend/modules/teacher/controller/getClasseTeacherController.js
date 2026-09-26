    const { AfficherClassesTeacherServices } = require("../services/getClasseTeacherServices");

    // afficher un class
    async function afficherUnClasseController(req, res) {
        
        const afficherUnClass = await AfficherClassesTeacherServices(req.user.id);
    if (afficherUnClass) {
        return res.status(200).json(afficherUnClass);
    }
    return res.status(400).json("class not fond");
    }
    module.exports = { afficherUnClasseController };
