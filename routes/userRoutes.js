const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

router.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    const newUser = new User({ name, email, password });
    try {
        newUser.save();
        res.status(200).json({ success: true, message: 'Register Success' });
    } catch (error) {
        res.status(400).json({ message: error });
    }
});


router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.find({ email, password });
        if (user.length > 0) {
            const currentUser = {
                name: user[0].name,
                email: user[0].email,
                isAdmin: user[0].isAdmin,
                _id: user[0]._id
            }
            res.status(200).send(currentUser);
        } else {
            res.status(400).json({ message: 'Login Failed' });
        }
    } catch (error) {
        res.status(404).json({ message: error });
    }
});

router.get("/getallusers", async(req, res) =>{
    try {
        const users = await User.find({});
        res.status(200).send(users);
    } catch (error) {
        res.status(404).json({message:error.stack});
    }
});

router.post("/deleteuser", async (req, res) => {
    const {userid} = req.body;
    try {
      await User.findOneAndDelete({ _id: userid });
      res.status(200).send("User Deleted");
    } catch (error) {
      res.status(404).json({ message: error.stack });
    }
  });


  router.post("/edituser", async (req, res) => {
    const {user} = req.body;
    const userid = user._id;
    const userrole = user.isAdmin;
    try {
      const userD = await User.findOne({ _id: userid });
      userrole ? userD.isAdmin = false : userD.isAdmin = true;
      await userD.save();
      res.status(200).send("User Deleted");
    } catch (error) {
      res.status(404).json({ message: error.stack });
    }
  });


  router.post("/getsingleuser", async (req, res) => {
    const {userId} = req.body;
    try {
      const userr = await User.findOne({ _id: userId });
      res.status(200).send(userr);
    } catch (error) {
      res.status(404).json({ message: error.stack });
    }
  });

module.exports = router;