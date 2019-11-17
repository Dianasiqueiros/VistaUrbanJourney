import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import { RadioGroup, RadioButton } from 'react-radio-buttons';
import Geocode from 'react-geocode';

var Hashset = require('hashset');

class SaveBuscador extends Component {

    constructor(props) {
        super(props)
        this.state = {
            ciudad: '',
            geolocalizacion: '',
            checked: false,
            colocado: true,
            colocado3: false,
            coordenadas: [],
            coordenadas2: [],
            lugar: null,
            actividad: [],
            contador: 0,
            hashset: new Hashset(),
            marca: null
        }

        this.handleChange = this.handleChange.bind(this)
        this.manejarMarcadorSencillo = this.manejarMarcadorSencillo.bind(this)
        this.obtenerMiUbicacion = this.obtenerMiUbicacion.bind(this)
        this.usarGeocode = this.usarGeocode.bind(this)
        this.manejarMarcadores = this.manejarMarcadores.bind(this)
        this.marcadores = this.marcadores.bind(this)
    }


    handleChange() {
        this.setState({
            checked: !this.state.checked
        })
    }

    usarGeocode(value) {
        Geocode.setApiKey("AIzaSyAomYdf0G4S_QZ6TE6puT5x8eRcRaHXKo0");
        Geocode.setLanguage("es");
        Geocode.enableDebug();

        Geocode.fromAddress(value).then(
            response => {
                this.setState({ coordenadas: response.results[0].geometry.location })
                console.log(this.state.coordenadas)
            },
            error => {
                console.error(error);
            }
        );
    }

    usarGeocodeMultiple(value) {
        //this.state.actividad= value.toArray()
        Geocode.setApiKey("AIzaSyAomYdf0G4S_QZ6TE6puT5x8eRcRaHXKo0");
        Geocode.setLanguage("es");
        Geocode.enableDebug();
        if (value.toArray().length == 0) {
            this.state.coordenadas2.pop()
            this.marcadores(this.state.coordenadas2)
            console.log(this.state.coordenadas2)
        }
        if ((value.toArray().length) != 0) {
            Geocode.fromAddress(value.toArray()).then(
                response => {
                    if (this.state.contador < value.toArray().length) {
                        this.state.coordenadas2.push({ coordenadas: response.results[0].geometry.location })
                        console.log(this.state.coordenadas2)
                        this.state.contador++
                    }

                    console.log(this.state.coordenadas2)
                },
                error => {
                    console.error(error);
                }
            );
        }
    }

    manejarMarcadorSencillo = value => {
        this.setState({
            colocado: this.state.colocado
        })
        this.usarGeocode(value)
    }

    manejarMarcadores = value => {
        if ((this.state.hashset.contains(value)) == false) {
            this.state.hashset.add(value)

        } else {
            this.state.hashset.remove(value)
        }
        this.usarGeocodeMultiple(this.state.hashset)
        this.marcadores(this.state.coordenadas2)

        this.setState({
            colocado3: true
        })

    }

    obtenerPorCiudad = value => {
        this.state.colocado = true
        this.state.colocado3 = false
        this.usarGeocode(value.ciudad, 1)
    }

