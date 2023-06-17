import { connectToDB } from "@utils/database"

import Prompt from "@models/prompt";




export const GET = async (req) => {


    // connect to DB 
    try {
        await connectToDB(); // because it lambda function  => every time we mus call and afer that it will die 


        const prompts = await  Prompt.find({}).populate("creator") ;  // to populate a referenced field called 'creator' from the referenced model User 
        // await keyword allows the code to wait for the database operation to finish before proceeding to the next line.

        

   

        return new Response(JSON.stringify(prompts), {status: 200}) ;
        

    } catch (error) {
        return new Response("Failed to fetch all prompts", {status: 500}) ;
        
    }
}



