const bcrypt = require("bcrypt")
const express = require("express")
const router = express.Router()
const db = require("./../db")

// route for default landing page. Ask user to sign up or login
router.get("/", (req,res) => {
    res.render("login")
  })
  
  // route for new user sign up
  router.get("/signup", (req, res) => {
    res.render("signup")
  })
  

/* warning - will create multiple users with the same email */
router.post("/users", (req, res) => {
  const { name, username, password, passwordConfirmation } = req.body
    
  console.log("Request body for /users is: " + req.body)

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, digestedPassword) => {
      const sql = `
        insert into users (name, username, digested_password)
        values ($1, $2, $3) returning userid;
      `
    console.log(sql)
      db.query(sql, [name, username, digestedPassword], (err, dbRes) => {
        if (err) {
          console.log(err)
          res.render("signup")
        } else {
          req.session.userId = dbRes.rows[0].id
          res.redirect("/login")
        }
      })
    })
  })
})

module.exports = router

/*
router.delete("/users/:id") // delete a user
router.put("/users/:id") // update single user
router.get("/users/new") // get new user form
router.get("/users/:id/edit") // get existing user form
router.get("/users/:id") // get single user
*/