import { useEffect, useState } from "react"
import { getAllPosts } from "../../services/Posts.jsx"
import { getLikes } from "../../services/Likes.jsx"
import { Link } from "react-router-dom"
import { removeLikes } from "../../services/Likes.jsx"

export const Favorites = ({currentUser}) => {

    const [allPosts, setAllPosts] = useState([])
    const [filteredPosts, setFilteredPosts] = useState([])
    const [allLikes, setAllLikes] = useState([])
    const [filteredLikes, setFilteredLikes] = useState([])

    useEffect(()=>{
        getAllPosts().then((postsArray)=>{
            setAllPosts(postsArray)
        })
    },[])

    useEffect(()=>{
        getLikes().then((likesArray)=>{
            setAllLikes(likesArray)
        })
    },[])

    useEffect(()=>{
        const foundLikes = allLikes.filter(like=>
            like.userId === currentUser?.id)
            setFilteredLikes(foundLikes)
    },[currentUser,allLikes])

    useEffect(()=>{
        const foundPosts = allPosts.filter(post => {
            const match = filteredLikes.find(like => like.postId === post.id);
            return match !== undefined
        })
        setFilteredPosts(foundPosts)
    },[filteredLikes,allPosts])

    const handleRemove = (filteredPosts) => {
            removeLikes(filteredPosts)
    }

    return(
        <section className="fav-posts">
      {filteredPosts.map((postObj) => {
        return (
        
            <div key={postObj.id}>
            <Link to={`/${postObj.id}`} key={postObj.id} className="post-link">
              <div className="user-fav-posts">{postObj.title}</div>
            </Link>
            <button  onClick={handleRemove}>Remove</button>
              
          </div>
        );
      })}
    </section>
    )
}