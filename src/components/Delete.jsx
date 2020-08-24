import React, {Component, useState, createRef} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const axios = require('axios');

function Delete (props){
        const [show, setShow] = useState(false);
        const handleClose = () => setShow(false);

        const del = () => {
            console.log("Deleting")
            handleClose();
        }
        const handleShow = () => setShow(true);
        return(
            <div>
                <Button variant="primary" onClick={handleShow}>Launch demo modal</Button>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete {props.location.user.name}?</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={del}>
            Yes
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
            </div>
        )}
export default Delete;