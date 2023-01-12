const db = require('../db')

class UserController {
  async createUser(req, res) {
    const { username, passwords } = req.query;
    const newPerson = await db.query('INSERT INTO users (username, passwords) values ($1,$2) RETURNING *',[username,passwords])
    let usersArr = await db.query('SELECT * FROM users');
    console.log(usersArr.rows)
    res.json(newPerson.rows[0])
  }

}

module.exports = new UserController();
