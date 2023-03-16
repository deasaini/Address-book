const express = require("express")
const router = express.Router()
const ensureLoggedIn = require("./../middlewares/ensure_logged_in")
const db = require("./../db")


// route for landing page when user successfully logs in

router.get("/welcome/:userid", ensureLoggedIn, (req,res) => {
  console.log("Inside Welcome path")
  console.log(req.params.userid)
  const sql = `SELECT * FROM addressbook where "userid" = ${req.params.userid};`
  console.log(`Query for welcome page is ${sql}`)
  db.query(sql, (err,dbRes) => {
  console.log(err);
  console.log(`Request is for user id ${req.params.userid}`)
  const allContacts = dbRes.rows
  allContacts.userid = req.params.userid
  console.log(allContacts);
  res.render("home", { allContacts: allContacts })
 
})
})



// route for adding new contact

router.get("/addcontact/:userid", ensureLoggedIn, (req,res) => {
  const userid = req.params.userid
  console.log(req.params);
  console.log(`user id is ${userid}`)
  res.render("add_contact", { userid: userid })
})



router.post("/adddetails/:userid", ensureLoggedIn, (req,res) => {
  console.log(`inside add details for userid ${req.params.userid}`)

  console.log("Request is :" + req)

  const sql = `insert into addressbook (name, phone, address, email, userid) values ($1, $2, $3, $4, $5);`
  console.log(sql)
  db.query(sql, [req.body.name, req.body.phone, req.body.address, req.body.email, req.params.userid], (err, dbRes) => {
    console.log(`/welcome/${req.params.userid}`)
    res.redirect(`/welcome/${req.params.userid}`)
    console.log(err)
  })
})



// route for display edit page

router.get("/edit_contact/:id", ensureLoggedIn, (req,res) => {

  const sql = `SELECT * FROM addressbook where "id" = ${req.params.id};`
 console.log(sql);
db.query(sql, (err,dbRes) => {
    console.log(err);
    console.log(dbRes)
    const contactInfo = dbRes.rows[0]
    res.render("edit_contact", { contactInfo: contactInfo })
 })
})




// route for updating an existing contact

router.put("/editdetails/:id", (req,res) => {
console.log(`id is ${req.params.id}`)

const sql = `UPDATE addressbook SET name = $1, "phone" = $2, "address" = $3, "email" = $4 WHERE "id" = ${req.params.id};`
console.log("SQL query is: " + sql)

db.query(sql, [req.body.name, req.body.phone, req.body.address, req.body.email], (err, dbRes) => {
  if(err){
    console.log("Error on update query")
    console.log(err)
  }
  })

  const getUserId = `SELECT userid FROM addressbook WHERE "id" = ${req.params.id};`

  db.query(getUserId, (err, dbRes) => {
  console.log("Inside getUserID query")
    if(err){  
    console.log(err)
  }
  console.log(dbRes.rows)
  const userid = dbRes.rows[0].userid
  console.log("User Id is " + userid)
  //res.redirect(`/welcome/${req.params.userid}`)
  res.redirect(`/welcome/${dbRes.rows[0].userid}`)

})

})


router.delete("/contacts/:id", (req, res) => {
  const getUserId = `SELECT userid FROM addressbook WHERE "id" = ${req.params.id};`

  db.query(getUserId, (err, dbRes) => {
  console.log("Inside getUserID query")
    if(err){  
    console.log(err)
  }
  console.log(dbRes.rows)
  const userid = dbRes.rows[0].userid
  console.log("User Id is " + userid)
  
  
  const sql = `DELETE FROM addressbook WHERE id = $1;`
  db.query(sql, [req.params.id], (err, dbRes) => {
    if(err){
      console.log(err);
    }
  })

  console.log("after deletion, User Id is " + userid)
  //res.redirect(`/welcome/${req.params.userid}`)
  res.redirect(`/welcome/${dbRes.rows[0].userid}`) 

})
  
})


module.exports = router