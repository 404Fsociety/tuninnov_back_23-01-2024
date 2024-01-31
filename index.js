import express from 'express';
import dotenv from "dotenv";
import bodyParser from 'body-parser';
import cors from 'cors';
import connectDB from "./config/connectDB.js";
import userVCFRouter from "./routes/VCFs.js"

const app = express();

app.use(bodyParser.json({ limit : "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit : "30mb", extended: true }))
app.use(cors())

app.use('/userVCF', userVCFRouter);

connectDB()

app.get('/', (req,res) => {
  res.send("APP is runnig ...")
});

dotenv.config();

const PORT = process.env.PORT || 3001;

//create server
app.listen(PORT,(err)=>{
  err? console.log(err)
  :
  console.log(`server running on PORT : ${PORT}`)
})
