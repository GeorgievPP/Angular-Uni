const authController = require("../controllers/authController");
const postsController = require("../controllers/postsController");
const commentsController = require("../controllers/commentsController");

module.exports = (app) => {
  app.use("/api/v1/auth", authController);
  app.use("/api/v1/posts", postsController);
  app.use("/api/v1/comments", commentsController);
};
