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
        // return axios.post('http://localhost:3001/chat', {
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
            <form onSubmit={onMessageSubmit}>
                <h1>Messenger</h1>
                <div className="name-field">
                    <TextField name="name" onChange={(e) => onTextChange(e)} value={state.name} label="Name" />
                </div>
                <div>
                    <TextField
                        name="message"
                        onChange={(e) => onTextChange(e)}
                        value={state.message}
                        id="outlined-multiline-static"
                        variant="outlined"
                        label="Message"
                    />
                </div>
                <button>Send Message</button>
            </form>
            <div className="render-chat">
                <h1>Chat Log</h1>
                {renderChat()}
            </div>
        </div>
    )
}

export default Buzz

