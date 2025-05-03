import React, { useEffect, useState } from 'react'
import { CommentProps, UserProps } from '../redux/slices/post'
import { Avatar } from '@mui/material'
import { useDispatch } from 'react-redux'
import { getUserByIdAction } from '../redux/slices/auth'
import { AppDispatch } from '../redux/store'

type commentProps = {
	comment: CommentProps
}

const CommentMessage = ({comment}: commentProps) => {
	const [user, setUser] = useState<UserProps | null>(null)
	const [loading, setLoading] = useState<boolean>(false)
	const dispatch = useDispatch<AppDispatch>()

	useEffect(() => {
	  const fetchUser = async () => {
			if (comment.userId) {
				setLoading(true)
        try {
          const userData = await dispatch(getUserByIdAction({ userId: comment.userId })).unwrap()
          setUser(userData)
					setLoading(false)
        } catch (error) {
          console.error('Error fetching user:', error)
					setLoading(false)
        }
      }
    }
		
		fetchUser()
	},[comment.userId, dispatch])


	useEffect(() => {
    if (user) {
			setLoading(false)
		}
  }, [user])

	if (loading) return <div>Loading...</div>

		return (
			<div className="!mx-3 !space-y-2 !my-5 text-xs">
			<div className="flex justify-between items-center">
				<div className="flex items-center !space-x-5">
					<Avatar className="!h-[2rem] !w-[2rem] ">{user?.firstName?.[0] || "?"}</Avatar>
					<p>{comment.content}</p>
				</div>
			</div>
		</div>
		)
}

export default CommentMessage