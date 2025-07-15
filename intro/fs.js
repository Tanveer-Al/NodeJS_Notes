const fs = require("fs");



// create file using sync..........
// fs.writeFileSync("./test.txt", "hey there how are you")

// Async
// fs.writeFile("./test.txt", "Hello world", (err)=>{})

//how to read file using sync method
// const result = fs.readFileSync("./test.txt","utf-8")
// console.log(result)

//how to read file using Async method
// fs.readFile("./test.txt","utf-8", (err, result)=>{
//     if(err){
//         console.log("Error", err)
//     } else{
//         console.log(result)
//     }
// })

// how to append
// fs.appendFileSync("./test.txt", `${Date.now()} hey There\n`)

// how to copy any file
// fs.cpSync("./test.txt", "./copy.txt")

// how to delete a file
// let a = fs.unlinkSync("./copy.txt")

//how to get details about a file
// let a = fs.statSync("./test.txt")
// console.log(a)

// how to make a new folder
// fs.mkdirSync("muDocs", { recursive: true });


// bloking 
// const result = fs.readFileSync("./test.txt","utf-8")
// console.log(result)
// console.log("hello")
// console.log("kaise ho")


//Non blocking
// console.log("non blocking code")
// fs.readFile("./test.txt","utf-8", (err, result)=>{
// console.log(result)
// })
// console.log("hello")
// console.log("kaise ho")