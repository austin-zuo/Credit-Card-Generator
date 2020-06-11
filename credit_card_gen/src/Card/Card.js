import React from 'react';
const card = (props) => {

    return (
        <div>
            {props.num} &nbsp;&nbsp;
            <button onClick={props.showVerify}>Verify</button>
        </div>
    )
}
export default card;