import React from 'react'


const Add = ({onSubmit, nameValue, numberValue, nameHandler, numberHandle}) => {


    return (
        <div>
            <form onSubmit={onSubmit}>
        <div>
          Name: <input value={nameValue} onChange={nameHandler}/>
        </div>
        <div>
          Phone number: <input value={numberValue} onChange={numberHandle}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      </div>
    )
}

export default Add