const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const model = require("../model/user");
const User = model.User;


//MVC model-view-controller
// POST http://localhost:8800/auth/signup
exports.createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    const token = jwt.sign({ email: req.body.email }, "Shhhh");
    const hash = bcrypt.hashSync(req.body.password, 10);
    user.token = token;
    user.password = hash;
    const output = await user.save();
    console.log(output);
    return res.status(200).json({ Message: "Successfully added a new user." });
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

// POST http://localhost:8800/auth/login
exports.login = async (req, res) => {
  try {
    const user = await User.findOne({email: req.body.email});
    if(user) {
        const isAuth = bcrypt.compareSync(req.body.password, user.password); //this will return trueor false
        if(isAuth) {
            const token = jwt.sign({ email: req.body.email }, "Shhhh");
            user.token = token;
            const result = await user.save();
            return res.status(200).json(result);
        } else {
            return res.sendStatus(400);
        }
    }
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
