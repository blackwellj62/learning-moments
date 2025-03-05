import { Outlet, Route, Routes } from "react-router-dom"
import { AllPosts } from "../components/Posts/AllPosts.jsx"
import { NavBar } from "../components/NavBar/NavBar.jsx"
import { useEffect, useState } from "react"
import { PostDetails } from "../components/Posts/PostDetails.jsx"
import { NewPost } from "../components/Forms/NewPost.jsx"
import { MyPosts } from "../components/Posts/MyPosts.jsx"




export const ApplicationViews = () => {
    const [currentUser, setCurrentUser] = useState({})

useEffect(() => {
  const localLearningUser = localStorage.getItem("learning_user")
  const learningUserObject = JSON.parse(localLearningUser)
  setCurrentUser(learningUserObject)
}, [])

    return(
        <Routes>
            <Route path="/" element={
                <>
                <NavBar/>
                <Outlet/>
                </>
            }>
            <Route index element={<AllPosts/>}/>
            <Route path=":postId" element={<PostDetails currentUser={currentUser}/>}/>
            <Route path="/new-post" element={<NewPost currentUser={currentUser}/>}/>
            <Route path="/my-posts" element= {<MyPosts currentUser={currentUser}/>}/>
            </Route>
        </Routes>
    )
}