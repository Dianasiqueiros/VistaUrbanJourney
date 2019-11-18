import React, { Component } from 'react';
import Buscador from '../../Buscador';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useHistory, useLocation } from 'react-router-dom';
import LoginModel from './LoginModel';
import Category from '../Category';


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

    closeModal = () => this.setState({ addModalShow: false });

    render() {
       
        return (
            <div>

                <Buscador />
                <Category />
                <div>
               
                    <Button onClick={e =>{this.validarLogin()}}>Save </Button>
                    <Button variant="primary" onClick={e => { this.mostrarDialogo() }}> Login </Button>
                    <LoginModel show={this.state.addModalShow} close={() => this.closeModal()}/>
                </div>
            </div>
                        )
                    }
                }
                
                export default Home;
