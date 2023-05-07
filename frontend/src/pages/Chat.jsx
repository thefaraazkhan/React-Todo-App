/* eslint-disable */
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import queryString from "query-string";
import { useHistory, useLocation } from "react-router-dom";
import { io } from "socket.io-client";
import styled from "styled-components";
import { allUsersRoute, host } from "../utils/APIRoutes";
import ChatContainer from "../components/ChatContainer";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";

// import { setAuthentication, isAuthenticated } from "../../src/helpers/auth";
import { API_URL } from "../config";

export default function Chat() {
  const history = useHistory();
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);

  const location = useLocation();

  useEffect(async () => {
    if (localStorage.getItem("admin") == null) {
      history.push("/login");
    } else {
      console.log("no")
      setCurrentUser(
        await JSON.parse(
          localStorage.getItem("admin")
        )
      );
    }
  }, []);
  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect(async () => {
    if (currentUser) {
      const data = await axios.get(`${allUsersRoute}/${currentUser._id}?to=${currentUser._id}`);
      setContacts(data.data);
    }
  }, [currentUser]);

  const result = queryString.parse(location.search);
  const ShopId = result.shopId;
  // const productID = result.productId;

  useEffect(async () => {
    const defaultChat = await axios.get(`${API_URL}/api/adminRegister/${ShopId}`)
    console.log(defaultChat.data[0], "defaultChat");
    const { firstName, lastName, email, _id } = defaultChat.data[0]
    const obj = { firstName, lastName, email, _id };
    setCurrentChat(obj);
  }, [])



  // const defaultOpenChat = contacts?.filter(element=>{
  //   return element._id == ShopId
  // })

  // useEffect(() => {
  //   setCurrentChat(defaultOpenChat)
  // }, []);


  const handleChatChange = (chat) => {
    console.log(chat, "echat...")
    setCurrentChat(chat);
    console.log(chat)
  };
  return (
    <>
      <Container>
        <div className="container">
          <Contacts contacts={contacts} changeChat={handleChatChange} ShopId={ShopId} />
          {currentChat === undefined ? (
            <Welcome />
          ) : (
            <ChatContainer currentChat={currentChat} socket={socket} />
          )}
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;
