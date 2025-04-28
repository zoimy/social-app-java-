import { Avatar, Card, CardHeader, IconButton } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { ChatProps } from "../../redux/slices/message";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

type Props = {
	chat: ChatProps
}

const UserChatCard = ({chat}: Props) => {
	const user = useSelector((state: RootState) => state.auth.user)

  return (
    <Card>
      <CardHeader
        avatar={<Avatar src={chat.chat_image || ""}/>}
        title={user?.id === chat.users[0].id ? chat.users[1].firstName + " " + chat.users[1].lastName : (chat.users[0].firstName + " " + chat.users[0].lastName)}
        subheader="Lorem"
        action={
          <IconButton>
            <MoreHorizIcon />
          </IconButton>
        }
      ></CardHeader>
    </Card>
  );
};

export default UserChatCard;
