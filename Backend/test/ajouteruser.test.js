const {
  AjouterUserServices,
} = require("../modules/admin/services/userService");
const user = require("../modules/auth/Models/user");

jest.mock("../modules/auth/Models/user");

test("should return email fond when email already exists", async () => {
  user.findOne.mockResolvedValue({
    email: "test@gmail.com",
  });

  const result = await AjouterUserServices(
    "Test User",
    "test@gmail.com",
    "123456",
    "student",
  );

  expect(result).toBe("email fond");
});
