import React, {useState, useEffect, useContext} from 'react';
import Table from './Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import {UserContext} from '../context';
import Add from './Add';

const axios = require('axios');

function Home (props) {
    const [users, setUsers] = useState([]);
    let loaded = false;
    let cur= useContext(UserContext);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleRemove = (id) => {
      console.log("Deleting");
      console.log(id);
      handleClose();
  }
  
    useEffect(()=>{
      axios.get("https://reqres.in/api/users?page=2").then(res => {
        const arr = [...cur["users"]];
        for (const key in res.data["data"]){
          let user = res.data["data"][key];
          arr.push(
          {
          id: user["id"],
          name: user["first_name"] + " " + user["last_name"],
          email: user["email"],
          url: user["avatar"]
          }
          );
      }
        setUsers(arr);
        loaded = true;
      })
    })
  
    return(
      <div>
        <Link to="/add">
          <Button variant="info">
            Create user
          </Button>
        </Link>
        <Table arr={users}>
          {users.map((t,i)=>{
            return(
              <tr key={t.name}>
                <td>{t.id}</td>
                <td>{t.name}</td>
                <td>{t.email}</td>
                <Link to={
                  {
                    pathname: '/edit',
                    user: t,
                  }
                }>
                <Button variant="light">Edit</Button>
                </Link>
                <PopUp user={t}/>
              </tr>
            )})
          }
        </Table>
      </div>
    )
  }

  function PopUp(props){

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleRemove = (u) => {
      console.log("Deleting", u);
      let res = u.name.split(" ");
      axios.delete("https://reqres.in/api/users/2",{
        data:{
          id: u.id,
          email: u.email,
          first_name: res[0],
          last_name: res[1],
          avatar: u.url,
        }
      }).then(res=>{
        if (res.status == 204) console.log("Success - status " + res.status)
      }
      )
      handleClose();
    }

    return(
    <>
    <Button variant="dark" onClick={handleShow}>Delete</Button>
    <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Confirm</Modal.Title>
    </Modal.Header>
    <Modal.Body>Are you sure you want to delete {props.user.name} ?</Modal.Body>
    <Modal.Footer>
      <Button variant="primary" onClick={() => handleRemove(props.user)}>Yes</Button>
      <Button variant="secondary" onClick={handleClose}>No</Button>
    </Modal.Footer>
    </Modal>
    </>
    )
  }

  export default Home;