export const getTopics = async () => {
    return fetch('http://localhost:8088/topics').then(res=> res.json())
}