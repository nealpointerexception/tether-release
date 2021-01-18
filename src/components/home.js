import '../App.css';
import React, {useState, useEffect, useRef} from 'react';
import {fauth, fstore, signInWithGoogle} from "../utils/fire";
import dots from "../assets/dots.jpg"
import Navbar from "./Navbar";
import {useHistory} from "react-router-dom";
import VisNetwork from "./graph";
import Typical from 'react-typical'
function Home(){
    const [nodeString, setNodeString] = useState("");
    let history = useHistory();
    const myRef = useRef(null)
    fauth.onAuthStateChanged(user => {
        if(!user) {
            history.push('/')
        }
    });

    let nodeClick = (node) =>{
        let dat = node[0];
        try{
            setNodeString(`${dat.label} is ${dat.action}ing`)
        }
        catch{

        }

    }

    useEffect( () => {
        //signInWithGoogle();
        if (fauth.currentUser == null) {
            history.push('/')
        }


    })
    return(
        // style={{backgroundImage:"url(" + dots +  ")"}}
        <div className={"bg"} style={{backgroundImage:"url(https://wallpapershome.com/images/wallpapers/huawei-mate-20-2560x1440-android-8-0-abstract-hd-20680.jpg)"}}>
            <div style={{gridTemplateColumns: "1fr 1fr"}}>
            <Navbar/>
            <button onClick={
                () => {
                    fauth.signOut().then(() => {
                        console.log("good!")
                    })
                }
            }
            >signout</button>
            <div className={"pane2"} style={{width:"70%"}}>
                <VisNetwork onNodeClick={nodeClick}/>
                <h1></h1>
                {/*<Typing>*/}
                <h1 className={"title"} style={{color: "white", fontSize:"50px"}}>
                    <Typical
                        steps={[nodeString, 600]}
                        loop={1}
                        wrapper="p"
                    />
                </h1>
                {/*</Typing>*/}

            </div>
            </div>
        </div>

    )
}
export default Home;
