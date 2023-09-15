import mongoose from "mongoose";
import validator from "validator";
const UserSchema=new moongose.Schema({
    
firstName:{
    type:String,
    require: true,
    min:3,
    max:50
},
lastName:{
    type:String,
    require: true,
    min:2,
    max:50
},
friend:{
    type:Array,
    default:[],
},
email:{
    type:String,
    require: true,
    max:50,
    unique:true,
    validate: (value) => {  // validate email using validator modules inbuild func
        return validator.isEmail(value);
    }
},
password:{
    type:String,
    require: true, 
    min: 5
},
picturePath:{
    type:String,
    require: true
},
location:{
    type:String,
    
},
occupation:{
    type:String,
},
viewedProfile:{
    type:Number,
    
},
impression:{
    type:Number,
    require: true
},

},{
    timestamps:true
},{
    collection:"User"
});
const User=moongose.model("User",UserSchema);

export default User;

