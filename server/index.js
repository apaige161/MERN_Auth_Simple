const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");

//execute dotenv
dotenv.config();

// server setup and start
const app = express();
const PORT = process.env.PORT || 5000; // use environment var PORT if it is defined

app.listen(PORT, () => console.log(`Server Started on: ${PORT}`)) 

// generic middleware
app.use(express.json());
app.use(cookieParser());

// allow http requests from this trusted website 
app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true // allows to send cookies with credentials to the origin defined here ^^
}));

// connect to DB
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MDB_CONNECT, (err) => {
    if(err) return console.error(err);
    console.log("Connected to mongoDB")
});

// middleware

// set up routes
app.use("/auth", require("./routers/userRouter"));
app.use("/customer", require("./routers/customerRouter")); // PROTECTED - in middleware
