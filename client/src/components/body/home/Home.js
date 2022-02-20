import React from 'react'
import './home.css'
import FeatureServices from '../../../widgets/featurebox/services';
import Herosection from '../../../widgets/herosection/herosection';

function Home() {
    return (
        <div>
            <Herosection />
            <div className="page-content">
                <section>
                <div className="container">
                  <div className="row justify-content-center text-center">
                    <div className="col-12 col-md-12 col-lg-8 mb-8 mb-lg-0">
                      <div className="mb-8"> <span className="badge badge-primary-soft p-2 font-w-6">
                          Elige una opción
                        </span>
                        <h2 className="mt-3 font-w-5">¿Qué tipo de Organización eres?</h2>
                        {/* <p className="lead mb-0">Dependiendo qué tipo de Organización eres, se te pedirán diferente información.</p> */}
                      </div>
                    </div>
                  </div>
                  {/* / .row */}
                  <FeatureServices />
                 </div>
                </section>
                <section className="custom-py-2 position-relative bg-dark" data-bg-img={require(`../../../assets/images/bg/02.png`)}>
                <div className="container">
                  <div className="row justify-content-center text-center">
                    <div className="col-12 col-md-12 col-lg-8 mb-8 mb-lg-0">
                      <div className="mb-8"> <span className="badge badge-primary-soft p-2 font-w-6">
                          ¿Cómo funciona?
                        </span>
                        <h2 className="mt-3 font-w-5 mb-0 text-white">Tres simples pasos para comenzar</h2>
                      </div>
                    </div>
                  </div>
                  {/* / .row */}
                  <div className="row align-items-center justify-content-between mb-10">
                    <div className="col-12 col-lg-6 mb-6 mb-lg-0">
                      {/* <img src={require(`../../../assets/images/svg/04.svg`)} alt="Image" className="img-fluid" /> */}
                    </div>
                    <div className="col-12 col-lg-6 col-xl-5">
                      <div>
                        <h2> <span className="badge badge-primary-soft p-2">
                            01
                          </span>
                        </h2>
                        <h4 className="mt-3 text-light">Ingresa precios unitarios</h4>
                        <p className="lead mb-0">Presupuesta uno de nuestros proyectos estándar y crear tu lista de precios unitarios para entidades del Modelo BIM.</p>
                      </div>
                    </div>
                  </div>
                  <div className="row align-items-center justify-content-between mb-10">
                    <div className="col-12 col-lg-6 order-lg-1 mb-6 mb-lg-0">
                      {/* <img src={require(`../../../assets/images/svg/05.svg`)} alt="Image" className="img-fluid" /> */}
                    </div>
                    <div className="col-12 col-lg-6 col-xl-5">
                      <div>
                        <h2> <span className="badge badge-primary-soft p-2">
                            02
                          </span>
                        </h2>
                        <h4 className="mt-3 text-light">Envía presupuestos automáticas</h4>
                        <p className="lead mb-0">Crea tu perfil de propuestas para poder enviar propuestas de presupuestos automatizados a los proyectos de tu interés.</p>
                      </div>
                    </div>
                  </div>
                  <div className="row align-items-center justify-content-between">
                    <div className="col-12 col-lg-6 mb-6 mb-lg-0">
                      {/* <img src={require(`../../../assets/images/svg/06.svg`)} alt="Image" className="img-fluid" /> */}
                    </div>
                    <div className="col-12 col-lg-6 col-xl-5">
                      <div>
                        <h2> <span className="badge badge-primary-soft p-2">
                            03
                          </span>
                        </h2>
                        <h4 className="mt-3 text-light">Recibe presupuestos aprobados</h4>
                        <p className="lead mb-0">Una vez tu presupuesto fue revisado puedes personalizar el tipo de propuestas que envíaste llevando un control de la gestión de cambios.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="shape-1" style={{height: '200px', overflow: 'hidden'}}>
                  <svg viewBox="0 0 500 150" preserveAspectRatio="none" style={{height: '100%', width: '100%'}}>
                    <path d="M0.00,49.98 C150.00,150.00 271.49,-50.00 500.00,49.98 L500.00,0.00 L0.00,0.00 Z" style={{stroke: 'none', fill: '#fff'}} />
                  </svg>
                </div>
                <div className="shape-1 bottom" style={{height: '200px', overflow: 'hidden'}}>
                  <svg viewBox="0 0 500 150" preserveAspectRatio="none" style={{height: '100%', width: '100%'}}>
                    <path d="M0.00,49.98 C150.00,150.00 349.20,-50.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z" style={{stroke: 'none', fill: '#fff'}} />
                  </svg>
                </div>
              </section>
            </div>

        </div>
    )
}

export default Home
