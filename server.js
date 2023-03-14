const express = require('express')
const app = express()
const port = 8080
const methodOverride = require("./middlewares/method_override")
//const logger = require("./middlewares/logger")
const bookController = require("./controller/addressBook_controller")

app.set("view engine", "ejs")
//app.use(logger)
app.use(express.static("public"))

app.use(express.urlencoded({ extended: true
}))

app.use(methodOverride)


app.use("/", bookController)

app.listen(port, () => {
    console.log(`listing on port ${port}`)
})