// const http = require("http");
// const fs = require("fs");
// const url = require("url");

// const myServer = http.createServer((req, res) => {
//   if (req.url === "/favicon.ico") {
//     return res.end();
//   }
//   const log = `${Date.now()}: ${req.url} New request\n`;
//   const myUrl = url.parse(req.url, true);
//   console.log(myUrl);
//   fs.appendFile("log.txt", log, (err, result) => {
//     switch (myUrl.pathname) {
//       case "/":
//         res.end("Home Page");
//         break;
//       case "/about":
//         const username = myUrl.query.myname
//         res.end(`hii ${username}`);
//         break;
//       case "/page":
//         const search = myUrl.query.search_query
//         res.end(`here is your result ${search}`);
//         break;
//       default:
//         res.end("404");
//     }
//   });
// });

// myServer.listen(8000, () => {
//   console.log("server start");
// });


// jab ham express ka use karte hai tab hame itna lengthy code nahi likhna padta hai

// using express
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  return res.send("hello everyone express se banaya hai");
});

app.get("/about", (req, res) => {
  return res.send(`Hello ${req.query.name}`);
});

// using express
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});