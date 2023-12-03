const jwt = require("jsonwebtoken");
const model = require("../model/user");
const User = model.User;

//MVC model-view-controller
exports.createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    var token = jwt.sign({ email: req.body.email }, "Shhhh");
    user.token = token;
    const output = await user.save();
    console.log(output);
    return res.status(200).json({ Message: "Successfully added a new user." });
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
