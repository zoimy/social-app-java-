import { Avatar, Button, Card, CardHeader } from "@mui/material";

const PopularUserCard = () => {
  return (
    <Card className="">
      <CardHeader
        avatar={
          <Avatar  aria-label="recipe">
            R
          </Avatar>
        }
        action={
         <Button size="small">
					Follow
				 </Button>
        }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />
    </Card>
  );
};

export default PopularUserCard;
