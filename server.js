const express = require('express')
const app = express()
const port = process.env.PORT || 8080
const session = require("express-session")
const MemoryStore = require("memorystore")(session)

const setCurrentUser = require("./middlewares/set_current_user")
const viewHelpers = require("./middlewares/view_helpers")
const logger = require("./middlewares/logger")

const methodOverride = require("./middlewares/method_override")

const bookController = require("./controller/addressBook_controller")
const sessionController = require("./controller/session_controller")
const userController = require("./controller/user_controller")

app.set("view engine", "ejs")
app.use(logger)
app.use(express.static("public"))

app.use(express.urlencoded({ extended: true
}))

app.use(methodOverride)
app.use(
    session({
      cookie: { maxAge: 86400000 },
      store: new MemoryStore({
        checkPeriod: 86400000, // prune expired entries every 24h
      }),
      secret: process.env.SESSION_SECRET || "mistyrose",
      resave: false,
      saveUninitialized: true,
    })
  )

  app.use(setCurrentUser)
  app.use(viewHelpers)

app.use("/", sessionController)
app.use("/", bookController)
app.use("/", userController)

app.listen(port, () => {
    console.log(`listing on port ${port}`)
})