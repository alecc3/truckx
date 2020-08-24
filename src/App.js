import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import Add from './components/Add';
import Edit from './components/Edit';
import Delete from './components/Delete';
import Button from 'react-bootstrap/Button';
import {UserContext} from './context';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import { Nav } from 'react-bootstrap';

export default class App extends Component{
  constructor(props) {
    super(props);

    this.updateUsers = (toAdd) => {
      this.setState({users: [...this.state.users, toAdd]})
    }

    this.state = {
      users: [{id:1, name: "Joe Smith", email:"email@gmail.com", url:"https://www.google.com"}],
      updateUsers: this.updateUsers,
    };
  }


  render(){
  return (
    <div className="App">
      <Navbar></Navbar>
      <Switch>
        <UserContext.Provider value={this.state}>
        <Route path='/' exact>
          <Home/>
        </Route>
        <Route path='/add' component={Add}></Route>
        <Route path='/edit' component={Edit}></Route>
        <Route path='/delete' component={Delete}></Route>
        </UserContext.Provider>
      </Switch>
    </div>
  );
  }
}

function Navbar() {
  return (
    <div>
      <Link to="/">Home </Link>
    </div>
  );
};
