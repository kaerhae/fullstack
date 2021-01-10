import React from 'react';
import ReactDOM from 'react-dom'




const Filter = (props) => {




    return (
        <div>
        Filter: <input value={props.value} onChange={props.onChange} />
      </div>
    )
}


export default Filter;