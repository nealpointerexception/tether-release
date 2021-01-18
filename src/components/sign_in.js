import '../App.css';
import Particles from "react-particles-js";
import signin from '../assets/signin.png'
// import fauth from "../utils/firebase";
import {fauth, signInWithGoogle} from  "../utils/fire"
import { useHistory } from "react-router-dom";
import bgd from "../assets/bg.jpg"
function SignIn() {
    let history = useHistory();
    fauth.onAuthStateChanged(user => {
        if(user) {
            console.log(user);
            history.push('/home')
        }
    });
    return (
        <div className={"bg"} style={{  backgroundImage: "url(" + bgd +  ")"}}>
            <Particles
                params={{
                    "particles": {
                        "color": {
                            "value": "#ffffff"
                        },
                        "line_linked": {
                            "enable_auto": false,
                            "color": "#5c7bd0"
                        },
                        "number": {
                            "value": 50
                        },
                        "size": {
                            "value": 10
                        }
                    },
                    "interactivity": {
                        "events": {
                            "onhover": {
                                "enable": true,
                                "mode": "bubble"
                            }
                        }
                    }
                }} className={"particles"}/>

            <div className={"pane"}>
                <h1 className={"title"}>welcome.</h1>
                <img src={signin} width={200} style={{
                    "display": "block",
                    "marginLeft": "auto",
                    "marginRight": "auto",
                    "paddingTop": "13%"
                }} onClick={signInWithGoogle}/>
            </div>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@700&display=swap');
            </style>
        </div>
    );
}

export default SignIn;