import { getAllPosts } from "../../services/Posts.jsx";
import { useState, useEffect } from "react";
import "./AllPosts.css";
import { FilterBar } from "../FilterBar/FilterBar.jsx";
import { getTopics } from "../../services/Topics.jsx";
import { Link } from "react-router-dom";

export const AllPosts = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [chosenTopic, setChosenTopic] = useState([])
  const [topics, setTopics] = useState([]);
  


  useEffect(() => {
    getAllPosts().then((allPostsArray) => {
      setAllPosts(allPostsArray);
    });
  }, []);

  useEffect(() => {
    getTopics().then((topicArray) => {
      setTopics(topicArray);
    });
  }, []);

    useEffect(()=>{
        const foundPosts = allPosts.filter(post => 
            post.title.toLowerCase().includes(searchTerm.toLocaleLowerCase()))
            setFilteredPosts(foundPosts)
      },[searchTerm, allPosts])

   useEffect(()=>{
       const filterByTopic = allPosts.filter(post=>
            post.topic.name === chosenTopic)
            setFilteredPosts(filterByTopic)
            if (chosenTopic === "Choose a Topic"){
                setFilteredPosts(allPosts)
            }
           
   },[chosenTopic])
 
     
  return (
      <section className="posts">
        <FilterBar setSearchTerm={setSearchTerm}
        setChosenTopic={setChosenTopic}/>
      {filteredPosts.map((postObj) => {
        return (
          <div className="post-info" key={postObj.id}>
            <h2 className="h2">Title:</h2>
            <div className="post-title">
            <Link to={`/${postObj.id}`} key={postObj.id} className="post-link">
              <div>{postObj.title}</div>
          </Link>
            </div>
            <h2 className="h2">Topic:</h2>
            <div className="post-topic">
              <div>{postObj.topic.name}</div>
            </div>
            <div className="post-likes">
              <div>{postObj.likes.length}💟</div>
            </div>
          </div>
        );
      })}
    </section>
  );
};
