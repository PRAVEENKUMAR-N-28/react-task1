import React from "react";
import "./List.css";

function List (props) {
    return(
        <>
            <div className="container2">
                <ul>
                    {props.data.map((val,idx) => {
                        return<li key={idx}>{val}</li>
                    })}
                </ul>
            </div>
        </>
    )
}

export default List;