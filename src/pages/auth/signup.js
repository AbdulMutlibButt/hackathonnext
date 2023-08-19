import Form from "@/components/auth/form";
import { StoreUserDetails, signUp } from "../../../firebase/firebase";
export default function SignUp() {
    const handleSumbit = (name,email,password) => {
        console.log(name, email, password);
        signUp(email, password).then((response) => {
            StoreUserDetails(name, email, password,response.user.uid).then((response) => {
                window.location="./login"
            });
            console.log("success");
        });
    }
    
    return <Form signIn={false} onFormSubmit={handleSumbit} />
};
