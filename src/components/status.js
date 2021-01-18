import React, {useEffect, useState} from 'react';
import { Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css'
import {fauth, fstore} from "../utils/fire";

const Status = (props) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen(prevState => !prevState);
    const [lastClicked, setLastClicked] = useState(null);

    const statuses = ["Studying", "Relaxing"]

    useEffect(()=>{
        if(fauth.currentUser) {
            fstore.collection("users").doc(fauth.currentUser.uid).get().then((doc) => {
                // console.log(doc.data()['enrolled'])
                if(doc.data()['action'] == "relax"){
                    setLastClicked("Relaxing")
                }
                else{
                    setLastClicked("Studying");
                }
            })
        }

    })


    return (
        <h2 className={'nav-status'}>
            Status: {lastClicked}
            <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                <Dropdown.Toggle variant="info">
                    Select Status
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {statuses.map(status => (
                        <Dropdown.Item onClick={() => {
                            setLastClicked(status)
                            let action = "";
                            if(status === "Studying"){
                                action = "study"
                            }
                            else{
                                action = "relax"
                            }
                            fstore.collection("users").doc(fauth.currentUser.uid).set({

                                action: action

                            }, { merge: true }).then(() => {
                                console.log("data written!");
                            })
                        }
                        }>{status}</Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
        </h2>
    );
}

export default Status;