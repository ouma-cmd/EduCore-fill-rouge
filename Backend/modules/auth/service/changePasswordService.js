const user = require("../Models/user");
const bcrypt = require("bcryptjs");
const hachPassword = require("../utils/hachPassword");

async function changePasswordService(id, oldPassword, newPassword) {
    const userId = await user.findById(id);
    const compare = await bcrypt.compare(oldPassword, userId.password)
    if(!compare){
        return "password not right"
    }
    const hach  = await hachPassword(newPassword)
 userId.password = hach;
await userId.save()
return "Password changed successfully"
}
module.exports = changePasswordService;
