import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Herosection extends Component {
    render() {
        return (
            <section className="custom-pt-1 custom-pb-2 bg-primary parallaxie position-relative" style={{ backgroundPosition: 'center center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }} data-overlay={6}>
            <div className="container">
              <div className="row justify-content-center text-center">
                <div className="col-12 col-lg-10 col-xl-8">
                  {/* Heading */}
                  <h1 className="display-4 text-white font-weight-bold">
                    Marketplace para Contratistas de Proyectos de Construcción
                      </h1>
                  {/* Text */}
                  <p className="lead text-light">Envía presupuestos de forma automática llevando el control de todas tus propuestas.</p>
                  {/* Buttons */} <Link to="/" className="btn btn-primary mr-1">
                    Saber más
                      </Link>
                  <Link to="/" className="btn btn-primary mr-1">
                    Comenzar
                      </Link>
                </div>
              </div>
              {/* / .row */}
            </div>
            {/* / .container */}
            <div className="shape-1 bottom" style={{ height: '100px', overflow: 'hidden' }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ height: '100%', width: '100%' }}>
                <polygon className="svg--sm" fill="white" points="0,0 30,100 65,21 90,100 100,75 100,100 0,100" />
                <polygon className="svg--lg" fill="white" points="0,0 15,100 33,21 45,100 50,75 55,100 72,20 85,100 95,50 100,80 100,100 0,100" />
              </svg>
            </div>
          </section>
        
        );
    }
}

export default Herosection;