import { connectToDB } from "@utils/database"
import Prompt from "@models/prompt";

// make delete function for prompt by id 
export const DELETE = async (req, {params}) => {

    // connect to DB 
    try {
        await connectToDB(); // because it lambda function  => every time we mus call and afer that it will die 

           // Find the prompt by ID and remove it
        await Prompt.findByIdAndRemove(params.id);

   

        return new Response("Prompt deleted successfully", {status: 200}) ;
        

    } catch (error) {
        return new Response("Error deleting prompt", {status: 500}) ;
        
    }
}



// make show function prompt by id 
export const GET = async (req, {params}) => {

    // connect to DB 
    try {
        await connectToDB(); // because it lambda function  => every time we mus call and afer that it will die 


        const prompt = await  Prompt.findById(params.id).populate("creator") ;  

        if(!prompt)   return new Response("Failed to fetch prompt", {status: 500}) ;

        return new Response(JSON.stringify(prompt), {status: 200}) ;
        

    } catch (error) {
        return new Response("Failed to fetch prompt", {status: 500}) ;
        
    }
}




// make update function prompt by id 
export const PATCH = async (req, {params}) => {
    const {prompt, tag} = await req.json() ;

    // connect to DB 
    try {
        await connectToDB(); // because it lambda function  => every time we mus call and afer that it will die 


        const existingPrompt = await  Prompt.findById(params.id);  
        if(! existingPrompt) return new Response("Failed to update prompt", {status: 500}) ;

  // Update the prompt with new data
        existingPrompt.prompt = prompt ; 
        existingPrompt.tag = tag; 
       await  existingPrompt.save();

        return new Response(JSON.stringify("Successfully updated the Prompt"), {status: 200}) ;
          


    } catch (error) {
        return new Response("Error Updating Prompt", {status: 500}) ;
        
    }
}


