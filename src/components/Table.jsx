import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';

const userTable = (props) => {
        return(
            <Table striped>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {props.children}
                </tbody>
            </Table>
        )
    }

export default userTable;