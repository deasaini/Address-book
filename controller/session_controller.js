const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const db = require("./../db")

router.get("/login", (req, res) => {
  res.render("login")
})

router.post("/sessions", (req, res) => {
  const { username, password } = req.body
  console.log(req.body)
  // do you even existing the users table
  const sql = `SELECT * FROM users WHERE username = $1;`
  console.log(sql)
  db.query(sql, [req.body.username], (err, dbRes) => {
    // did we get a record back?
    if(err){
      console.log(err)
    }
    console.log(dbRes.rows)
    if (dbRes.rows.length == 0) {
      // no good, user doesn't exist in the users table, stay at the login page
      res.render("login")
      return
    }

    const user = dbRes.rows[0]

    bcrypt.compare(password, user.digested_password, (err, result) => {
      if (result) {
        console.log("Password matched!")
        req.session.userId = user.id
        res.redirect("/welcome")
      } 
      else {
        res.render("login")
      }
    })
  })
})

router.delete("/sessions", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login")
  })
})

module.exports = router