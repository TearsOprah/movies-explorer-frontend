import './Promo.css'
import NavTab from "../NavTab/NavTab";
import Header from "../Header/Header";
import earthImg from '../../images/promo_earth.svg';
import { useRef } from 'react';

export default function Promo() {

  const promoContentRef = useRef(null);

  const handleLearnMoreClick = () => {
    promoContentRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className={'promo'}>
      <Header>
        <NavTab />
      </Header>
      <div className={'promo__content'}>
        <div className={'promo__container'}>
          <h1 className={'promo__title'}>Учебный проект студента факультета Веб-разработки.</h1>
          <p className={'promo__description'}>Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
          <button className={'promo__button animation-transition hovered-button'} onClick={handleLearnMoreClick}>Узнать больше</button>
        </div>
        <img className={'promo__image'} src={earthImg} alt={'earth'} />
      </div>
      <div ref={promoContentRef}></div>
    </section>
  )
}
