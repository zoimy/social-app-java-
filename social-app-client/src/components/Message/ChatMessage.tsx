import { useSelector } from "react-redux"
import { MessageProps } from "../../redux/slices/message"
import { RootState } from "../../redux/store"

type Props = {
	message: MessageProps
}

const ChatMessage = ({message}: Props) => {
	const {user} = useSelector((state: RootState) => state.auth)

	const isUser = user?.id === message.user?.id

	return (
		<div className={`flex ${!isUser ? "justify-start" : "justify-end"} text-white`}>
			<div className={`!p-1 ${true  ? " rounded-md" : "!px-5 rounded-full"} bg-[#191c29]`}>
				{message.image && <img
				className='!w-[12rem] !h-[17rem] rounded-md object-cover' 
				src={message.image}/>}
				<p className={`${true ? "!py-2" : "!py-1"}`}>{message.content}</p>

			</div>
		</div>
	)
}

export default ChatMessage