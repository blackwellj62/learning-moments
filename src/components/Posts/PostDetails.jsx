/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import "./AllPosts.css"
import { getPostById } from "../../services/Posts.jsx"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { LikedPost } from "../../services/Likes.jsx"

export const PostDetails = ({currentUser}) => {

    const [post, setPost] = useState({})
    const {postId} = useParams()

    const setAndUpdate = () => {
        getPostById(postId).then(data =>{
            const postObj = data
            setPost(postObj)
        })
    }

    useEffect(()=>{
        setAndUpdate()
    },[postId])

    const handleFav = () => {
       
        const newLike = {
            userId: currentUser.id,
            postId: post.id
        }
        LikedPost(newLike)
        setAndUpdate()
    }

    return(
        <section className="post">
            <header className="post-title">{post.title}</header>
            <div>
              <span className="post-author">Author: {post.user?.name}</span>  
              
            </div>
            <div>
                <span className="post-topic">Topic: {post.topic?.name}</span>
            </div>
            <div className="post-body">
                 {post.body}
            </div>
            <div className="post-date">
                {post.date}
            </div>
            <div className="post-likes">
                {post.likes?.length}💟
            </div>
            <div className="btn-container">
                {currentUser.id === post.user?.id ?
                <button className="btn-edit">Edit Post</button> : 
                <button className="btn-fav" onClick={handleFav}>💟</button>}
            </div>
            
        </section>
    )

}