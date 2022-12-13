const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// contains all user routes built on top of "/auth"

// register
router.post("/", async (req, res) => {
    // console.log(req.body) // print body to console
    try {
      const { email, password, passwordVerify, nickname } = req.body; // hold in variables

      // validation
      if (!email || !password || !passwordVerify || !nickname) {
        return res
            .status(400)
            .json({ errorMessage: "Please enter all required fields." });
      }

      if(password.length < 6) {
        return res
          .status(400)
          .json({ errorMessage: "Please enter a password of at least 6 characters long." });
      }

      if(password !== passwordVerify) {
        return res
          .status(400)
          .json({errorMessage:"Enter same password twice",});
      }

      //check for existing account for email address, reurns promise
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
            errorMessage:"An account already exists for this email"
        });
      }

      // hash passwords
      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(password, salt);
      
      // save a user account to DB
      const newUser = new User({
        email, passwordHash, nickname
      });

      const savedUser = await newUser.save();

      // sign JWT token
      const token = jwt.sign({ user: savedUser._id }, process.env.JWT_SECRET); // user willbe assigned an _id at creation
      console.log(token)

      // send token in a HTTP-only cookie as a response
      res.cookie("token", token, {httpOnly: true} ).send();




      console.log(email)
    } catch (err) {
        console.log(err);
        res.status(500).send();
    }
    
});

// login

router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;

      // validate
      if (!email || !password) {
        return res
          .status(400)
          .json({ errorMessage: "Please enter all required fields." });
      }

      const existingUser = await User.findOne({ email });

      if (!existingUser) {
        return res
          .status(401)
          .json({ errorMessage: "Wrong email or password" });
      }

      const passwordCorrect = await bcrypt.compare(
        password,
        existingUser.passwordHash
      ); // will return true if password matches

      if (!passwordCorrect) {
        return res
          .status(401)
          .json({ errorMessage: "Wrong email or password" });
      }

      // at this point email and password have been validated
      // sign JWT token
      const token = jwt.sign({ user: existingUser._id }, process.env.JWT_SECRET);
      console.log(token);

      // send token in a HTTP-only cookie as a response
      res.cookie("token", token, { httpOnly: true }).send();

    } catch(err) {
        console.log(err);
        res.status(500).send();
    }
});

// logout -- clear cookie
router.get("/logout", (req, res) => {
    res.cookie("token", "", {
        httponly: true,
        expires: new Date(0)
    }).send()
});

// verify isLoggedIn
router.get("/loggedIn", (req, res) => {
  try {
    const token = req.cookies.token;

    // token null check
    if (!token) {
      return res.json(false); // will return 200, no errors when loged out but send false to the client
    }

    // verify token is correct
    jwt.verify(token, process.env.JWT_SECRET); // will throw error if token is not valid. If it does match, this will decode it

    res.send(true); // send true if the token is verified

  } catch (err) {
    console.log(err);
    res.json(false); // token not verified
  }
});

// function auth(req, res, next) {
//   try {
//     const token = req.cookies.token;

//     // token null check
//     if (!token) {
//       return res.status(401).json({ errorMessage: "Unauthorized" });
//     }

//     // verify token is correct
//     const verified = jwt.verify(token, process.env.JWT_SECRET); // will throw error if token is not valid. If it does match, this will decode it
//     // console.log(verified);
//     req.user = verified.user;
//     next(); // continue execution
//   } catch (err) {
//     console.log(err);
//     res.status(401).json({ errorMessage: "Unauthorized" });
//   }
// }


module.exports = router;