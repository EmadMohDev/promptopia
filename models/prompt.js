import { Schema , model , models } from "mongoose";



const PromptSchema = new Schema({
  prompt :  {
    type : String , 
    required: [true , "prompt is required!"]
  } , 

  tag :  {
    type : String , 
    required: [true , "Tag is required!"] ,
  }  , 
  
  // to hanlde FK and here the relation is  one-many  [ one user can create many prompts ]
  creator :  {
    type : Schema.Types.ObjectId ,
    ref : 'User'  
  } , 


});


 const Prompt = models.Prompt || model("Prompt", PromptSchema);


export default Prompt ;



