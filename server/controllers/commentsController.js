const router = require("express").Router();
const commentsService = require("../services/comment");

router.post("/all", async (req, res) => {
  try {
    const { neshto } = req.body;
    const comments = await commentsService.getAllComments(neshto);
    res.status(200).json(comments);
  } catch (error) {
    console.log(error.message);
    res.status(400).send(error.message);
  }
});

router.post("/add-comment", async (req, res) => {
  try {
    const { description, author, jimHelper, post } = req.body;
    console.log("tyka");
    const newComment = await commentsService.createComment(
      description,
      author,
      jimHelper,
      post
    );
    res.status(200).json(newComment);
  } catch (error) {
    console.log(error.message);
    res.status(400).send(error.message);
  }
});

router.post("/del-comment", async (req, res) => {
  try {
    const { commentId } = req.body;
    console.log("tyka");
    const newComment = await commentsService.deleteComment(
     commentId
    );
    res.status(200).json(newComment);
  } catch (error) {
    console.log(error.message);
    res.status(400).send(error.message);
  }
});

module.exports = router;