    obtenerMiUbicacion() {
        this.state.colocado = true
        this.state.colocado3 = false
        console.log(this.state.colocado3)
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                console.log(position)
                this.setState({ coordenadas: { lat: position.coords.latitude, lng: position.coords.longitude } })
                //console.log(this.state)   
            }.bind(this));
        } else {
            alert('Tu Navegador no soporta Geolocalización, por favor actualizalo!');
        }
    }

    marcadores(value) {

        /*for(let n = 0;n < this.state.prueba.length; n++){
            console.log(this.state.prueba[n])
             return(<Marker position={{lat: this.state.prueba[n].lat, lng: this.state.prueba[n].lng}}/>); 
        } */
        const co = Object.values(value)

        this.state.marca = co.map(lug =>
            <Marker position={{ lat: lug.coordenadas.lat, lng: lug.coordenadas.lng }} />
        );

    }
    render() {


        //Constante para mostrar u ocultar el textbox para busqueda por ciudad
        const content = this.state.checked
            ? <Field className="form-control" type="text" name="ciudad" placeholder="Ingresa la ciudad que deseas visitrar" />
            : null;
        //Constante para mostrar u ocultar el boton para busqueda por ciudad
        const content2 = this.state.checked
            ? <button className="btn btn-success" type="submit">Ir</button>
            : null;
        //Constante para mostrar u ocultar un solo marcador en el mapa
        const marcadorSencillo = this.state.colocado
            ?
            <Map 
                style={mapStyles}
                google={this.props.google}
                zoom={5}
                initialCenter={{ lat: 19.3910038, lng: -99.2837003 }}
            >
                {/** Invoca a la constante del marcador */}
                <Marker title={this.state.lugar} name={this.state.lugar} position={{ lat: this.state.coordenadas.lat, lng: this.state.coordenadas.lng }} />
            </Map>
            : null;

        //ToDo: Constante para mostrar todos los marcadores seleccionados de la lista de lugares
        const marcadoresMultiples = this.state.colocado3
            ? <Map
                style={mapStyles}
                google={this.props.google}
                zoom={5}
                initialCenter={{ lat: 19.3910038, lng: -99.2837003 }}
            >
                {/** Invoca a la constante del marcador */}

                {this.state.marca}
            </Map>
            : null;

        /*Estas dos variables se usaran en caso de necesitar redireccionar informacion
            de mapas a otras ventanas*/
        let ciudad = this.state
        let geolocalizacion = this.state

        //Funcion return de nuestro componente
        return (
            //Contenedor para las opciones de Busqueda por Ciudad o Busqueda por Geolocalizacion
            <div className="container ml-2 my-sm-3">
                <div className="btn-group-toggle ml-2 my-sm-3" data-toggle="buttons">
                    <label className="btn btn-secondary">
                        <input type="radio" name="location" value="location" checked={this.state.checked} onChange={this.handleChange} /> Buscar por ciudad
                    </label>
                    <label className="btn btn-secondary">
                        <input type="radio" name="location" value="current" checked={!this.state.checked} onChange={this.handleChange} />Usar mi ubicacion
                    </label>
                </div>

                {/** Formulario para la busqueda por Ciudad */}
                <Formik
                    initialValues={ciudad}
                    onSubmit={this.obtenerPorCiudad}
                    validateOnChange={false}
                    validateOnBlur={false}
                    enableReinitialize={true}
                >
                    {
                        (props) => (
                            <Form>
                                <ErrorMessage name="ciudad" component="div"
                                    className="alert alert-warning" />
                                {/** Constantes que muestran u ocultan el boton y el textbox de busqueda por Ciudad */}
                                {content}
                                {content2}

                            </Form>
                        )
                    }

                </Formik>

                {/** Formulari  o para la busqueda por Geolocalizacion */}
                <Formik
                    initialValues={geolocalizacion}
                    onSubmit={this.obtenerMiUbicacion}
                    validateOnChange={false}
                    validateOnBlur={false}
                    enableReinitialize={true}
                >
                    { /*           {
                        (props) => (
                            <Form>
                                <ErrorMessage name = "geolocalizacion" component="div"
                                    className="alert alert-warnin"/>
                                <button className="btn btn-success" type="submit">Mi ubicacion</button>
                            </Form>
                        )
                    }
               
            */}
                </Formik>
                    <div>
                        <table>
                            <tr>
                                <td>
                                    {/** Grupo de opciones de actividades para marcar en el mapa */}

                                    <div className="btn-group btn-group-toggle" data-toggle="buttons">
                                        <RadioGroup onChange={this.manejarMarcadores}>
                                            <RadioButton value="Guadalajara">Guadalajara</RadioButton>
                                            <RadioButton value="Monterrey">Monterrey</RadioButton>
                                            <RadioButton value="Ciudad Valles">Ciudad Valles</RadioButton>
                                        </RadioGroup>

                                    </div>
                                </td>
                                <td style={{}}>
                                    {/** Creacion y parametrizacion de un Mapa de google */}
                                    {marcadorSencillo}
                                    {
                                        /*
                                        
                                        {marcadoresMultiples}
                                        */
                                    }
                                </td>
                            </tr>
                        </table>
                    </div>
            </div>
                );
            }
        }
        
        //Constante para los estilos del mapa
        const mapStyles = {
            width: '50%',
            height: '50%',
            overflow: 'hidden',
            position: 'relative',
            top: -180,
            left: 400
        }
            
export default GoogleApiWrapper({
                    apiKey: 'AIzaSyAomYdf0G4S_QZ6TE6puT5x8eRcRaHXKo0'
})(SaveBuscador);