import { Avatar, Card, IconButton, TextField, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import StoryCircle from "./StoryCircle";
import ImageIcon from "@mui/icons-material/Image";
import VideocamIcon from "@mui/icons-material/Videocam";
import ArticleIcon from "@mui/icons-material/Article";
import CardPost from "../CardPost";
import CreatePostModal from "../CreatePost/CreatePostModal";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import {
  getAllPostsAction,
  selectNewComment,
  selectPosts,
} from "../../redux/slices/post";

const story = [1, 2, 3, 1, 1, 1];
const MiddlePart = () => {
  const [openCreatePostModal, setOpenCreatePostModal] = useState(false);
  const handleOpenCreatePostModal = () => setOpenCreatePostModal(true);
  const handleCloseCreatePostModal = () => setOpenCreatePostModal(false);
  const dispatch = useDispatch<AppDispatch>();
  const posts = useSelector(selectPosts);
  const newComment = useSelector(selectNewComment);

  const sortedPosts = [...(posts || [])].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  useEffect(() => {
    dispatch(getAllPostsAction());
  }, [newComment]);

  return (
    <div className="!px-20 !mb-10">
      <section className="flex items-center !p-5 rounded-b-md">
        <div className=" flex flex-col items-center !mr-4 cursor-pointer">
          <Avatar
            className="!w-[5rem] !h-[5rem]"
            // src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNyosqx3V7YJCz_HQHIds205enTODYGtGQCw&s"
          >
            <AddIcon className="!h-[50px] !w-[50px]" />
          </Avatar>
					<Typography variant="body1" color="textPrimary" className="!mt-2">
        New
      </Typography>
        </div>
        {story.map((_, index) => (
          <StoryCircle  key={index}/>
        ))}
      </section>

      <Card className="!p-5 !mt-5">
        <div className="flex justify-between items-center gap-5">
          <Avatar />
          <TextField
            onClick={handleOpenCreatePostModal}
            id="standard-basic"
            label="life"
            variant="outlined"
            className="w-full"
            size="small"
          />
        </div>

        <div className="flex justify-center !space-x-9 !my-5">
          <div className="flex items-center">
            <IconButton color="primary" onClick={handleOpenCreatePostModal}>
              <ImageIcon />
            </IconButton>

            <span>media</span>
          </div>

          <div className="flex items-center">
            <IconButton color="primary" onClick={handleOpenCreatePostModal}>
              <VideocamIcon />
            </IconButton>

            <span>video</span>
          </div>

          <div className="flex items-center">
            <IconButton color="primary" onClick={handleOpenCreatePostModal}>
              <ArticleIcon />
            </IconButton>

            <span>Write article</span>
          </div>
        </div>
      </Card>

      <div className="!mt-5 !space-y-5">
        {sortedPosts && sortedPosts.map((item, index) => <CardPost key={index} post={item} />)}
      </div>

      <div>
        <CreatePostModal
          open={openCreatePostModal}
          handleClose={handleCloseCreatePostModal}
        />
      </div>
    </div>
  );
};

export default MiddlePart;
