import { Card, Grid } from "@mui/material";
import Login from "./Login";
import Register from "./Register";
import { Route, Routes } from "react-router";

const Auth = () => {
  return (
    <div className="">
      <Grid container>
        <Grid className="h-screen overflow-hidden" size={7}>
          <img
            className="h-full w-full object-cover"
            src="https://musculardystrophynews.com/wp-content/uploads/2019/04/shutterstock_378721525-1000x480@2x.jpg?p=16274"
            alt=""
          />
        </Grid>
        <Grid size={5}>
          <div className="px-20 flex flex-col justify-center h-full">
            <Card className="p-8">
              <div className="flex flex-col items-center mb-5 space-y-1">
                <h1 className="logo text-center">Social app</h1>
                <p className="text-center text-sm w-[70&]">
                  Connect with others
                </p>
              </div>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Routes>
            </Card>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Auth;
