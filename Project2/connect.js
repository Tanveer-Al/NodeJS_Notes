const mongoose = require("mongoose");

function databaseConnect(){
    mongoose.connect("mongodb://localhost:27017/shortURL").then(()=>{
        console.log("database connected successfully")
    }).catch(()=>{
        console.log("database is not connected")
    })
}
module.exports = {databaseConnect}