import React from "react";

import "../assets/styles/var.scss";


import { FaTwitter, FaInstagram, FaGithub} from 'react-icons/fa';

import {FaPhoneVolume,FaEnvelope, FaMapMarkedAlt, FaBars} from 'react-icons/fa'






function Home() {
  return (
    <div>
      <div className="nav">
        <input type="checkbox" id="check" />
        <label htmlFor="check" className="checkbtn">
          <i className="fa fa-bars" />
          <FaBars />
        </label>
        <label className="logo">BoletinEDU</label>
        <ul>
          <li>
            <a className="active" href="#principal">
              principal
            </a>
          </li>
          <li>
            <a href="#notas">notas</a>
            <ul id="dropdown">
              <li>
                <a href="#seguimiento">seguimiento de notas</a>
              </li>
              <li>
                <a href="#boletas">Boletas</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#rol">rol</a>
            <ul id="dropdown">
              <li>
                <a href="#docente">docente</a>
              </li>
              <li>
                <a href="#rector">rector</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#about">sobre esto</a>
          </li>
        </ul>
      </div>
      <main>
      
      
        <section className="main-exchange-container">
        <div className="content">
        <div className="cards">
              <div className="card">
                <div className="box">
                  <h1>total de asignaturas</h1>
                  <h3>30</h3>
                </div>
              </div>
            </div>
        </div>

            <div className="content">
            <div className="cards">
              <div className="card">
                <div className="box">
                  <h1>total de usuarios</h1>
                  <h1>version de React {React.version}</h1>
                  <h3>100</h3>
                </div>
              </div>
            </div>
            </div>

      <div className="content">
            <div className="cards">
              <div className="card">
                <div className="box">
                  <h1>total de cursos</h1>
                  <h3>30</h3>
                </div>
              </div>
            </div>
          </div>


        
        </section>



      </main>
      <footer className="footer-distributed">
        <div className="footer-left">
          <h3>
            Pfruit99<span>Dev</span>
          </h3>
          <p className="footer-links">
            <a href="#inicio">inicio</a>
            <a href="#aboutme">Sobre mi</a>
            <a href="#contactme">Contacto</a>
          </p>
          <p className="footer-company-name">
            Copyright 2023 <strong>Pfruit99Dev</strong>All rights reserved
          </p>
        </div>
        <div className="footer-center">
          <div>
            {/* <i className="fa fa-map-marker" /> */}
            <FaMapMarkedAlt />
            <p>
              <span>Atlantico</span>Barranquilla
            </p>
          </div>
          <div>
            {/* <i className="fa fa-phone" /> */}
            <FaPhoneVolume />
            <p>317 543 16 72</p>
          </div>
          <div>
            {/* <i className="fa fa-envelope" /> */}
            <FaEnvelope />
            <p>
              <a href="#email">mora099999@gmail.com</a>
            </p>
          </div>
        </div>
        <div className="footer-right">
          <p className="footer-company-about">
            <span>about me</span>
            <strong>Pfruit99</strong> es un perfil de github donde puedes
            encontrar contenido como este y mas
          </p>
          <div className="footer-icons">
            <a href="#github">
              {/* <i className="fa fa-github" /> */}
            <FaGithub/>
            </a>
            <a href="#instagram">
              {/* <i className="fa fa-instagram" /> */}
              <FaInstagram/>
            </a>
            <a href="#twitter">
              <FaTwitter/>
              {/* <i className="fa fa-twitter" /> */}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
