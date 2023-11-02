  // IMPORT FROM PACKAGES
  const express = require("express"); 
  const mongoose = require("mongoose");
const adminRouter = require("./routes/admin");
  // IMPORTS FROM OTHER FILES
  const authRouter = require("./routes/auth");
const productRouter = require("./routes/product");
const userRouter = require("./routes/user");
 
const cors = require('cors');

// INIT
//const PORT = 3000;
const PORT = process.env.PORT || 3000; // added by me 3000 was 5000
const app = express();
// const DB = "mongodb+srv://tushar:Tushar123@cluster0.2v3lyls.mongodb.net/?retryWrites=true&w=majority";
const DB = "mongodb+srv://xenonDB:Tushar123@cluster0.t86nc4o.mongodb.net/";

  // middleware
  //CLIENT -> SERVER -. CLIENT
  app.use(cors());
  app.use(express.json()); 
  app.use(authRouter); 
  app.use(adminRouter);  
  app.use(productRouter);  
  app.use(userRouter); 

  // CONNECTIONS
  mongoose.connect(DB).then(() => {
    console.log("Connection Successful");

  }).catch((e) => {
    console.log(e);
  })
  

   app.listen(PORT, "0.0.0.0", () => {
        console.log(`connected at port ${PORT}`); 
        // console.log('connected at port' + PORT);
    } ); 
 