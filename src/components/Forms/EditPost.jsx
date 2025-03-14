import { useEffect, useState } from "react";
import { getTopics } from "../../services/Topics.jsx";
import { getPostById, updatePost } from "../../services/Posts.jsx";
import { useNavigate, useParams } from "react-router-dom";
import "./Form.css"

export const EditPost = ({ currentUser }) => {
  const [topics, setTopics] = useState([]);
  const [post, setPost] = useState({});
  const {postId} = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    getTopics().then((topicArray) => {
      setTopics(topicArray);
    });
  }, []);

useEffect(()=>{
    getPostById(postId).then(data =>{
        const postObj = data
        setPost(postObj)
    })
},[postId])

 const handleInputChange = (event)=> {
    const stateCopy = {...post}
    stateCopy[event.target.name] = event.target.value
    setPost(stateCopy)
 }

const handleSave = (event)=> {
    event.preventDefault()
    const editedPost = {
        id: post.id ,
        title: post.title,
        body: post.body,
        date: new Date(),
        userId: currentUser.id,
        topicId: parseInt(post.topicId)
    }
    updatePost(editedPost).then(()=>{
        navigate("/my-posts")
    })
}
  return (
    <form>
      <h2>Edit Post</h2>
      <fieldset>
        <div className="form-group">
          <label>Title:</label>
          <input 
          type="text" 
          className="form-control" 
          required 
          name="title"
          value={post.title? post.title : "" }
          onChange={handleInputChange}/>
          <label>Body:</label>
          <input
            type="text"
            className="form-control-body"
            required
            name="body"
            value={post.body? post.body : ""}
            onChange={handleInputChange}/>
          <select
            className="select-topic"
            name="topicId"
            onChange={handleInputChange}
          >
            <option className="topic-option" key="0">
              Choose a Topic
            </option>
            {topics.map((topic) => {
              return (
                <option
                  className="topic-option"
                  value={topic.id}
                  key={topic.id}
                  
                >
                  {topic.name}
                </option>
              );
            })}
          </select>
          <button className="save-post" onClick={handleSave} >Save</button>
        </div>
      </fieldset>
    </form>
  );
};
