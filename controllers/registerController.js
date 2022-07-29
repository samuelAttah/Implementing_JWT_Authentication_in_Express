const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const fsPromises = require("fs").promises;
const path = require("path");
const bcrypt = require("bcrypt");

//handler for new user information
const handleNewUser = async (req, res) => {
  const { username, password } = req.body;
  if (!(username && password))
    return res
      .status(400)
      .json({ message: "Username and Password are required" });
  //check for duplicate usernames in the db
  const duplicate = usersDB.users.find(
    (person) => person.username === username
  );
  if (duplicate)
    return res.status(409).json({ message: "Username already exists" }); //status code 409 stands for conflict
  try {
    //encrypt password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);
    //store new user
    const newUser = { username: username, password: hashedPassword };
    usersDB.setUsers([...usersDB.users, newUser]);

    await fsPromises.writeFile(
      path.join(__dirname, "../model", "users.json"),
      JSON.stringify(usersDB.users)
    );
    console.log(usersDB.users);

    res
      .status(201)
      .json({ success: `New User ${username} Created!`, data: newUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { handleNewUser };
