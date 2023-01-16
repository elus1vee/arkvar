const Router = require("express");
const router = new Router();
const userExist = require('../modules/userExist')
const fileExist = require('../modules/fileExist')
const fs = require('fs')
const path = require("path");


const userController=require('../controllers/user.controller')

router.get("/", fileExist, userController.getPosts)
router.get("/:id", fileExist, userController.getOnePost)
router.post("/", [userExist], userController.createPost)
router.put("/", [userExist, fileExist], userController.updatePost)
router.delete("/:id", [userExist, fileExist], userController.deletePost)
router.post("/users", userController.createUser)

module.exports = router