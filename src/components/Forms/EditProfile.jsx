import "./Form.css"
import { getAllUsers, updateUser} from "../../services/userService.jsx"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const EditProfile = ({currentUser}) => {
    const [users, setUsers] = useState([])
    const [filteredUser, setFilteredUser] = useState([])
    const navigate = useNavigate()

    useEffect(()=>{
        getAllUsers().then((userArray) =>{
            setUsers(userArray)
        })
    },[])

    useEffect(() => {
        const foundUser = users.find((user) => user.id === currentUser.id); 
        setFilteredUser(foundUser); 
    }, [users, currentUser]); 

    const handleInputChange = (event)=> {
        const stateCopy = {...filteredUser}
        stateCopy[event.target.name] = event.target.value
        setFilteredUser(stateCopy)
     }
     const handleSave = (event) => {
        event.preventDefault()
        const updatedUser ={
            name: filteredUser.name,
            cohort: filteredUser.cohort
        }
        updateUser(updatedUser).then(()=>{
                navigate("/profile")
            })
     }

    return(
        <form>
      <h2>Edit Post</h2>
      <fieldset>
        <div className="form-group">
          <label>Name:</label>
          <input 
          type="text" 
          className="form-control" 
          required 
          name="name"
          value={filteredUser?.name ? filteredUser.name : ""}
          onChange={handleInputChange}
          
          />
          <label>Cohort #:</label>
          <input
            type="text"
            className="form-control"
            required
            name="cohort"
            value={filteredUser?.cohort ? filteredUser.cohort : ""}
            onChange={handleInputChange}
            />
            <button className="save-profile" onClick={handleSave} >Save</button>
            </div>
            </fieldset>
        </form>
    )
}