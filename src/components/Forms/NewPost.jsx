import "./Form.css"
import { getTopics } from "../../services/Topics.jsx";
import { useEffect, useState } from "react";
import { newPost } from "../../services/Posts.jsx";
import { useNavigate } from "react-router-dom";

export const NewPost = ({currentUser}) => {
    const [topics, setTopics] = useState([])
    const [chosenTopic, setChosenTopic] = useState('')
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const navigate = useNavigate()


    useEffect(() => {
            getTopics().then((topicArray) => {
              setTopics(topicArray);
            });
          }, []);
    
    const handleSave = (event) => {
        event.preventDefault()
        const post = {
            title: title,
            body: body,
            date:  new Date(),
            userId: currentUser.id,
            topicId: parseInt(chosenTopic)
        }
        newPost(post).then(()=>{
            navigate('/my-posts')
        })
    }

    const isFormValid = () => {
        return title.trim() !== "" && body.trim() !== "" && chosenTopic !== '';
      };

  return (
    <main>
      <section>
        <form className="form-container">
          <fieldset>
              <h2>New Post</h2>
            <div className="form-group">
              <h2>Title :</h2>
              <input
                onChange={(event)=>{
                    setTitle(event.target.value)
                }}
                className="form-control"
                type="text"
                name="title"
                required
                placeholder="Enter Title Here"
              />
              <h2>Body :</h2>
              <input
                onChange={(event)=>{
                    setBody(event.target.value)
                }}
                className="form-control-body"
                type="text"
                name="body"
                required
                placeholder="Enter Text Here"
                />
                <select 
                className="select-topic"
                onChange={(event)=>{
                    setChosenTopic(event.target.value)}}>
                <option className="topic-option" key="0">Choose a Topic</option>
                {topics.map(topic=>{
                    return(
                    <option className="topic-option"  value={topic.id} key={topic.id}>{topic.name}</option>
                    )
                })}
                </select>
                <button className="save-post" onClick={handleSave} disabled={!isFormValid()}>Save</button>
                </div>
          </fieldset>
          
          
        </form>
      </section>
    </main>
  );
};
