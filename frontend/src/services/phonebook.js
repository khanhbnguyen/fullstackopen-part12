import axios from "axios"
const baseURL = "/api/persons"

const getAll = () => {
    const request = axios.get(baseURL)
    return request.then(response => {
        return response.data
    })
}

const create = (newPerson) => {
    const request = axios.post(baseURL, newPerson)
    return request.then(response => {
        return response.data
    })
}

const remove = (id) => {
    const request = axios.delete(baseURL + "/" + id)
    return request.then(response => {
        return response.data
    })
}

const put = (matchedPerson, newNumber) => {
    const newPerson = { ...matchedPerson, number: newNumber }
    const request = axios.put(baseURL + "/" + matchedPerson.id, newPerson) 
    return request.then(response => {
        return response.data
    })
}

export default {
    getAll: getAll,
    create: create,
    remove: remove,
    put: put
}