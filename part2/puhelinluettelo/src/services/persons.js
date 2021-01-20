import axios from 'axios'

const baseUrl = '/api/persons'

const getAllPersons = () => {
    return axios.get(baseUrl)
}

const createPerson = newObject => {

    return axios.post(baseUrl, newObject)
}

const deletePerson = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

const updatePerson = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject)
}


export default {
    getAllPersons: getAllPersons,
    createPerson: createPerson,
    deletePerson: deletePerson,
    updatePerson: updatePerson
}