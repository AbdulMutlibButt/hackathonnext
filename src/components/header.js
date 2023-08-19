import { onAuthStateChanged, signOut } from "firebase/auth";
import Link from "next/link";
import { useEffect, useState } from "react";
import { auth } from "../../firebase/firebase";


export default function Header() {
const [user,setUser] = useState("")
    useEffect(() => {
        onAuthStateChanged(auth, (User) => {
            if (User) {
                setUser(User.uid);
            }
        });
    }, [user]);
    const LogedOut = () => {               
        signOut(auth).then(() => {
        window.location = "/"
            console.log("Signed out successfully")
           
        }).catch((error) => {
        // An error happened.
        });
    }
   return (<header>
        <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
            <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                <div className="flex items-center lg:order-2">
                    {
                        user ?
                    <button onClick={LogedOut}  className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">Log out</button>
          :
            <>
             <Link href="/auth/login" className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">Log in</Link>
</>
                    }
                  


                </div>
            </div>
        </nav>
    </header>);
}