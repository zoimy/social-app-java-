import {
  Avatar,
  Box,
  Button,
  Card,
  Tab,
  Tabs,
} from "@mui/material";
import { useState } from "react";
import CardPost from "../CardPost";
import UserReelsCard from "../Reels/UserReelsCard";
import ProfileModal from "./ProfileModal";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { PostProps } from "../../redux/slices/post";

const tabs = [
  { value: "post", name: "Post" },
  { value: "reels", name: "Reels" },
  { value: "saved", name: "Saved" },
  { value: "reposts", name: "Reposts" },
];

const reels = [1, 2, 3];

const Profile = () => {
  const [value, setValue] = useState("post");
  const [open, setOpen] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user);
	const posts = user?.posts || []

  const handleOpenProfileModal = () => setOpen(true);
  const handleCloseProfileModal = () => setOpen(false);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Card className="!py-10 !w-full">
      <div className="rounded-md">
        <div className="!h-[15rem]">
          <img
            className="!w-full !h-full rounded-t-md"
            src="https://assets.weforum.org/article/image/0ZUBmNNVLRCfn3NdU55nQ00UF64m2ObtcDS0grx02fA.jpg"
            alt=""
          />
        </div>
        <div className="!px-5 flex justify-between items-start !mt-5 !h-[5rem]">
          <Avatar
            className="!w-[10rem] !h-[10rem] transform -translate-y-24"
            src="https://png.pngtree.com/thumb_back/fh260/background/20210207/pngtree-simple-gray-solid-color-background-image_557027.jpg"
          />
          <Button variant="outlined" onClick={handleOpenProfileModal}>
            Edit profile
          </Button>
        </div>
        <div className="!p-5">
          <div>
            <h1 className="font-bold text-xl py-1">{user?.firstName} {user?.lastName}</h1>
          </div>

          <div className="flex gap-4 items-center !py-3">
            <span>{posts.length} posts</span>
            <span>{user?.followers.length} followers</span>
            <span>{user?.followings.length} followings</span>
          </div>
        </div>

        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={value} onChange={handleChange}>
            {tabs.map((tab) => (
              <Tab key={tab.value} value={tab.value} label={tab.name} />
            ))}
          </Tabs>
        </Box>

        <div className="flex justify-center !mt-10">
          {value === "post" && (
            <div className="!space-y-5 !w-[90%]">
              {posts.map((post: PostProps) => (
                <div key={post.id} className="border border-slate-300">
                  <CardPost post={post}/>
                </div>
              ))}
            </div>
          )}

          {value === "reels" && (
            <div className="grid grid-cols-2 gap-2 !my-10">
              {reels.map((_, index) => (
                <UserReelsCard key={index} />
              ))}
            </div>
          )}

          {value === "saved" && (
            <div className="!space-y-5 !w-[90%]">
              {/* {savedPosts.map((post, index) => (
                <div key={post} className="border border-slate-300">
                  <CardPost post={post}/>
                </div>
              ))} */} 
							 Saved coming soon...
            </div>
          )}

          {value === "reposts" && (
            <div className="!space-y-5 !w-[90%]">
              Reposts coming soon...
            </div>
          )}
        </div>
      </div>

      <ProfileModal open={open} handleClose={handleCloseProfileModal} />
    </Card>
  );
};

export default Profile;
