const fs = require('fs');
// const index = fs.readFileSync('index.html', 'utf-8');
const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
const users = data.users;

//MVC model-view-controller
exports.createUser = (req, res) => {
    const newUser = req.body;
    users.push(newUser);
    res.status(201).json(newUser);
    //res.json({Message: 'Successfully added a new user.'});
}

exports.getAllUsers = (req, res) => {
    res.status(200).json(users);
}

exports.getUser = (req, res) => {
    const id = +req.params.id; //Converting the string id to numeric id
    const user = users.find((user) => user.id == id )
    res.status(200).json(user);
}

exports.replaceUser = (req, res) => {
    const id = +req.params.id; //Converting the string id to numeric id
    const userIndex = users.findIndex((user) => user.id === id );
    users.splice(userIndex, 1, {...req.body, id: id});
    res.status(201).json({ Message: "user is updated successfully."});
}

exports.updateUser = (req, res) => {
    const id = +req.params.id; //Converting the string id to numeric id
    const userIndex = users.findIndex((user) => user.id === id );
    const user = users[userIndex];
    users.splice(userIndex, 1, {...user, ...req.body});
    res.status(201).json({ Message: `user at index ${userIndex + 1} is updated successfully.`});
}

exports.deleteUser = (req, res) => {
    const id = +req.params.id; //Converting the string id to numeric id
    const userIndex = users.findIndex((user) => user.id === id );
    const user = users[userIndex];
    users.splice(userIndex, 1);
    res.status(200).json(user);
}