import React from 'react'

const ShowPerson = (props) => {

    if(props.newSearch) {
      return (
        <ul>
          {props.persons.filter(person => 
            person.name.toLowerCase().includes(props.newSearch.toLowerCase())).map(user => 
            <li value={user.id} key={user.id} style={{textTransform: 'capitalize'}}>
              {user.name} {user.number} 
              <button value={user.id} onClick={props.onClickHandler}>
                Delete
              </button>
            </li>)} 
        </ul>
      )
    } else {
      return (
        <ul>
          {props.persons.map(user => 
            <li value={user.id} key={user.id} style={{textTransform: 'capitalize'}}>
              {user.name} {user.number} 
              <button value={user.id} onClick={props.onClickHandler}>
                Delete
              </button>
            </li>)} 
        </ul>
      )
    }
}

export default ShowPerson