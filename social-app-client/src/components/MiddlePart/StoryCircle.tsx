import { Avatar, Typography } from "@mui/material";
import React from "react";

const StoryCircle = () => {
  return (
    <div className=" flex flex-col items-center !mr-4 cursor-pointer">
      <Avatar
        className="!w-[5rem] !h-[5rem]"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNyosqx3V7YJCz_HQHIds205enTODYGtGQCw&s"
      >

      </Avatar>
      <Typography color="textPrimary">reels</Typography>
    </div>
  );
};

export default StoryCircle;
