import { Card } from "@mui/material";
import PopularUserCard from "./PopularUserCard";
import SearchUser from "./Message/SearchUser";

const users = [1, 2, 3, 1, 1];
const HomeRight = () => {
  return (
    <div className="!pr-5">
      <SearchUser />

      <Card className="!p-5">
        <div className="flex justify-between !py-5 items-center">
          <p className="font-semibold opacity-70">Suggestions for you</p>
          <p className="text-xs font font-semibold opacity-95">View all</p>
        </div>

        <div className="!space-y-2">
          {users.map((_ , index) => <PopularUserCard key={index}/>)}
        </div>
      </Card>
    </div>
  );
};

export default HomeRight;
