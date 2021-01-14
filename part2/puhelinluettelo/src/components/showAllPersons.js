import React from 'react'

const ShowPerson = ({persons, onClickHandler, newSearch}) => {


 
    return (

        <ul>
        {persons.filter(person => 
          person.name.toLowerCase().includes(newSearch.toLowerCase())).map(user => 
          <li value={user.id} key={user.id}>
            {user.name} {user.number} 
          <button value={user.id} onClick={onClickHandler}>
            Delete
          </button>
          </li>)} 
      </ul>
    )
}

export default ShowPerson