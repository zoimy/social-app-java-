import {
  Avatar,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  IconButton,
  Modal,
  Typography,
	useTheme,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import ImageIcon from "@mui/icons-material/Image";
import VideocamIcon from "@mui/icons-material/Videocam";
import { uploadToCloudImage } from "../../utils/uploadToCloudImage";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { createPostAction } from "../../redux/slices/post";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: ".6rem",
  outline: "none",
};

const CreatePostModal = ({
  handleClose,
  open,
}: {
  handleClose: () => void;
  open: boolean;
}) => {
  const [selectedImage, setSelectedImage] = useState();
  const [selectedVideo, setSelectedVideo] = useState();
  const [isLoading, setIsLoading] = useState(false);
	const dispatch = useDispatch<AppDispatch>()
	const theme = useTheme()

  const handleSelectImage = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let file = event.target.files?.[0];

    setIsLoading(true);
    if (!file) return;
    const image = await uploadToCloudImage(file, "image");
    setSelectedImage(image);
    setIsLoading(false);
    formik.setFieldValue("image", image);
  };

  const handleSelectVideo = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let file = event.target.files?.[0];
    setIsLoading(true);
    if (!file) return;
    const video = await uploadToCloudImage(file, "video");
    setSelectedVideo(video);
    setIsLoading(false);
    formik.setFieldValue("video", video);
  };

  const formik = useFormik({
    initialValues: {
      caption: "",
      image: "",
      video: "",
    },
    onSubmit: (values) => {
			dispatch(createPostAction(values))
    },
  });

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={formik.handleSubmit}>
            <div>
              <div className="flex-col !space-x-4 items-center">
                <Avatar />
                <div className="flex items-center gap-4 !py-2">
                  <Typography className="!font-bold !text-lg">fdsf</Typography>
                  <Typography className="!text-sm">@mail</Typography>
                </div>

                <textarea
                  className=" w-full !p-2 border rounded-md border-slate-400"
                  placeholder="write caption"
                  name="caption"
                  rows={4}
                  onChange={formik.handleChange}
                  value={formik.values.caption}
									style={{
										color: theme.palette.mode === "dark" ? "#b0b0b0" : "#757575"
								}}
                />

                <div className="flex !space-x-5 items-center !mt-5">
                  <div className="flex items-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleSelectImage}
                      className="hidden"
                      id="image-input"
                    />
                    <label htmlFor="image-input">
                      <IconButton color="primary" component="span">
                        <ImageIcon />
                      </IconButton>
                    </label>
                    <Typography>Image</Typography>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleSelectVideo}
                      className="hidden"
                      id="video-input"
                    />
                    <label htmlFor="video-input">
                      <IconButton color="primary">
                        <VideocamIcon />
                      </IconButton>
                    </label>
                    <Typography>Video</Typography>
                  </div>
                </div>

                {selectedImage && (
                  <div>
                    <img src={selectedImage} alt="" className="h-[10rem]" />
                  </div>
                )}

                {selectedVideo && (
                  <div>
                    <img src={selectedVideo} alt="" className="h-[10rem]" />
                  </div>
                )}

                <div className="flex w-full justify-end">
                  <Button
                    type="submit"
                    variant="contained"
                    className="border-r-2"
                  >
                    Post
                  </Button>
                </div>
              </div>
            </div>
          </form>
          <Backdrop
            sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
            open={isLoading}
            onClick={handleClose}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </Box>
      </Modal>
    </div>
  );
};

export default CreatePostModal;
