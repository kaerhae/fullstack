import React from 'react'


const Add = (props) => {


    return (
        <div>
            <form onSubmit={props.onSubmit}>
        <div>
          Name: <input value={props.nameValue} onChange={props.nameHandler}/>
        </div>
        <div>
          Phone number: <input value={props.numberValue} onChange={props.numberHandle}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
        </div>
    )
}

export default Add