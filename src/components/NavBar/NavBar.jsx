import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"


export const NavBar = () => {
    

    const navigate = useNavigate
    return(
        <ul className="navbar">
            <li className="navbar-item">
                <Link to="/" className="navbar-link">All Posts</Link>
            </li>
            <li className="navbar-item">
              <Link to="/new-post" className="navbar-link">New Post</Link>
            </li>
            <li className="navbar-item">
              <Link to="/my-posts" className="navbar-link">My Posts</Link>
            </li>
            <li className="navbar-item">
              <Link to="/favorites" className="navbar-link">Favorites</Link>
            </li>
            <li className="navbar-item">
              <Link to="/profile" className="navbar-link">Profile</Link>
            </li>
            {localStorage.getItem("learning_user") ? (
  <li className="navbar-logout" >
    <Link
      to=""
      className="navbar-link"
      onClick={() => {
        localStorage.removeItem("learning_user")
        navigate("/login", { replace: true })
      }}
    >
      Logout
    </Link>
  </li>
) : (
  ""
)}
        </ul>
    )
}