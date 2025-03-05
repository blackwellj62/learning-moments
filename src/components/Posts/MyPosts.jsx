import "./AllPosts.css";
import { getAllPosts, deletePost } from "../../services/Posts.jsx";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const MyPosts = ({ currentUser }) => {
  const [allPosts, setAllPosts] = useState([]);
  const [userPosts, setUserPosts] = useState([]);

  const reFetch = () => {
    getAllPosts().then((postsArray) => {
        setAllPosts(postsArray);
      });
  }
  
  useEffect(() => {
    reFetch()
  }, []);

  useEffect(() => {
    const foundPosts = allPosts.filter(
      (post) => post.userId === currentUser.id
    );
    
    setUserPosts(foundPosts);
  }, [allPosts, currentUser]);

  const handleDelete = (userPosts) => {
    deletePost(userPosts)
    reFetch(userPosts)
  }

  return (
    <section className="my-posts">
      {userPosts.map((postObj) => {
        return (
        
            <div key={postObj.id}>
            <Link to={`/${postObj.id}`} key={postObj.id} className="post-link">
              <div className="user-posts">{postObj.title}</div>
            </Link>
            <button className="trash-btn" onClick={() =>{handleDelete(postObj.id)}}>🗑️</button>
              
          </div>
        );
      })}
    </section>
  );
};
