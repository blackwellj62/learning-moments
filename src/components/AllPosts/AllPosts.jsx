import { getAllPosts } from "../../services/Posts.jsx"
import { useState, useEffect } from "react"
import './AllPosts.css'
// import { getTopics } from "../../services/Topics.jsx"


export const AllPosts = ({}) => {
    const [allPosts, setAllPosts] = useState([])
    // const [topics, setTopics] = useState([])
   

    useEffect(()=>{
        getAllPosts().then((allPostsArray)=>{
            setAllPosts(allPostsArray)
        })
        
    },[])

    // useEffect(()=> {
    //     getTopics().then((topicArray)=>{
    //         setTopics(topicArray)

    //     })
    // },[])
    
    

    


    return(
    <section className="posts">
        {allPosts.map((posts)=>{
            return(
                <div className="post-info" key={posts.id}>
                    <h2 className="h2">Title:</h2>
                    <div className="post-title">
                        <div>{posts.title}</div>
                    </div>
                    <h2 className="h2">Topic:</h2>
                    <div className="post-topic">
                        <div>{posts.topic.name}</div>
                    </div>
                   <div>{posts.likes.length}💟</div>
                   
                </div>
            )
        })}

    </section>
    )
}