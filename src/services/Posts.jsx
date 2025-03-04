export const getAllPosts = async () => {
    return fetch('http://localhost:8088/posts?_expand=topic&_embed=likes').then(res=> res.json())
}

export const getPostById =  (id) => {
    return fetch(`http://localhost:8088/posts/${id}?&_expand=user&_expand=topic&_embed=likes`).then(res=>res.json())
}

