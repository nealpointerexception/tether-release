import { DataSet, Network } from 'vis-network/standalone/esm/vis-network';
import React, { Component, createRef } from "react";
import {fauth, fstore} from '../utils/fire'
import {act} from "@testing-library/react";


  const nodes = new DataSet([
    { id: "test", shape: "circularImage", image: "./logo192.png", label: 'Node 1', action: 'study', action_item: 'AM 20' },
  ]);
  
  // create an array with edges
  const edges = new DataSet([

  ]);


  const data = {
    nodes: nodes,
    edges: edges
  };

  const options = {
      nodes: {
      size: 35,
      borderWidth: 2,
      color: {
        border: "#222222",
        background: "#666666",
      },
      font: { color: "#eeeeee" },


    }
  };
  
  export default class VisNetwork extends Component {
  
    constructor(props) {
      super(props);
      this.network = {};
      this.appRef = createRef();
      this.onNc = this.props.onNodeClick

    }
    bigbrane = (properties) =>{
      const clickedNode = nodes.get(properties.nodes);
      this.onNc(clickedNode);
    }
  
    componentDidMount() {
      // if(fauth.currentUser) {
      //   fstore.collection("users").doc(fauth.currentUser.uid).get().then((doc)=>{
      //     try {
      //       nodes.update({
      //         id: fauth.currentUser.uid,
      //         shape: "circularImage",
      //         image: fauth.currentUser.photoURL,
      //         label: fauth.currentUser.displayName,
      //         action: doc.data()['action'],
      //         action_item: doc.data()['action_item']
      //       })
      //     }
      //     catch{
      //
      //     }
      //   })
      // }


        fstore.collection("users")
            .where("active", "==", true)
            .get().then((qs) => {
          qs.forEach((doc) => {
            try {
              nodes.update({
                id: doc.id,
                shape: "circularImage",
                image: doc.data()['user_img'],
                label: doc.data()['display_name'],
                action: doc.data()['action'],
                action_item: doc.data()['action_item']
              })
            }
            catch{

            }

          })
        })
      fstore.collection("users").where("active", "==", true)
          .onSnapshot((qs)=>{
            qs.forEach((doc)=>{

              nodes.update({
                id: doc.id,
                action: doc.data()['action'],
                action_item: doc.data()['action_item']
              })

              if(doc.id !== fauth.currentUser.uid) {
                if (doc.data()['action'] === nodes.get(fauth.currentUser.uid).action) {

                  let items = edges.get({
                    filter: (item)=>{
                      return item.to === doc.id;

                    }
                  })
                  edges.remove(items);

                  if (doc.data()['action'] === 'relax') {
                    edges.update({
                      from: fauth.currentUser.uid,
                      to: doc.id
                    })
                  } else if (doc.data()['action_item'] === nodes.get(fauth.currentUser.uid).action_item) {
                    edges.update({
                      from: fauth.currentUser.uid,
                      to: doc.id
                    })
                  }
                }
              }
              else{
                console.log("bad")
                let my_action = nodes.get(fauth.currentUser.uid).action;
                let my_ai = nodes.get(fauth.currentUser.uid).action_item;
                let items = nodes.get({
                  filter: (item)=>{
                    if(item.id !== fauth.currentUser.uid) {

                      if(item.action === my_action){
                        if(item.action === "relax"){
                          return 1
                        }
                        else if(item.action_item === my_ai){
                          return 1
                        }

                      }

                    }
                }
                })
                edges.clear();
                items.forEach((i)=>{
                  console.log("poop")
                  console.log(edges.get({
                    from: fauth.currentUser.uid,
                    to: i.id
                  }))
                  edges.update({
                    from: fauth.currentUser.uid,
                    to: i.id
                  })
                })

              }


            })
          })

      this.network = new Network(this.appRef.current, data, options);
      this.network.on('click', this.bigbrane)
    }
  
    render() {

      return (
        <div ref={this.appRef} className='network'/>
      );
    }
  }
