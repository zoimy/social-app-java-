import Sidebar from "../../components/SideBar/Sidebar";
import { Outlet, Route, Routes, useLocation } from "react-router"
import MiddlePart from "../../components/MiddlePart/MiddlePart";
import Reels from "../../components/Reels/Reels";
import CreateReels from "../../components/CreateReels";
import Profile from "../../components/Profile/Profile";
import HomeRight from "../../components/HomeRight";
import { Grid } from "@mui/material";

const HomePage = () => {
	const location = useLocation()

  return (
    <div className="!px-20">
      <Grid container spacing={0}>
        <Grid size={3}>
          <div className="sticky top-0">
            <Sidebar />
          </div>
        </Grid>

        <Grid size={6} className="!px-5 flex justify-center ">
					<Outlet/>
				</Grid>

				{location.pathname == "/" && <Grid size={3} className="relative">
					<div className="sticky top-0 w-full">
						<HomeRight/>
					</div>
				</Grid>}
      </Grid>
    </div>
  );
};

export default HomePage;
