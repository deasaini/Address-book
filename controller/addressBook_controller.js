const express = require("express")
const router = express.Router()
const ensureLoggedIn = require("./../middlewares/ensure_logged_in")
const db = require("./../db")


// route for landing page when user successfully logs in

router.post("/welcome", ensureLoggedIn, (req,res) => {
    const sql = "SELECT * FROM addressbook where userid = 1;"

db.query(sql,(err,dbRes) => {
    console.log(err);
    
    const allContacts = dbRes.rows
    console.log(allContacts);

    res.render("welcome", { allContacts: allContacts })

 })
})
/*
//Hack
router.post("/dummylogin/1", (req,res) => {
  const sql = "SELECT * FROM addressbook where userid = 1;"

db.query(sql,(err,dbRes) => {
  console.log(err);
  
  const allContacts = dbRes.rows
  console.log(allContacts);

  res.render("welcome", { allContacts: allContacts })

})
})
*/

/*
// route for signup

router.get("/signup", (req,res) => {
  res.render("signup")
})
*/



// route for landing page when user successfully logs in


// route for adding new contact


router.get("/add_contact/:userid",ensureLoggedIn, (req,res) => {
  const userid = req.params.userid
  console.log(req.params);
  console.log(`user id is ${userid}`)
  res.render("add_contact", { userid: userid })
})


router.post("/adddetails/:userid", (req,res) => {
  console.log(`inside add details for userid ${req.params.userid}`)

  console.log("Request is :" + req)

  const sql = `insert into addressbook (name, phone, address, email, userid) values ($1, $2, $3, $4, $5);`
  console.log(sql)
  db.query(sql, [req.body.name, req.body.phone, req.body.address, req.body.email, req.params.userid], (err, dbRes) => {
    console.log(`/dummylogin/${req.params.userid}`)
      res.redirect(`/dummylogin/${req.params.userid}`)
      console.log(err)
  })
})


// route for display edit page
router.get("/edit_contact/:id", (req,res) => {
  const sql = `SELECT * FROM addressbook where id = ${req.params.id};`
 console.log(sql);
db.query(sql, (err,dbRes) => {
    console.log(err);
    console.log(dbRes)
    const contactInfo = dbRes.rows[0]
    res.render("edit_contact", { contactInfo: contactInfo })

 })
})

// route for updating an existing contact
router.post("/editdetails/:id", (req,res) => {
console.log(`id is ${req.params.id}`)
  console.log("Request is :" + req)

  const sql = `UPDATE addressbook SET name = $1, phone = $2, address = $3, email = $4 WHERE id = ${req.params.id};`
  console.log("SQL query is: " + sql)
  console.log("Request body is : " + req.body)
  db.query(sql, [req.body.name, req.body.phone, req.body.address, req.body.email], (err, dbRes) => {

      const getUserId = `SELECT userid FROM addressbook WHERE id = ${req.params.id};`
      console.log(getUserId)
      db.query(getUserId, (error, res) => {
      const user = res.rows[0].userid
      console.log("User Id is " + user)
      //res.redirect(`/dummylogin/${res.rows[0].userid}`)
      //res.redirect(`/dummylogin/:userid`)

      })
      res.redirect(`/dummylogin/${user}`)  //Problem here//
      console.log(err)

  })
})


// route for deleting an existing contact
router.delete("/delete/:id", (req,res) => {
  console.log(req.params.id);
  console.log(req.body.id);
  const sql = `DELETE FROM addressbook WHERE id = ${req.params.id};`
  console.log(sql);
  db.query(sql, (err, dbRes) => {
    res.redirect("/dummylogin/:userid")
  })

})




















module.exports = router