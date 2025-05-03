import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import {
  createCommentAction,
  likePostAction,
  PostProps,
} from "../redux/slices/post";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../redux/store";
import { selectCurrentUser } from "../redux/slices/auth";
import CommentMessage from "./CommentMessage";

type CardPostProps = {
  post: PostProps;
};

const CardPost = ({ post }: CardPostProps) => {
  const [showComments, setShowComments] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const currentUser = useSelector(selectCurrentUser);
  const [liked, setLiked] = useState<boolean>(false);
  const [likesCount, setLikesCount] = useState<number>(
    post?.likedUserIds?.length || 0
  );

  const isUserLiked = post?.likedUserIds?.includes(currentUser?.id ?? -1);
  const handleShowComment = () => setShowComments(!showComments);

  const handleCreateComment = (content: string) => {
    dispatch(createCommentAction({ postId: post.id, content }));
  };

  const handleLikePost = () => {
    dispatch(likePostAction({ postId: post.id }));

    setLiked((prevLiked) => {
      const newLiked = !prevLiked;
      setLikesCount(newLiked ? likesCount + 1 : likesCount - 1);
      return newLiked;
    });
  };

  useEffect(() => {
    if (isUserLiked) {
      setLiked(true);
    }
  }, [post, currentUser, isUserLiked]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <CardHeader
        avatar={<Avatar aria-label="recipe">R</Avatar>}
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={
          post?.user?.firstName && post?.user?.lastName
            ? `${post?.user.firstName} ${post?.user.lastName}`
            : "Anonymous"
        }
        subheader={post?.user?.email || `@anonymous`}
      />
      {/* <CardMedia
        component="img"
        height="194"
        image={post.image}
        alt="Paella dish"
      /> */}
      <img
        className="!w-full object-cover max-h-[30rem] object-center"
        src={post?.image}
        alt=""
      />
      <CardContent>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {post?.caption}
        </Typography>
      </CardContent>
      <CardActions className="flex justify-between" disableSpacing>
        <div className="flex gap-5">
          <div className="flex items-center ">
            <IconButton onClick={handleLikePost}>
              {liked ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
            </IconButton>
            <Typography variant="body2" className="">
              {likesCount}
            </Typography>
          </div>
          <div>
            <IconButton>{<ShareIcon />}</IconButton>
          </div>
          <div>
            <IconButton onClick={handleShowComment}>
              {post?.comments ? <ChatBubbleOutlineIcon /> : <ChatBubbleIcon />}
            </IconButton>
          </div>
        </div>

        <div>
          <IconButton>
            {true ? <BookmarkIcon /> : <BookmarkBorderIcon />}
          </IconButton>
        </div>
      </CardActions>

      <Divider />

      {showComments && (
        <section>
          <div className="flex items-center !space-x-5 !mx-3 !my-5">
            <Avatar />

            <input
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleCreateComment((e.target as HTMLInputElement).value);
                  (e.target as HTMLInputElement).value = "";
                }
              }}
              type="text"
              className="w-full outline-none bg-transparent border rounded-full !px-5 !py-2"
              placeholder="write comment"
            />
          </div>
          {post?.comments &&
            post.comments.map((com) => <CommentMessage key={com.id} comment={com} />)}
        </section>
      )}
    </Card>
  );
};

export default CardPost;
