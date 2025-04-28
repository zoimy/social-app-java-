import { Avatar, Card, CardHeader, useTheme } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { searchUserByQueryAction } from "../../redux/slices/auth";
import { createChatAction } from "../../redux/slices/message";

const SearchUser = () => {
  const [username, setUsername] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const { searchUser } = useSelector((state: RootState) => state.auth);
	const theme = useTheme();

  const hadnleSearchUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    dispatch(searchUserByQueryAction({ query: username }));
  };

  const handleClick = (id: number) => {
		dispatch(createChatAction({userId: id}))
	};
  return (
    <div>
      <div className="!py-5 relative">
        <input
          type="text"
          className="bg-transparent border border-slate-400 rounded-full w-full !py-1 !px-2"
          placeholder="type a user"
          onChange={hadnleSearchUser}
					style={{
							color: theme.palette.mode === "dark" ? "#b0b0b0" : "#757575"
					}}
					
        />
        {username &&
          searchUser.map((user) => (
            <Card className="cursor-pointer w-full absolute z-10">
              <CardHeader
                onClick={() => {
                  handleClick(user.id);
                  setUsername("");
                }}
                avatar={<Avatar />}
                title={(user.firstName && user.lastName) ? (user.firstName + " " + user.lastName) : "Anonymous"}
                subheader={user.email}
              />
            </Card>
          ))}
      </div>
    </div>
  );
};

export default SearchUser;
