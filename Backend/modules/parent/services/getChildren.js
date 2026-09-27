const parent = require("../../admin/Models/parent");

async function AfficherChildrenParentServices(userId) {
  const findParent = await parent.findOne({ user: userId });

  if (!findParent) {
    return [];
  }

  await findParent.populate({
    path: "students",
    populate: [
      {
        path: "user",
      },
      {
        path: "parent",
        populate: {
          path: "user",
        },
      },
    ],
  });
 
  return findParent.students;
}

module.exports = { AfficherChildrenParentServices };
