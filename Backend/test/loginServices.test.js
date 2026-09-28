const loginServices = require("../modules/auth/service/loginServices");
const user = require("../modules/auth/Models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

jest.mock("../modules/auth/Models/user");
jest.mock("bcryptjs");
jest.mock("jsonwebtoken");

test("should return null when email does not exist", async () => {
  user.findOne.mockResolvedValue(null);

  const result = await loginServices("notfound@gmail.com", "123456");

  expect(result).toBeNull();
});

test("should return null when password is incorrect", async () => {
  user.findOne.mockResolvedValue({
    _id: "123",
    email: "test@gmail.com",
    password: "hashedPassword",
    role: "student",
  });

  bcrypt.compare.mockResolvedValue(false);

  const result = await loginServices("test@gmail.com", "wrongPassword");

  expect(result).toBeNull();
});


test("should return token and user when credentials are correct", async () => {
  user.findOne.mockResolvedValue({
    id: "123",
    email: "test@gmail.com",
    password: "hashedPassword",
    username: "Test User",
    role: "student",
  });

  bcrypt.compare.mockResolvedValue(true);

  jwt.sign.mockReturnValue("fakeToken");

  const result = await loginServices(
    "test@gmail.com",
    "correctPassword"
  );

  expect(result).toEqual({
    token: "fakeToken",
    user: {
      id: "123",
      username: "Test User",
      role: "student",
    },
  });
});
