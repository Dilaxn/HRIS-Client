import TextField from "@material-ui/core/TextField"
import React, { useEffect, useRef, useState } from "react"
import io from "socket.io-client"
import "./App.css"
import {readAllChats} from "../../context/ChatContext";
import {readAllNationalities} from "../../context/OrganizationContext";
import axios from "axios";
import {readAllWorkShifts} from "../../context/JobContext";

function Buzz() {

    const [ state, setState ] = React.useState({ message: "", name: "" })
    const [ chat, setChat ] = React.useState([])
    const [ chats, setChats ] = React.useState([])


    const socketRef = useRef()

    useEffect(
        () => {
            // readAllChats().then(r => setChats(r))
            socketRef.current = io.connect("http://localhost:4000")
            console.log("dsf"+socketRef.current.on);
            socketRef.current.on("message", ({ name, message }) => {
                setChat([ ...chat, { name, message } ])
            })
            console.log(chat)
            // return () => socketRef.current.disconnect()
        },
        [ chat ]
    )

    const onTextChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }

    const onMessageSubmit = (e) => {
        const { name, message } = state
        setChat([ ...chats, { name, message }])
        // const cd = {name,message}
        // return axios.post('/chat', {
        //    name,message
        // })
            // .then(function (response) {
            //     readAllChats().then(r => setChats(r))
            // })
        socketRef.current.emit("message", { name, message })
        e.preventDefault()
        setChat([ ...chat, { name, message } ])
        console.log(chat)
        setState({ message: "", name })
    }

    const renderChat = () => {
        return chat.map(({ name, message }, index) => (
            <div key={index}>
                <h3>
                    {name}: <span>{message}</span>
                </h3>
            </div>
        ))
    }

    return (
        <div className="card">
            <center>
            <form onSubmit={onMessageSubmit}>
                <h1>Share Topics</h1>
                <div className="name-field">
                    <TextField name="Topic" onChange={(e) => onTextChange(e)} value={state.name} label="Topic" />
                </div>
                <div>
                    <TextField style={{marginTop:"20px",marginBottom:"20px"}}
                        name="message"
                        onChange={(e) => onTextChange(e)}
                        value={state.message}
                        id="outlined-multiline-static"
                        variant="outlined"
                        label="Message"
                    />
                </div>
                <button style={{color:"primary"}}>Send Topic</button>
            </form>
            </center>
            <div className="render-chat">
                <h1>Topics</h1>
                {renderChat()}
            </div>
        </div>
    )
}

export default Buzz

