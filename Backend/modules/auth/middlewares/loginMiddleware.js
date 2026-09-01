const loginShema = require("../schemas/loginSchema");

async function loginSchema(req,res,next){
    try {
        
        const valid =await loginShema.validateAsync(req.body)
        next()
    } catch (error) {
        res.json({error})
    }
}
module.exports = loginSchema 