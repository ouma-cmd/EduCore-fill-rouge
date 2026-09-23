const user = require("../../auth/Models/user");
const hachPassword = require("../../auth/utils/hachPassword");
const parent = require("../Models/parent");
const Student = require("../Models/Student");
const teacher = require("../Models/teacher");

//ajouter user
async function AjouterUserServices(username, email, password, role) {
  const findEmail = await user.findOne({ email: email });

  if (findEmail) {
    return "email fond";
  }
  const hach = await hachPassword(password);
  const newUser = await user.create({ username, email, password: hach, role });
  return newUser;
}

// afficher users
async function AfficherUserServices(role, page = 1, limit = 5) {
  const skip = (page - 1) * limit;

  const filter = role ? { role } : {};
  const getUser = await user.find(filter).skip(skip).limit(limit);
  const totaleUser = await user.countDocuments(filter);

  return {
    getUser,
    currentPage: page,
    totaleUser,
    totalPages: Math.ceil(totaleUser / limit),
  };
}

// get user by id
async function afficherUserByIdServices(id) {
  const getUserById = await user.findById(id);
  if (!getUserById) {
    return "not fond";
  }
  return getUserById;
}

// modiffier user
async function modiffierUserByIdServices(id, userBody) {
  const ubdeteUser = await user.findByIdAndUpdate(id, userBody, { new: true });
  if (!ubdeteUser) {
    return "not fond ";
  }
  return ubdeteUser;
}

// supprimer user by Id
async function supprimerUserByIdServices(id) {
  const findUser = await user.findById(id);

  if (!findUser) {
    return "not found";
  }
  if (findUser.role === "student") {
    const student = await Student.findOne({ user: findUser._id });

    if (student) {
      // Remove student from parent
      if (student.parent) {
        await parent.findByIdAndUpdate(student.parent, {
          $pull: { students: student._id },
        });
      }

      // Remove student from teachers
      await teacher.updateMany(
        { students: student._id },
        { $pull: { students: student._id } },
      );

      // Delete student profile
      await Student.findByIdAndDelete(student._id);
    }
  }

  await user.findByIdAndDelete(id);

  return findUser;
}

module.exports = {
  AjouterUserServices,
  AfficherUserServices,
  afficherUserByIdServices,
  modiffierUserByIdServices,
  supprimerUserByIdServices,
};
