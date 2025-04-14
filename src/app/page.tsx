import { Button, buttonVariants } from "@/components/ui/button";
import {UserButton,SignedIn,SignInButton} from "@clerk/nextjs"
import FileUpload from "@/components/ui/FileUpload";
import { auth } from "@clerk/nextjs/server";
import {Heading1, LogIn} from "lucide-react"




export default async function Home() {
  const {userId} = await auth()
  const isAuth = !!userId
  return (
   
    <div className="w-screen min-h-screen bg-gradient-to-r from-rose-100 to-teal-100">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
      <div className="flex flex-col items-center text-center">
        <div className="flex items-center">
          <h1 className="mr-3 text-5xl font-semibold">
            Chat with any pdf <SignedIn>
              <UserButton/>
            </SignedIn>
          </h1>
        </div>
          <div className="flex mt-5">
            {isAuth &&(
                <Button>Go To Chat</Button>
            )}
           
          </div>
          <p className="max-w-xl mt-1 text-lg text-slate-600 ">join millions of students,researchers and professionals to instanly answers questions and understand research with AI</p>
          <div className="w-full mt-4">
              {isAuth ? (<FileUpload/>):
                (
                  <SignInButton mode="modal">
                  <div>
                    <Button asChild className=" w-1/3 h-10 hover:bg-teal-600 transition cursor-pointer">
                      <span className="flex items-center gap-2 justify-center">
                        Login to get started
                        <LogIn className="w-4 h-4 ml-1 "/>
                       
                      </span>
                    </Button>
                  </div>
                </SignInButton>
                )}

            
          </div>

      </div>
      </div>
    </div>
    

  )
}
