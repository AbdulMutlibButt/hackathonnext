import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import { React, useEffect, useState } from "react";
import { Button, Input, InputLabel, TextField } from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";
import { RegisterBlog, auth, fetchUserBlogs, getCurrentUser } from "../../../firebase/firebase";
import { BlogCard } from "@/components/Cardblog";

const AddBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [user, setUser] = useState("");
  const [data,setData] = useState([]);

  useEffect(() => {
    onAuthStateChanged(auth, (User) => {
        if (User) {
          fetchUserBlogs(User.uid).then((item)=>{
            setData(item);
           })
            setUser(User.uid);
        }
    });
}, [user,data]);
console.log(user)
  const handleSubmitClick = () => {
    getCurrentUser(user).then((data)=>{
      RegisterBlog(title, content, user,data.name).then((res) => {
        setTitle("");
        setContent("");
        window.location.reload();
      });
    })
    
    console.log(title, content, user);
  };
  return (
    <>
      <Card sx={{ maxWidth: 600 }} className="justify-center ml-10">
        <CardContent>
          <div>
            <TextField
              value={title}
              fullWidth
              label="Topic"
              id="Topic"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <TextField
              fullWidth
              label="Details"
              id="Content"
              value={content}
              className="mt-5"
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </CardContent>
        <CardActions>
          <Button
            variant="outlined"
            className="m-3"
            onClick={handleSubmitClick}
          >
            Submit
          </Button>
        </CardActions>
      </Card>
      
       {data?.map((data)=>(
        <div className="justify-center  ml-10 my-3" >
         <BlogCard value={true} data={data}/>
        </div>
        
      ))}
        
      
    </>
  );
};

export default AddBlog;

