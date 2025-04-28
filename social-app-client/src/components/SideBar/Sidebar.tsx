import {
  Avatar,
  Button,
  Card,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  ThemeProvider,
	useTheme,
} from "@mui/material";
import { navigationMenu } from "./SidebarNavigation";
import { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { Link } from "react-router";
import { useThemeContext } from "../../theme/ThemeContext";
import { darkTheme, lightTheme } from "../../theme/DarkTheme";
import NightlightIcon from '@mui/icons-material/Nightlight';
import SunnyIcon from '@mui/icons-material/Sunny';
import { logout } from "../../redux/slices/auth";

const Sidebar = () => {
  const { isDark, toggleTheme } = useThemeContext();
  const auth = useSelector((state: RootState) => state.auth);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
	const theme = useTheme()
	const dispatch = useDispatch<AppDispatch>()
  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

	const handleLogout = () => {
		dispatch(logout())
    setAnchorEl(null);
  };

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <Card className=" h-screen flex flex-col justify-between !py-5 !max-w-[400px]">
        <div className="!space-y-8 !pl-5">
          <div className="flex justify-between items-center">
            <div className="font-bold text-xl">Social app</div>
            <div className="flex items-center text-md !pr-5 ">
							<IconButton onClick={toggleTheme}>
              {isDark ? (
								<NightlightIcon fontSize="large"/>
							) : (
								<SunnyIcon fontSize="large"/>
							)}
							</IconButton>
              {/* <Switch checked={isDark} onChange={toggleTheme} /> */}
            </div>
          </div>

          <div className="!space-y-8">
            {navigationMenu.map((item) =>
              item.title === "Profile" ? (
                <Link
                  to={`${item.path}/${auth.user?.id}`}
                  className="flex items-center cursor-pointer !space-x-3 "
                  key={item.title}
                >
                  {item.icon}
                  <p className="text-xl">{item.title}</p>
                </Link>
              ) : (
                <Link
                  to={item.path}
                  className="flex items-center cursor-pointer !space-x-3 "
                  key={item.title}
                >
                  {item.icon}
                  <p className="text-xl">{item.title}</p>
                </Link>
              )
            )}
          </div>
        </div>
        <div className=" max-w-1/2">
          <Divider />
          <div className="!mt-4 !pl-5 flex items-center justify-between">
            <div className=" flex justify-between items-center !space-x-3">
              <Avatar
                className=""
                src="https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-female-user-profile-vector-illustration-isolated-background-women-profile-sign-business-concept_157943-38866.jpg?semt=ais_hybrid&w=740"
              />
              <div className="">
                <p className="font-bold">
                  {auth?.user?.firstName != null
                    ? auth?.user.firstName + " " + auth?.user?.lastName
                    : "User"}
                </p>
                <p className="opacity-70">{auth?.user?.email}</p>
              </div>

              <div className="!ml-10">
                <Button
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleOpen}
                >
                  <MoreVertIcon className="text-black" style={{
							color: theme.palette.mode === "dark" ? "#b0b0b0" : "#757575"
					}}/>
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem onClick={handleClose}>
									<Link to={`/profile/${auth.user?.id}`}>
										My profile
									</Link>
									</MenuItem>
                  <MenuItem onClick={handleClose}>deatails</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </ThemeProvider>
  );
};

export default Sidebar;
