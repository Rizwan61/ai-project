const mongoose = require('mongoose')

const connectDB = async ()=>{
    try {
        
        console.log("Rizwan")
         mongoose.connect('mongodb://localhost:27017/mydatabase')

        console.log("hello")
       
        console.log(` Connected to database:  `);



    } catch (error) {
        console.log(`connect to database error ${error}`)
    }

}
module.exports = connectDB;