import { useEffect, useState } from "react"
import "./Profile.css"
import { getAllUsers } from "../../services/userService.jsx"
import { useNavigate } from "react-router-dom"

export const Profile = ({currentUser}) => {
    const [user, setUser] = useState([])
    const [filteredUser, setFilteredUser] = useState([])
    const navigate = useNavigate()

    useEffect(()=>{
        getAllUsers().then((usersArray) =>{
            setUser(usersArray)
        })
    },[])

    useEffect(() => {
        const foundUser = user.find((user) => user.id === currentUser.id); 
        setFilteredUser(foundUser); 
    }, [user, currentUser]); 

    return(
        <section className="profile">
            <div>
                Name:
              <span className="profile-name">{filteredUser?.name}</span>  
              
            </div>
            <div>
                Cohort#
                <span className="profile-cohort">{filteredUser?.cohort}</span>
            </div>
            <div >
                 Number of Posts:
                 <span className="profile-posts">{filteredUser?.posts?.length}</span>
            </div>
            <button onClick={()=>{
                navigate("/edit-profile")
            }}>Edit Profile</button>
             
        </section>
    )
}