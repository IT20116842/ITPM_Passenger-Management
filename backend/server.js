const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors"); 
const user = require("./controllers/userController ");
const login = require("./controllers/loginController"); 
const booking = require("./controllers/bookingController"); 

dotenv.config();
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = process.env.PORT || "8070";
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(
  MONGODB_URI,
  { 
    useNewUrlParser: true,
    useUnifiedTopology: true, 
  },
  (error) => {
    if (error) {
      console.log("Database ERROR: ", error.message);
    }
  }
);

mongoose.connection.once("open", () => {
  console.log("Database Synced");
});

app.use("/userLogin", login); 
app.use("/user", user);  
app.use("/booking", booking); 

app.use(express.static("files")); 

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
