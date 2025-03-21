export const getAllPosts = async () => {
    return fetch('http://localhost:8088/posts?_expand=topic&_embed=likes').then(res=> res.json())
}

export const getPostById =  (id) => {
    return fetch(`http://localhost:8088/posts/${id}?&_expand=user&_expand=topic&_embed=likes`).then(res=>res.json())
}

export const newPost = (post) => {
    return fetch('http://localhost:8088/posts',{
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(post)
    })
}

export const updatePost = (post) => {
    return fetch(`http://localhost:8088/posts/${post.id}`,{
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(post)
    })
}

export const deletePost = (id) => {
    return fetch(`http://localhost:8088/posts/${id}`,{
        method: "DELETE",
        
    })
}   