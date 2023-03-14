const express = require("express")

const router = express.Router()

const { Pool } = require("pg")

const db = new Pool({
  database: "addressbook_app",
})


// route for default landing page. Ask user to sign up or login
router.get("/", (req,res) => {
  res.render("home")
})


// route for landing page when user successfully logs in

router.post("/dummylogin", (req,res) => {
    const sql = "SELECT * FROM addressbook;"

db.query(sql,(err,dbRes) => {
    console.log(err);
    
    const AllContacts = dbRes.rows
    console.log(AllContacts);

    res.render("welcome", { AllContacts: AllContacts })

 })
})



// route for signup





// route for landing page when user successfully logs in


// route for adding new contact


// route for updating an existing contact


// route for deleting an existing contact






















module.exports = router