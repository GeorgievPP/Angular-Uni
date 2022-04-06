const router = require("express").Router();
const auth = require("../middlewares/auth");
const User = require("../models/User");
const authService = require("../services/auth");

router.post("/authtest", auth, (req, res) => {
  res.status(200).send("Welcome 🙌");
});

router.post("/login", async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  const user = await authService.loginUser(email, password);
  if (!user.token) {
    res.status(400).json(user);
  } else {
    res.cookie("authCookieName", user._id, { httpOnly: true });
    res.status(201).json(user);
  }
});

router.post("/register", async (req, res) => {
  console.log(req.body);
  const { fullName, email, password } = req.body;
  const user = await authService.createUser(fullName, email, password);

  if (!user.token) {
    res.status(400).json(user);
  } else if (user.token) {
    res.cookie("authCookieName", user._id, { httpOnly: true });
    res.status(201).json(user);
  } else {
    res.status(400).send("Something went wrong! 😢");
  }
});

router.post("/profile", async (req, res) => {
  const { userId } = req.body;
  const user = await authService.getUserById(userId);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(400).json("User does not exists");
  }
});

router.get("/start", async (req, res) => {
  // if (!req.user) {return;}
  // console.log('DDDD', req);
  // console.log(req.cookies.authCookieName);
  // res.clearCookie('authCookieName')
  // console.log(req.cookies.authCookieName);
  const userId = req.cookies.authCookieName;
  try {
    const user = await authService.getUserById(userId);
    if (user) {
      res.status(200).json(user);
    }
  } catch (error) {
    console.log(error.message);
    res.status(400).send(error.message);
  }
  // res.status(400).json("User does not exists");
});

router.get('/logout', (req, res) => {
  // res.clearCookie('authCookieName')
  
  // // res.status(204).end();
  console.log('tyka')
  console.log(req.cookies);
  res.clearCookie('authCookieName')
  .status(204)
  .end();
});

// router.post('/profile-posts', async (req, res) => {
//     const { userId } = req.body;
//     const user = await authService.getUserById(userId);
//     if(user){
//         res.status(200).json(user);
//     } else {
//         res.status(400).json("User does not exists");
//     }
// });

module.exports = router;
