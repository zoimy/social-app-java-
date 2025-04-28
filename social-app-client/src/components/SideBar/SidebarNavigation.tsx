import HomeIcon from '@mui/icons-material/Home';
import MovieIcon from '@mui/icons-material/Movie';
import QueueIcon from '@mui/icons-material/Queue';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MessageIcon from '@mui/icons-material/Message';
import ViewStreamIcon from '@mui/icons-material/ViewStream';
import PeopleIcon from '@mui/icons-material/People';
import Person2Icon from '@mui/icons-material/Person2';

export const navigationMenu = [
	{
		title: "Home",
		icon: <HomeIcon/>,
		path: "/",
	},
	{
		title: "Reels",
		icon: <MovieIcon/>,
		path: "/reels",
	},
	{
		title: "Create Reels",
		icon: <QueueIcon/>,
		path: "/create-reels",
	},
	{
		title: "Notifications",
		icon: <NotificationsIcon/>,
		path: "/",
	},
	{
		title: "Message",
		icon: <MessageIcon/>,
		path: "/message",
	},
	{
		title: "Lists",
		icon: <ViewStreamIcon/>,
		path: "/",
	},
	{
		title: "Communities",
		icon: <PeopleIcon/>,
		path: "/",
	},
	{
		title: "Profile",
		icon: <Person2Icon/>,
		path: `/profile`,
	},
]