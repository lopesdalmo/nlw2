import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import logoImg from '../../assets/images/logo.svg';
import landignImg from '../../assets/images/landing.svg';

import studyIcon from '../../assets/images/icons/study.svg';
import giveClassIcons from '../../assets/images/icons/give-classes.svg';
import purpleHeartIcons from '../../assets/images/icons/purple-heart.svg';

import api from '../../services/api';

import './styles.css';

function Landing() {
  const [totalConnections, setTotalConnections] = useState(0);

  useEffect(() => {
    api.get('connections').then((response: any) => {
      const {total} = response.data;
      setTotalConnections(total);
    });
  }, []);
  return (
    <div id="page-landing">
      <div id="page-landing-content" className="container">
        <div className="logo-container">
          <img src={logoImg} alt="Proffy" />
          <h2>Sua plataforma de estudos online.</h2>
        </div>

        <img src={landignImg} alt="Platforma de estudos" className="hero-image" />

        <div className="buttons-container">
          <Link to="/study" className="study">
            <img src={studyIcon} alt="Estudar" />
            Estudar
          </Link>

          <Link to="/give-classes" className="give-classes">
            <img src={giveClassIcons} alt="Dar aulas" />
            Dar Aulas
          </Link>
        </div>

        <span className="total-connections">
          Total de {totalConnections} conexões já realizadas{' '}
          <img src={purpleHeartIcons} alt="Coração roxo" />
        </span>
      </div>
    </div>
  );
}

export default Landing;
