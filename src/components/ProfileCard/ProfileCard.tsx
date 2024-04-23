
import PFP from './../../assets/images/placeholder.png'
import { User } from '../../context/news'
import './ProfileCard.css'
import { useState } from 'react'
import useAuth from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

const ProfileCard = ( { user }: {user: User}) => {

    const [isDeleting, setIsDeleting] = useState<boolean>(false)
    const { deleteAuthor } = useAuth()
    const navigate = useNavigate();

    const handleDelete = async () => {

        const isSuccess = await deleteAuthor(user._id)
        
        if (isSuccess) {
            navigate('/')
        } 
    }

    return (
        <div className='profile--card--container'>
            <div className='profile--card'>
                
                <div className='profile--content'>
                    <img src={PFP} />
                    <div className='user--about'>
                        <p><b>{user.name}</b></p>
                        <p>{user.email}</p>
                    </div>
                </div>
                <button onClick={() => setIsDeleting(!isDeleting)} className='remove--btn'>Remove</button>
            </div>
            <div className='delete--confirm' style={{'display': isDeleting ? 'block'  : 'none'}}>
                <p>Articles published by {user.name} will be deleted permanently. Are you sure you want to delete this Author?</p>
                <button onClick = {handleDelete} className='post--btn'>Confirm</button>
                <button onClick={() => setIsDeleting(false)} className='logout--btn'>Cancel</button>
            </div>
        </div>
    )
}

export default ProfileCard