import { Schema , model , models } from "mongoose";


const UserSchema = new Schema({
  email :  {
    type : String , 
    unique : [true , "Email already exists!"] ,   // "Email already exists!"  => this is the message incase of fail 
    required: [true , "Email is required!"]
  } , 

  username :  {
    type : String , 
    required: [true , "Username is required!"] ,
    match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]  
    // from gist file :   https://gist.github.com/adrianhajdin/6df61c6cd5ed052dce814a765bff9032

  }  , 
  
  image :  {
    type : String 
  } , 


 
});


 const User = models.User || model("User", UserSchema);


export default User ;

