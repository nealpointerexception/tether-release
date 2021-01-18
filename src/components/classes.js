import React, {useEffect, useState} from 'react';
import { Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {fauth, fstore} from "../utils/fire";


const Options = (props) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen(prevState => !prevState);
    const [lastClicked, setLastClicked] = useState(null);
    const [statuses, setStatuses] = useState([]);
    useEffect(()=>{
        if(fauth.currentUser) {
            fstore.collection("users").doc(fauth.currentUser.uid).get().then((doc) => {
                // console.log(doc.data()['enrolled'])
                setStatuses(doc.data()['enrolled']);
            })
        }

    })
    return (
        <h2 className={'nav-class'}>
            Class: {lastClicked}
            <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                <Dropdown.Toggle variant="info">
                    Select Class
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {statuses.map(status => (
                        <Dropdown.Item onClick={() =>
                        {
                            setLastClicked(status)
                            fstore.collection("users").doc(fauth.currentUser.uid).set({

                                action_item: status

                            }, { merge: true }).then(() => {
                                console.log("data written!");
                            })
                        }}>{status}</Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
        </h2>
    );
}

export default Options;