const express = require('express');
const app = express();
const path = require('path');


const userRoutes = require("./server/routes/user");

app.use(express.json()); //To parse JSON bodies (Applicable for Express 4.16+)

app.use(express.static(__dirname + ""));
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/whatnote.html')))

//CORS middleware
app.use(function(req, res, next) {
 res.header("Access-Control-Allow-Origin", "*"); 
 res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
 res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS"); 
 next();
});

app.use("/users", userRoutes); 

const PORT = process.env.PORT || 3001;
app.listen(PORT, ( ) => console.log(`Server started on port ${PORT}!`));