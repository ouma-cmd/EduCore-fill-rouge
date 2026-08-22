const parent = require("../Models/parent");
const User = require("../../auth/Models/user");
const Student = require("../Models/Student");

async function ajouterparentServices({ userId, phone }) {
  console.log(userId, phone);

  const userI = await User.findById(userId);
  if (!userI || userI.role !== "parent") {
    return null;
  }


  const creatParent = await parent.create({
    user: userId,
    phone,
  });

  return creatParent;
}

async function afficherTousParent() {
  const getparent = await parent.find();
  if (!getparent) {
    return null;
  }
  return getparent;
}

async function afficherUnParent(id) {
  const getParentById = await parent.findById(id);
  if (!getParentById) {
    return null;
  }
  return getParentById;
}

async function updateParentServices(id, idStudent, newParent, phone) {
  const updetParent = await parent.findById(id);
  if (!updetParent) {
    return null;
  }
  const studentFind = updetParent.students;

  console.log("1");

  const oldStudent = await parent.findByIdAndUpdate(id, {
    $pull: {
      students: idStudent,
    },
  });
  console.log("2");
  const newStudentt = await parent.findByIdAndUpdate(
    newParent,
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
  console.log("3");
  const updatedStudent = await Student.findByIdAndUpdate(idStudent, {
    $set: {
      parent: newParent,
    },
  });
  const parentId = await parent.findById(newParent);
  return parentId;
}

async function deleParentServices(id, idStudent) {
  const deletParent = await parent.findById(id);
  if (!deletParent) {
    return null;
  }
  const findStudent = await Student.findById(idStudent);

  const deletStudent = await Student.findByIdAndUpdate(idStudent, {
    $pull: {
      parent: id,
    },
  });
  const removeParent = await parent.findByIdAndDelete(id)
  return removeParent
}

module.exports = {
  ajouterparentServices,
  afficherTousParent,
  afficherUnParent,
  updateParentServices,
  deleParentServices,
};
