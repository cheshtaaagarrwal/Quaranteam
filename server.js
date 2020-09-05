const express = require("express");


const app = express();


app.use(express.static('public'));

app.get("/",function(request, response){
    response.sendFile(__dirname  + "/index.html");

});

app.listen(3000,function(){
    console.log("Server started at 3000");
});