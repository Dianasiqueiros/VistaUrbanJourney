import React, { Component } from 'react';
import {Modal, Button, Row, Col, From } from 'react-bootstrap';

export class LoginModel extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div>
                <Modal
      {...this.props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
         LogIn
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
            
      </Modal.Body>
      <Modal.Footer>
        <Button  variant="danger" onClick={this.props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
            </div>
        )
    }
}

export default LoginModel