import React, {Component, createRef} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const axios = require('axios');

export default class Edit extends Component{
    constructor(props){
        super(props)
        this.fname = React.createRef();
        this.lname = React.createRef();
        this.email = React.createRef();
    }

    handleSubmit(e){
        e.preventDefault();
        let add = {
            id: this.props.location.user.id,
            name: this.fname.current.value + " " + this.lname.current.value,
            email: this.email.current.value,
            url: this.props.location.user.url,
        }
        axios.put("https://reqres.in/api/users/2",add)
        .then((res) => {
            if (res.status == "200") console.log("Success - status " + res.status,add)
        })

    }

    render(){
        const res = this.props.location.user.name.split(" ")
        return(
            <Container>
            <Form onSubmit={e => this.handleSubmit(e)}>
            Edit User - ID #{this.props.location.user.id}
            <Row>
                <Col xs={6}>
                    <Form.Group controlId="nameF">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control ref={this.fname} type="text" placeholder={res[0]}/>
                    </Form.Group>
                </Col>

                <Col xs={6}>
                <Form.Group controlId="nameL">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control ref={this.lname} type="text" placeholder={res[1]}/>
                </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col xs={6}>
                    <Form.Group controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control ref={this.email} type="text" placeholder={this.props.location.user.email}/>
                    </Form.Group>
                </Col>
            </Row>
            <Button type="submit">Edit</Button>
            </Form>
            </Container>
        )
    }
}