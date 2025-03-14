import { useParams } from "react-router-dom"
import "./Profile.css"
import { useState, useEffect } from "react"
import { getUserById } from "../../services/userService.jsx"

export const AuthorProfile = () => {
    const {userId} = useParams()
    const [user, setUser] = useState({})
    


  useEffect(()=>{
    getUserById(userId).then(data =>{
        const userObj = data
        setUser(userObj)
    })
  },[userId])  
    
  
    return(
        <section className="profile">
            <div>
                Name:
              <span className="profile-name">{user.name}</span>  
              
            </div>
            <div>
                Cohort#
                <span className="profile-cohort">{user.cohort}</span>
            </div>
            <div >
                 Number of Posts:
                 <span className="profile-posts">{user.posts?.length}</span>
            </div>
            
           
            
                
            
            
        </section>
    )
}