const router = require("express").Router();
const auth = require("../middlewares/auth");
const postsService = require("../services/post");
const commentsService = require("../services/comment");

router.get("/all", async (req, res) => {
  const posts = await postsService.getAllPublicPosts();
  res.status(200).json(posts);
});

router.get("/:id", async (req, res) => {
  const post = await postsService.getPostById(req.params.id);
  res.status(200).json(post);
});

router.post("/profile-posts", async (req, res) => {
  try {
    const { userId } = req.body;
    const posts = await postsService.getAllProfilePosts(userId);
    res.status(200).json(posts);
  } catch (error) {
    console.log(error.message);
    res.status(400).send(error.message);
  }
});

router.post("/create", async (req, res) => {
  // middleware: auth
  try {
    // let comment = [];
    const { name, description, imageUrl, user_id, public, creatorName } =
      req.body;
    const post = await postsService.createPost(
      name,
      description,
      imageUrl,
      user_id,
      public,
      creatorName
    );
    res.status(200).json(post);
  } catch (error) {
    console.log(error.message);
    res.status(400).send(error.message);
  }
});

router.post("/like", async (req, res) => {
  // middleware: auth
  try {
    const { postId, email } = req.body;
    console.log(postId, email);

    const updatedPost = await postsService.addMemberToPost(postId, email);
    res.status(200).json(updatedPost);
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .send("An error has occurred while adding a new member to the post!");
  }
});

router.post("/unlike", async (req, res) => {
  // middleware: auth
  try {
    const { postId, email } = req.body;
    const groupMembers = await postsService.removeMemberFromPost(
      postId,
      email
    );
    res.status(200).json(groupMembers);
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .send("An error has occurred while removing a member from the post!");
  }
});

router.post("/delete", async (req, res) => {
  // middleware: auth
  try {
    console.log(req.body);
    const { id } = req.body;
    console.log(id);
    const result = await postsService.deletePost(id);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(400).send("An error has occurred while deleting the post!");
  }
});

router.post("/edit", async (req, res) => {
  // middleware: auth
  try {
    const { projectId, name, description, imageUrl, public, data } = req.body;
    let post = {};
    console.log(req.body);
    if (data) {
      const updateData = {
        name,
        description,
        imageUrl,
        public,
        data,
      };
      post = await postsService.editPost(projectId, updateData);
    } else {
      const updateData = {
        name,
        description,
        imageUrl,
        public,
      };
      post = await postsService.editPost(projectId, updateData);
    }
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.status(400).send("An error has occurred while editing the project!");
  }
});

module.exports = router;
