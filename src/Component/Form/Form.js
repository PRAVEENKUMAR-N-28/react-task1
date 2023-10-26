import React,{useEffect, useState} from "react";
import "./Form.css";
import List from "../List/List";

function Form(){
    const [item,itemfn]=useState([])
    const [list,listfn]=useState(true)
    useEffect(()=>{
        async function fetcher(){
            const fetchedData = await fetch("https://project-1-d0ce6-default-rtdb.asia-southeast1.firebasedatabase.app/list.json")
            const responseData = await fetchedData.json()
            if(responseData){
                itemfn(responseData)
                listfn(false)
            }
        
        }
        fetcher()
    },[])
    async function SubmitEve(eve){
        listfn(false)
        eve.preventDefault();
        if(!eve.target[0].value.trim()){
            alert("please Enter the value")
            return
        }
        itemfn((prevState)=>{
            return[...prevState,eve.target[0].value]
        })
        const postedData =await fetch("https://project-1-d0ce6-default-rtdb.asia-southeast1.firebasedatabase.app/list.json",{
            method:"PUT",
            body:JSON.stringify([...item,eve.target[0].value]),
            headers:{
                "Content-Type":"application/json"
            }
        }) //add the realetime data base with this application and allow to put value in json formate
        if (!postedData.ok){
            alert("Pls Enter th word in the Given text box")
            return
        }
        
    }
    return(
       <>
        <div className="Container">
            <form onSubmit={SubmitEve}>
                <label htmlFor="List">Enter Text</label>
                <input type="text" className="list" id="List" placeholder="Add Text To List" />
                <button type="Submit">Submit</button>
            </form>
            
        </div>
        {list ? "" :<List data={item}></List>}
       </>
    )
}
export default Form;