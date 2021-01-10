import React from 'react'

const ShowPerson = (props) => {

    return (

        <ul>
        {props.persons.filter(person => person.name.toLowerCase().includes(props.newSearch.toLowerCase())).map(user => <li key={user.name}>{user.name} {user.number}</li>)}
      </ul>
    )
}

export default ShowPerson