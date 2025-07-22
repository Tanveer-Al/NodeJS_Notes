const mongoose = require("mongoose");

async function connectMongoDB() {
  return mongoose.connect("mongodb://127.0.0.1:27017/NodeTuturial").then(()=>{
    console.log("Database connected successfully")
  }).catch(()=>{
    console.log("database not connected")
  })
}

module.exports = {connectMongoDB}
