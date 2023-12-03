const fs = require('fs');
// const index = fs.readFileSync('index.html', 'utf-8');
// const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
// const users = data.users;

const model = require("../model/user");
const User = model.User;

//MVC model-view-controller
exports.createUser = async (req, res) => {

    try {
        const user = new User(req.body);
        const output = await user.save();
        console.log(output);
        return res
          .status(200)
          .json({ Message: "Successfully added a new user." });
      } catch (error) {
        console.log(error);
        return res.sendStatus(400);
      }
}

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
      } catch (error) {
        console.log(error);
        return res.sendStatus(400);
      }
}

exports.getUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);
        res.status(200).json(user);
      } catch (error) {
        console.log(error);
        return res.sendStatus(400);
      }
}
// PUT request http://localhost:8800/users/656cad361a311d9318ffd41a
exports.replaceUser = async (req, res) => {
    try {
        const id = req.params.id; 
        const result = await User.findOneAndReplace({ _id: id }, req.body, {new: true});
        return res.status(201).json(result);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

// PATCH request http://localhost:8800/users/656cad361a311d9318ffd41a
exports.updateUser = async (req, res) => {
    try {
        const id = req.params.id; 
        const result = await User.findOneAndUpdate({ _id: id }, req.body, {new: true});
        return res.status(201).json(result);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const id = req.params.id; 
        const result = await User.findOneAndDelete({ _id: id });
        return res.status(201).json(result);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}