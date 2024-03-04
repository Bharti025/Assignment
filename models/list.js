const mongoose= require("mongoose");
const Schema=mongoose.Schema;

const listSchema=new Schema({
name:{
    type:String,
    required:true,
},
Email:{
    type:String,
    required:true,
},
Mobile_number:{
    type:Number,
    required:true,
},
Designation:{
    type:String,
    required:true,
},
Gender:{
    type:String,
    required:true,
},
Course:{
    type:String,
    
},
CreateDate:{
     type: Date, 
     default: Date.now 
}
// Image:{
//     type:String,
    
// }
});

const List=mongoose.model("List",listSchema);
module.exports=List;