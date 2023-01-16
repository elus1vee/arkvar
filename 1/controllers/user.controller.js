const db = require('../db')

class UserController {
  async createUser(req, res) {
    const { username, passwords } = req.query;
    const newPerson = await db.query('INSERT INTO users (username, passwords) values ($1,$2) RETURNING *',[username,passwords])
    let usersArr = await db.query('SELECT * FROM users');
    console.log(usersArr.rows)
    res.json(newPerson.rows[0])
  }
  async createPost(req,res){
    const {title,description} = req.body;
    const newPost = await db.query('INSERT INTO post (title, description) values ($1,$2) RETURNING *',[title,description])
    res.json("Post created!")
  }
  async getPosts(req,res){
    const posts = await db.query('SELECT * FROM post')
    res.json(posts.rows)
  }
  async getOnePost(req,res){
    const id = req.params.id
    const post = await db.query('SELECT * FROM post where id = $1',[id])
    res.json(post.rows[0])
  }
  async updatePost(req,res){
    const {id,title,description} = req.body
    const post = await db.query('UPDATE post set title = $1, description = $2 where id = $3 RETURNING *',[title,description,id])
    res.json(post.rows[0])
  }
  async deletePost(req,res){
    const id = req.params.id
    const post = await db.query('DELETE FROM post where id = $1',[id])
    res.json(post.rows[0])
  }
  
}

module.exports = new UserController();
