import '../App.css';
import './Navbar.css'
import React, {useState, useEffect} from 'react';
import fire, {fauth, fstore} from "../utils/fire";
import Options from "./classes";
import Status from "./status";
function Navbar(){
    const [name, setName] = useState("name");
    const [img_url, setImgU] = useState("none");

    useEffect(()=>{
        if(fauth.currentUser) {
            setName(fauth.currentUser.displayName);
            setImgU(fauth.currentUser.photoURL);
        }


    })

    return(
        <div className={"nav-menu"}>
            <img className={"nav-item"} style={{marginTop: "30%"}} height={"19%"} src={img_url}/>
            <h2 className={"nav-text"} style={{fontSize: "30px"}}>{name}</h2>
            <Options />
            <Status />
        </div>
    )
}
export default Navbar;
