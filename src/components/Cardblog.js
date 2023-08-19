import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Button } from "@mui/material";

export function BlogCard({ value, data }) {
  console.log(data)
  return (
    <>
     <Card sx={{ maxWidth: 600 }}>
        <CardHeader
          avatar={
            
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe"></Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={data?.title}
          subheader={[
            data?.user,
            "  ",
            data.timestamp.toDate().toLocaleString(),
          ]}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {data?.content}
          </Typography>
        </CardContent>
        <CardActions>
          {value == "off" ? (
            <></>
          ) : value == true ? (
            <>
              <Button aria-label="share" variant="outline">
                Edit
              </Button>
              <Button aria-label="add to favorites" variant="outlined">
                <Typography>Delete</Typography>
              </Button>
            </>
          ) : (
            <IconButton aria-label="add to favorites">
              <Typography>
                <a href={`/blogs/${data?.userId}`}> click to see all </a>
              </Typography>
            </IconButton>
          )}
        </CardActions>
      </Card>
    </>
  );
}
