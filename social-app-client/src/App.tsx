import { Navigate, Route, Routes, useNavigate } from "react-router";
import Auth from "./pages/Auth/Auth";
import HomePage from "./pages/HomePage/HomePage";
import Message from "./components/Message/Message";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./redux/store";
import { useEffect } from "react";
import { getProfileAction } from "./redux/slices/auth";
import Reels from "./components/Reels/Reels";
import MiddlePart from "./components/MiddlePart/MiddlePart";
import CreateReels from "./components/CreateReels";
import Profile from "./components/Profile/Profile";
import { darkTheme, lightTheme } from "./theme/DarkTheme";
import { useThemeContext } from "./theme/ThemeContext";
import { ThemeProvider } from "@emotion/react";
import { Box } from "@mui/material";

function App() {
  const auth = useSelector((state: RootState) => state.auth);
  const { isDark } = useThemeContext();
	const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
	
	useEffect(() => {
		const token = localStorage.getItem("jwt");
		
		if (token && token !== "null" && token.trim() !== "") {
			dispatch(getProfileAction(token)).unwrap()
				.catch((error) => {
					console.error("Failed to load profile:", error);
					localStorage.removeItem("jwt"); 
				});
		}
	}, [dispatch, navigate]);
	
  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
			<Box
        sx={{
          backgroundColor: (theme) => theme.palette.background.default, 
          minHeight: "100vh",
          width: "100%", 
        }}
      >
      <Routes>
        {auth.user ? (
          <>
            <Route path="/" element={<HomePage />}>
              <Route path="" element={<MiddlePart />} />
              <Route path="reels" element={<Reels />} />
              <Route path="create-reels" element={<CreateReels />} />
              <Route path="profile/:id" element={<Profile />} />
              <Route path="message" element={<Message />} />
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
          </>
        ) : (
          <>
            <Route path="/auth/*" element={<Auth />} />
            <Route path="*" element={<Navigate to="/auth/login" />} />
          </>
        )}
      </Routes>
		</Box>
    </ThemeProvider>
  );
}

export default App;
