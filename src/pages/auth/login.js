import Form from "@/components/auth/form";
import { login } from "../../../firebase/firebase";
export default function SignIn() {
    const handleSumbit = (email, password) => {
        login(email, password).then(() => {
            console.log(email, password);

            window.location = "/blogs/addBlog";

        });
        console.log(email, password);
    }
    return <Form signIn={true}
        onFormSubmit={handleSumbit}
    />
};
