import { useEffect } from "react"
import useAuth from "../../hooks/useAuth"
import Header from "../../components/Header/Header"
import Navbar from "../../components/Navbar/Navbar"
import ProfileCard from "../../components/ProfileCard/ProfileCard"

import './UsersPage.css'

const UsersPage = () => {

    const {getAllUsers, users} = useAuth()

    useEffect( () => {

        getAllUsers()

    }, [])

    
    const renderedProfiles = users.map( (user) => <ProfileCard user={user} />)
    

    return (
        <div className="users--page">

            <Header/>
            <Navbar /> 

            <div className="users--container">
                <h1>NiveshKari Team</h1>
                <div className="profiles">
                    {renderedProfiles}
                </div>
            </div>

        </div>
    )
}

export default UsersPage