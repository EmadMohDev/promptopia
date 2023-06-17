import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import User from "@/models/user"  // call without js 
import  {connectToDB} from "@utils/database"  // call without js 



// to handle our authentication  => we create this handler
const handler = NextAuth({

  // providers list 
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })

  ],


  
  // callbacks 
  callbacks: {

     // 1 -session
    async session({ session }) {

      // to keep user data every single time on a session
      const sessionUser = await User.findOne({
        email : session.user.email
      });

      
      session.user.id = sessionUser._id.toString() ;
      return session  ;


      

    },

      // 2 -signIn
    async signIn({ account, profile, user, credentials }) {

      // each Next js route is serverless  => this mean this is lambda function that open up only when it get called
      // So we not need to keep our server running constantly باسنمرار
      try {
        await connectToDB();

        // check if user is already exists
        const userExists = await User.findOne({
          email :  profile.email 
        });


        // else create new one and save it
  
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }


        return true  ;  // add this 
        
        
      } catch (error) {
        console.log("Error checking if user exists: ", error.message);
        return false

        
        
      }

    }
  }
})


export { handler as GET, handler as POST } ; 
// This means that when you import this module in another file, you can use either GET or POST as the handler name depending on the HTTP method you want to handle



