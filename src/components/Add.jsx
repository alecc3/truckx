import React, {Component, createRef} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {UserContext} from '../context';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";


const axios = require('axios');

export default class Add extends Component{
    constructor(props){
        super(props)
        this.fname = React.createRef();
        this.lname = React.createRef();
        this.email = React.createRef();
        this.url = React.createRef();
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(e){
        e.preventDefault();
        let add = {
            id: Math.floor(Math.random()*(50-13)+13),
            name: this.fname.current.value + " " + this.lname.current.value,
            email: this.email.current.value,
            url: this.url.current.value,
        }
        axios.post("https://reqres.in/api/users",add)
        .then((res) => {
            if (res.status == "201")
            {console.log("Success - status " + res.status,add)}
        })

    }
    render(){
    return(
        <Container>
            <Form onSubmit={this.handleSubmit}>
            Add User
            <Row>
                <Col xs={6}>
                    <Form.Group controlId="nameF">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control ref={this.fname} type="text" placeholder="First Name"/>
                    </Form.Group>
                </Col>

                <Col xs={6}>
                <Form.Group controlId="nameL">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control ref={this.lname} type="text" placeholder="Last Name"/>
                </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col xs={6}>
                    <Form.Group controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control ref={this.email} type="text" placeholder="Enter email"/>
                    </Form.Group>
                </Col>
                <Col xs={6}>
                    <Form.Group controlId="avatar">
                    <Form.Label>Avatar URL</Form.Label>
                    <Form.Control ref={this.url} type="text" placeholder="Enter avatar URL"/>
                    </Form.Group>
                </Col>
            </Row>
            <Button type="submit">Create</Button>
            </Form>
        </Container>
    )
    }}