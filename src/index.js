const express=require("express");
const app= express();
const path=require("path")
const tempelatePath=path.join(__dirname,"../tempelates");
app.use(express.json());
app.set("view engine","ejs");
app.set("views",tempelatePath);
const collection=require("./mongodb.js");
app.use(express.static("./src/public"));
app.use(express.urlencoded({extended:false}));
const List=require("../models/list.js");
const methodOverride=require("method-override");
app.use(methodOverride("_method"));
app.get("/",(req,res)=>{
    res.render("login");
});

app.get("/login",(req,res)=>{
    res.render("login");
})

//login page
app.post("/login",async (req,res)=>{
    try{
       const check=await collection.findOne({name:req.body.name});
       if(check.password===req.body.password){
        res.render("home",{check});
       }
       else{
        alert("wrong password!sign up");
       }
    }
    catch{
       res.send("/login");   
    }
    });

app.get("/new",(req,res)=>{
    res.render("new");
});

app.get("/list",async(req,res)=>{
    let lists=await List.find().sort({name:'asc'});
    console.log(lists);
    let num=await List.find().count();
   //  res.send("working");
   res.render("list.ejs",{lists,num});
    });


app.post("/list",async(req,res)=>{
    let {name,Email,Mobile_number,Course,Designation,Gender}=req.body;

    let newList = new List({
      name:name,
      Email:Email,
      Mobile_number:Mobile_number,
      Gender:Gender,
      Designation:Designation,
      Course:Course
    });
    await newList.save();
    let lists=await List.find().sort({name:'asc'});
    let num=await List.count();
    res.render("list.ejs",{lists,num});
});

app.get("/list/:id/edit",async (req,res)=>{
    let {id}= req.params;
      let editlist=await List.findById(id);
      res.render("edit.ejs",{editlist})
    });

app.delete("/list/:id",async (req,res)=>{
    let {id}=req.params;
    let deleteList=await List.findByIdAndDelete(id);
    console.log(deleteList);
    res.redirect("/list");
  });

  app.put("/list/:id",async (req,res)=>{
    let {id}=req.params;
    await List.findByIdAndUpdate(id,{...req.body});
    res.redirect("/list");
  });
  
app.listen(8080,()=>{
    console.log("port is connected");
});