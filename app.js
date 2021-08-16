const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.set("view engine", "ejs"); 
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

var items = [];
var workItems = [];

app.get("/" , function(req , res ){

    var today = new Date();
    var options ={
        weekday: "long",
        day:"numeric",
        month:"long"
    };
    
    var day = today.toLocaleDateString("en-US" , options);
    res.render("list", { listTitle: day , newListItem: items });

});

app.get("/work" , function(req , res){
    res.render("list", { listTitle: "Work List" , newListItem: workItems });
});

app.post("/" , function(req ,res){
    var item = req.body.newItem;

    if(req.body.list === "work" ){
        workItems.push(item);
        res.redirect("/work");
    }
    else{
        items.push(item);
    }
    res.redirect("/");
})

app.post("/work", function(req ,res){
    var item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
})

app.listen(3000 , function(){
    console.log("Server is running on port 3000");
});