import { connectToDB } from "@utils/database"

import Prompt from "@models/prompt";




export const POST = async (req) => {

    // get the form input 
    const { userId, prompt, tag } = await req.json();


    // connect to DB 
    try {
        await connectToDB(); // because it lambda function  => every time we mus call and afer that it will die 


        const newPrompt = new Prompt({
            creator: userId ,
            prompt,  // short way for making property as key and value is the same name 
            tag,
        }); 
        

        await  newPrompt.save() ;

        return new Response(JSON.stringify(newPrompt), {status: 201}) ;
        

    } catch (error) {
        return new Response("Failed to create new prompt", {status: 500}) ;
        
    }
}



