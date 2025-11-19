const express=require('express');
const cors=require('cors');
require('dotenv').config();
const connectDB=require("./config/db.js")
const router = require('./routes/index.js');
const app=express();
app.use(express.json());
app.use(cors());
const PORT=process.env.PORT || 8080;

// Routes
app.use('/api/restaurants',router);

connectDB().then(()=>{
  app.listen(PORT,()=>{
    console.log(`sever is running http://localhost:${PORT}`);
  })
})