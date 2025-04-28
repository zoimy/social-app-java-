import {
  Avatar,
  Backdrop,
  CircularProgress,
  Grid,
  IconButton,
	Typography,
	useTheme,
} from "@mui/material";
import WestIcon from "@mui/icons-material/West";
import CallIcon from "@mui/icons-material/Call";
import VideoChatIcon from "@mui/icons-material/VideoChat";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import SearchUser from "./SearchUser";
import UserChatCard from "./UserChatCard";
import ChatMessage from "./ChatMessage";
import { ChangeEvent, useEffect, useReducer, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import {
  ChatProps,
  createMessageAction,
  getAllUsersChatAction,
  MessageProps,
} from "../../redux/slices/message";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { uploadToCloudImage } from "../../utils/uploadToCloudImage";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

const Message = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { chats, message } = useSelector((state: RootState) => state.message);
  const { user } = useSelector((state: RootState) => state.auth);
  const [currentChat, setCurrentChat] = useState<ChatProps>();
  const [messages, setMessages] = useState<MessageProps[]>();
  const [selectedImage, setSelectedImage] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [stompClient, setStompClient] = useState<Stomp.Client>();
  const chatRef = useRef<HTMLDivElement>(null);
	const theme = useTheme();

  // if (!currentChat?.id || !currentChat.content) return;

  const handleSelectImage = async (e: ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    try {
      const file = e.target.files?.[0];
      if (!file) return;
      const imageUrl = await uploadToCloudImage(file, "image");
      setSelectedImage(imageUrl);
    } catch (error) {
      console.error("Image load error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateMessage = (val: string) => {
    if (!currentChat?.id) return;
    const message = {
      chatId: currentChat?.id,
      content: val,
      image: selectedImage || "",
    };
    dispatch(createMessageAction({ ...message, sendMessageToServer }));
  };

  useEffect(() => {
    dispatch(getAllUsersChatAction());
  }, []);

  useEffect(() => {
    const sock = new SockJS("http://localhost:8080/ws");
    const stomp = Stomp.over(sock);
    setStompClient(stomp);

    stomp.connect({}, onConnect, onError);
  }, []);

  const onConnect = () => {
    console.log("✅ WebSocket connected");
  };
  const onError = (error: any) => {
    console.error("❌ WebSocket failed:", error);
  };

  useEffect(() => {
    if (stompClient && currentChat) {
      const subscription = stompClient.subscribe(
        `/user/${currentChat.id}/private`,
        onMessageReceive
      );
      return () => subscription.unsubscribe();
    }
  }, [stompClient, currentChat]);

  const sendMessageToServer = (newMessage: MessageProps) => {
    if (stompClient && currentChat && newMessage) {
      stompClient.send(
        `/app/chat/${currentChat?.id}`,
        {},
        JSON.stringify(newMessage)
      );
    }
  };

  // useEffect(() => {
  //   if (message) {
  //     setMessages((prevMessages) => [...(prevMessages || []), message]);
  //   }
  // }, [message]);

  useEffect(() => {
    if (chatRef.current) {
			chatRef.current.scrollTop=chatRef.current.scrollHeight
    }
  }, [messages]);

  const onMessageReceive = (payload: any) => {
    console.log("Message received", payload);
    const receivedMessage = JSON.parse(payload.body);
    console.log("Message received", receivedMessage);
    setMessages((prevMessages) => [...(prevMessages || []), receivedMessage]);
  };

  return (
    <div className="w-full h-screen overflow-hidden">
      <Grid container className="!h-screen ">
        <Grid className="!px-5" size={4}>
          <div className="flex flex-col h-full">
            <div className="!w-full">
              <div className="flex !space-x-4 items-center !py-5">
                <WestIcon style={{ color: theme.palette.text.primary}}/>
                <Typography color="textPrimary" className="!text-xl !font-bold">Home</Typography>
              </div>
              <div className="!h-[80vh]">
                <div>
                  <SearchUser />
                </div>

                <div className="h-full !space-y-4 !mt-5 overflow-y-scroll no-scrollbar">
                  {chats.map((chat) => (
                    <div
                      onClick={() => {
                        setCurrentChat(chat);
                        setMessages(chat.messages);
                      }}
                    >
                      <UserChatCard chat={chat} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Grid>

        <Grid className="!h-full" size={8}>
          {currentChat ? (
            <div className="">
              <div className="flex justify-between items-center border-l !p-5 border-slate-400 border-b-1 ">
                <div className="flex items-center !space-x-3">
                  <Avatar />
                  <p>
                    {user?.id === currentChat.users[0].id
                      ? currentChat.users[1].firstName +
                        " " +
                        currentChat.users[1].lastName
                      : currentChat.users[0].firstName +
                        " " +
                        currentChat.users[0].lastName}
                  </p>
                </div>

                <div className="flex !space-x-3">
                  <IconButton>
                    <CallIcon />
                  </IconButton>

                  <IconButton>
                    <VideoChatIcon />
                  </IconButton>
                </div>
              </div>
              <div ref={chatRef} className="no-scrollbar overflow-y-scroll !px-2 !py-5 !space-y-5 !h-[80vh]">
                {messages &&
                  messages?.map((message) => <ChatMessage message={message} />)}
              </div>
              <div className="sticky bottom-0 border-l border-slate-400">
                <div className="!py-5 flex items-center justify-center !space-x-5 !ml-3">
                  {selectedImage && (
                    <img
                      className="!w-[5rem] !h-[5rem] object-cover !px-2"
                      src={selectedImage}
                    />
                  )}
                  <input
                    onKeyDown={(e) => {
                      if (
                        e.key === "Enter" &&
                        (e.target as HTMLInputElement).value
                      ) {
                        const val = (e.target as HTMLInputElement).value;
                        handleCreateMessage(val);
                        (e.target as HTMLInputElement).value = "";
                        setSelectedImage("");
                      }
                    }}
                    className="bg-transparent border border-slate-400 rounded-full w-full !py-3 !px-5"
                    placeholder="type a message"
                    type="text"
                  />

                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleSelectImage}
                      className="hidden"
                      id="image"
                    />
                    <label htmlFor="image" className="cursor-pointer">
                      <AddPhotoAlternateIcon color="info" />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full !space-y-5 flex flex-col justify-center items-center">
              <ChatBubbleOutlineIcon sx={{ fontSize: "15rem" }} style={{
							color: theme.palette.mode === "dark" ? "#b0b0b0" : "#757575"
					}}/>
              <Typography color="textPrimary" className="!text-xl !font-semibold">No chat selected</Typography>
            </div>
          )}
        </Grid>
      </Grid>
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default Message;
