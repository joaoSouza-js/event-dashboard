import { jwtDecode } from "jwt-decode"
import { useEffect } from "react"
import google from 'google';

export function NewSignIn(){

    function handleCallbackResponse(response:any){
        console.log(response.credential)
        if(!response.credential) return 
        const userCredential =  jwtDecode(response.credential)
        console.log(userCredential)
    }
    
    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: "827757014539-7rsmaebp4t2e2eqqodgb992m1svehjdn.apps.googleusercontent.com",
            callback: handleCallbackResponse
        })
        google.accounts.id.renderButton(
            document.getElementById("signInButton"),
            {
                theme: "outline",
                size: "large"
            }

        )

    },
)
    return (
        <div id="signInButton">
            
        </div>
    )
}