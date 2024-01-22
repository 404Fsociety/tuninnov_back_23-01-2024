//require mongoose
import mongoose from "mongoose"
import dotenv from 'dotenv'

dotenv.config();

//connect function
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI,{useNewUrlParser: true, useUnifiedTopology : true})
        console.log('connected to database successfully !!!')
    } catch (error) {
        console.log(error)
    }
} 

//export function 
export default connectDB