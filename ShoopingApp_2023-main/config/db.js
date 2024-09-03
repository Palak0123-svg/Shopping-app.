/*import mongoose from "mongoose"
import colors from "colors"*/
const mongoose = require('mongoose');
const colors = require('colors')
const connectDB = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`mongo db connnected successfully!!`.bgGreen.white)
        
    } catch (error) {
        console.log(`error in mongo db ${error}`.bgRed.white)
    }
}
module.exports = connectDB;