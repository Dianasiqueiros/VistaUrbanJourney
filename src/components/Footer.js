import React from 'react'
import styled from 'styled-components'  
function Footer() {
        return (
        <FooterContainer className="main-footer">
        <div className="footer-middle">   
        <div className="container">
        <div className="row">
        {/*Acerca de Urban Journey */}
            <div className="col-md-3 col-sm-4">
                <h4>About As</h4>
                    <ul className="list-unstyled">
                        <li><a href="/">Quienes somos</a></li>
                         <li><a href="/">Anunciate con nosotros</a></li>
                    </ul>
            </div>
        {/*Redes */}
        <div className="col-md-3 col-sm-4">
                <h4>About As</h4>
                    <ul className="list-unstyled">
                        <li><a href="/">Privacidad</a></li>
                        <li><a href="/">Condiciones</a></li>
                    </ul>
            </div>    
        </div>  
        {/* Footer Bottom*/}
        <div className="footer-bottom">
            <p className="text-xs-center">
             &copy;{new Date().getFullYear()} Urban Journey- All Rights Reserved   
            </p>
        </div>
        </div>
        </div> 
        </FooterContainer>
        );
}
export default Footer;

const FooterContainer = styled.footer`
.footer-middle{
    background: var(--mainDark);
    padding-top: 3rem;
    color: var(--mainWhite);    
}
.footer-bottom{
    padding-top: 3rem;
    padding-bottom: 2rem;
}
ul li a{
    color: var(--mainGrey);
}
ul li a:hover{
    color: var(--mainLightGrey);
}
`; 