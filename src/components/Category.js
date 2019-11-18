import React, { Component } from 'react';

class Category extends Component{
    constructor(props){
        super(props);
        const categories = new Map();
        categories.set('Actividades al aire libre', ["act 1", "act 2", "act 3"])
        categories.set('Compras Alimento', ["act 1", "act 2", "act 3" ])
        categories.set('Hospedaje', ["act 1", "act 2", "act 3" ])
        categories.set('Iglesias', ["act 1", "act 2", "act 3" ])
        categories.set('Museos', ["act 1", "act 2", "act 3" ])
        categories.set('Otros', ["act 1", "act 2", "act 3" ])
        categories.set('Recreacion', ["act 1", "act 2", "act 3" ])
        categories.set('Restaurantes', ["act 1", "act 2", "act 3" ])
        categories.set('Salud', ["act 1", "act 2", "act 3" ])
        categories.set('Servicios', ["act 1", "act 2", "act 3" ])
        categories.set('Transporte', ["act 1", "act 2", "act 3" ])
        categories.set('Vida Nocturna', ["act 1", "act 2", "act 3" ])
        this.state= {
            categories: categories,
            visibles: [ ]
        }


        this.obtenerCategoria=this.obtenerCategoria.bind(this)
        this.mostarHijos=this.mostarHijos.bind(this)
    }

    obtenerCategoria(category){
        this.setState((prevState) => {
            if(prevState.visibles.indexOf(category) === -1 ) {
                const newCategories = prevState.visibles.concat(category)
                return { visibles: newCategories }
            } else {
                return { visibles: prevState.visibles.filter(c => c !== category )}
            } 
        })
    }

    mostarHijos(category){
        return (
            <div>
                { this.state.visibles.indexOf(category) === -1 ? null : 
                this.state.categories.get(category).map(c => <li style= {{marginLeft: 15 }}> {c} </li> ) }
            </div>
        )
    }

    render(){
        return(
            <div className="category">
                <ul>
                    <li onClick={e => {this.obtenerCategoria('Actividades al aire libre') }}>
                    Actividades al aire libre
                    {
                        this.mostarHijos('Actividades al aire libre')
                    }
                    </li>     
                    <li onClick={e => {this.obtenerCategoria('Compras Alimento') }}>
                    Compras Alimento
                    {
                        this.mostarHijos('Compras Alimento')
                    }
                    </li>  
                    <li onClick={e => {this.obtenerCategoria('Hospedaje') }}>
                    Hospedaje
                    {
                        this.mostarHijos('Hospedaje')
                    }
                    </li> 
                    <li onClick={e => {this.obtenerCategoria('Iglesias') }}>
                    Iglesias
                    {
                        this.mostarHijos('Iglesias')
                    }
                    </li> 
                    <li onClick={e => {this.obtenerCategoria('Museos') }}>
                    Museos
                    {
                        this.mostarHijos('Museos')
                    }
                    </li>
                    <li onClick={e => {this.obtenerCategoria('Otros') }}> 
                    Otros
                    {
                        this.mostarHijos('Otros')
                    }
                    </li>
                    <li onClick={e => {this.obtenerCategoria('Recreacion') }}>
                    Recreacion
                    {
                        this.mostarHijos('Recreacion')
                    }
                    </li>   
                    <li onClick={e => {this.obtenerCategoria('Restaurantes') }}>
                    Restaurantes
                    {
                        this.mostarHijos('Restaurantes')
                    }
                    </li> 
                    <li onClick={e => {this.obtenerCategoria('Salud') }}>
                    Salud
                    {
                        this.mostarHijos('Salud')
                    }
                    </li>
                    <li onClick={e => {this.obtenerCategoria('Servicios') }}>
                    Servicios
                    {
                        this.mostarHijos('Servicios')
                    }
                    </li>  
                    <li onClick={e => {this.obtenerCategoria('Transporte') }}>
                    Transporte
                    {
                        this.mostarHijos('Transporte')
                    }
                    </li> 
                    <li onClick={e => {this.obtenerCategoria('Vida Noctura') }}>
                    Vida Noctura
                    {
                        this.mostarHijos('Vida Nocturna')
                    }
                    </li> 
                </ul>
            </div>

        )
    }
}
export default Category