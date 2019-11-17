import React, { Component } from 'react';
import Buscador from '../../Buscador';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useHistory, useLocation } from 'react-router-dom';


export class Home extends Component {

    constructor(props) {
        super(props);
        this.state = { addModalShow: false , userLogin: false } 
        this.mostrarDialogo = this.mostrarDialogo.bind(this)
        this.ejecutarLogin = this.ejecutarLogin.bind(this)
    }

    mostrarDialogo() {
        this.setState({ addModalShow: true })
    }

    ejecutarLogin(){
        this.setState({userLogin: true, addModalShow: false})
    }
    validarLogin(location, history){
        if(this.state.userLogin){
            let { from } = location.state || { from: { pathname: "/" } };
            history.replace(from); 

        }else{
            alert('Debes tener cuenta');
        }
    }


    render() {
        let closeModal = () => this.setState({ addModalShow: false });
       
        return (
            <div>
                <Buscador />
                <div>
                    <Button onClick={e =>{this.validarLogin()}}>Save</ Button>
                    <Button variant="primary" onClick={e => { this.mostrarDialogo() }}> Login </Button>
                    <Modal show={this.state.addModalShow} onHide={closeModal} animation={false}>
                        <Modal.Header closeButton>
                            <Modal.Title>Login</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form >
                                <div className="form-group">
                                    <label for="exampleInputEmail1"><b>Email</b></label>
                                    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                                    <small id="emailHelp" className="form-text text-muted">We'll never share your information with anyone else.</small>
                                    <div className="form-group">
                                    <label for="exampleInputPassword1" ><b>Password</b></label>
                                    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"/>
                                    <Button vype="submit" class="btn btn-primary" onClick={e => {this.ejecutarLogin() }} >Login</Button>
                                    </div>
                                </div>
                            </form>
                        </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={closeModal}>
                                            Close
                            </Button>
                                        <Button variant="primary" onClick={closeModal}>
                                            Save Changes
                            </Button>
                                    </Modal.Footer>
                    </Modal>
                </div>
            </div>
                        )
                    }
                }
                
                export default Home;
