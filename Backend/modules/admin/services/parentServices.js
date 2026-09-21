const Parent = require("../Models/parent");
const User = require("../../auth/Models/user");
const Student = require("../Models/Student");

async function ajouterparentServices({ userId, studentId, phone }) {
  console.log(userId,studentId, phone);

  const userI = await User.findById(userId);
  if (!userI || userI.role !== "parent") {
    return null;
  }

  const creatParent = await Parent.create({
    user: userId,
    students: [studentId],
    phone,
  });

  return creatParent;
}

async function afficherTousParent() {
  const getparent = await Parent.find()
    .populate("user", "username email")
    .populate({
      path: "students",
      populate: {
        path: "user",
        select: "username",
      },
    });

  if (!getparent) {
    return null;
  }
  return getparent;
}

async function afficherUnParent(id) {
  const getParentById = await Parent.findById(id);
  if (!getParentById) {
    return null;
  }
  return getParentById;
}

async function updateParentServices(id, idStudent, phone, username, email) {
  const updetParent = await Parent.findById(id);
  if (!updetParent) {
    return null;
  }

  console.log("1");

  const updatedParent = await Parent.findByIdAndUpdate(
    id,
    {
      $addToSet: {
        students: idStudent,
      },
      $set: {
        phone: phone,
      },
    },
    {
      new: true,
    },
  );

  const updatedUser = await User.findByIdAndUpdate(
    updatedParent.user,
    {
      $set: {
        username: username,
        email: email,
      },
    },
    {
      new: true,
    },
  );
  const updatedStudent = await Student.findByIdAndUpdate(idStudent, {
    $set: {
      parent: id,
    },
  });
  return updatedParent;
}

async function deleParentServices(id, idStudent) {
  const deletParent = await Parent.findById(id);
  if (!deletParent) {
    return null;
  }
  await Student.updateMany({ parent: id }, { $unset: { parent: 1 } });
  const removeParent = await Parent.findByIdAndDelete(id);
  return removeParent;
}

module.exports = {
  ajouterparentServices,
  afficherTousParent,
  afficherUnParent,
  updateParentServices,
  deleParentServices,
};
