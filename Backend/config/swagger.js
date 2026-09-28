const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "EduCore API",
      version: "1.0.0",
      description: "API documentation for EduCore School Management System",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },

  apis: [
    "./modules/auth/routes/*.js",
    "./modules/admin/routes/*.js",
    "./modules/teacher/routes/*.js",
    "./modules/student/routes/*.js",
    "./modules/parent/routers/*.js",
    "./modules/dashboard/router/*.js",
  ],
};

const swaggerSpec = swaggerJsdoc(options);
console.log("SWAGGER:", swaggerSpec);


module.exports = swaggerSpec;