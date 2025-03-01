import { useEffect, useState } from "react";
import { getTopics } from "../../services/Topics.jsx";

export const FilterBar = ({setSearchTerm,setChosenTopic}) => {
    const [topics, setTopics] = useState([]);

    useEffect(() => {
        getTopics().then((topicArray) => {
          setTopics(topicArray);
        });
      }, []);
      

    
     
      return(
        <div className="filter-bar">
            <select 
            onChange={(event)=>{
                setChosenTopic(event.target.value)}}
            className="topic-filter">
                <option className="topic-option" key="0">Choose a Topic</option>
                {topics.map((topic)=>{
                    return (
                        <option className="topic-option" key={topic.id}>
                            {topic.name}
                        </option>
                    )
                })}
            </select>
            <input
        onChange={(event) => {
          setSearchTerm(event.target.value);
        }}
        type="text"
        placeholder="Search Posts"
        className="post-search"
      />
        </div>
    )
}


