require('dotenv').config()
const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')



const db = require('./database/config.db')



const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(fileUpload({
    useTempFiles: true
}))


//Routes

app.use("/users", require("./routes/user.route"))
app.use("/api", require("./routes/category.route"))
app.use("/api/admin", require("./routes/uploadImage.route"))
app.use("/api/admin", require("./routes/product.route"))




//Connect Mongoose
db.onConnection();

const port = process.env.PORT || 5000
// const port = 3001;


app.listen(port, ()=> {
    console.log(`Server listening on port ${port}`)
})

