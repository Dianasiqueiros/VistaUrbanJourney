import React, { Component } from 'react';
import {Modal, Button, Row, Col, From } from 'react-bootstrap';
import api from '../../utils/api';

export class LoginModel extends Component {
    constructor(props){
        super(props);
        this.state = {
          email: '',
          password: '',
          error: false,
        }
    }
      //pendiente afinar detalles
    async login() {
      try {
        const response = await api.post('/login', {
          email: this.state.email,
          password: this.state.password
        });
        if (response.success) {
          localStorage.setItem('token', response.token);
          
        }
      } catch (e) {
        this.setState({
          error: 'An error occurred while trying to login.'
        })
      }
      
    }

    handleChange(event) {
      const { target: { id, value } } = event;
      this.setState({
        [id]: value,
      });
    }

    render() {
      console.log(this.state)

        return (
          <Modal show={this.props.show} onHide={this.props.close} animation={false}>
          <Modal.Header closeButton>
              <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <form >
                  <div className="form-group">
                      <label for="exampleInputEmail1"><b>Email</b></label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="email" 
                        aria-describedby="emailHelp" 
                        placeholder="Enter email" 
                        onChange={(e) => this.handleChange(e)}
                      />
                      <small id="emailHelp" className="form-text text-muted">We'll never share your information with anyone else.</small>
                      <div className="form-group">
                      <label for="exampleInputPassword1" ><b>Password</b></label>
                      <input 
                        type="password" 
                        class="form-control" 
                        id="password" 
                        placeholder="Password" 
                        onChange={(e) => this.handleChange(e)}
                      />
                      <Button vype="submit" class="btn btn-primary" onClick={e => this.login() } >Login</Button>
                      <div className="w3-container w3-border-top w3-padding-16 w3-light-grey">
                      <span className="w3-right w3-padding w3-hide-small">Forgot <a href="">password?</a></span>
                      </div>
                      { this.state.error !== '' ? <span>{this.state.error}</span> : null}
                      </div>
                  </div>
              </form>
          </Modal.Body>
                      <Modal.Footer>
                          <Button variant="secondary" onClick={this.props.close}>
                              Close
              </Button>
                          <Button variant="primary" onClick={this.props.close}>
                              Save Changes
              </Button>
                      </Modal.Footer>
      </Modal>
        )
    }
}

export default LoginModel
