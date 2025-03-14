export const LikedPost = (newLike) => {
    return fetch (`http://localhost:8088/likes`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newLike)
    })
}

export const getLikes = () => {
    return fetch('http://localhost:8088/likes').then(res=> res.json())
}

export const removeLikes = (id) => {
    return fetch(`http://localhost:8088/likes/${id}`,{
        method: "DELETE",
    })
}