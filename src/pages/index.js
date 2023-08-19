

import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getBlogs } from "../../firebase/firebase";
import { BlogCard } from "@/components/Cardblog";

export default function Home() {
  const [data, setData] = useState([]);
  useEffect(() => {
    getBlogs().then((item) => {
      setData(item);
    });
  }, []);

  return (
    <>
      <div className=" mt-3 w-full bg-slate-200">
        <Typography variant="h2" className="mx-10" > All Blogs</Typography>
      </div>
      {data.map((data) => (
        <>
          <div className="mx-10 mt-10">
            <BlogCard value={false} data={data} />
          </div>
        </>
      ))}
    </>
  );
}
