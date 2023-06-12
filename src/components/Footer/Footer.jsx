import './Footer.css'
export default function Footer() {
  return (
    <footer className={'footer'}>
      <p className={'footer__description'}>Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className={'footer__container'}>
        <p className={'footer__copyright'}>© 2023</p>
        <ul className={'footer__links'}>
          <li>
            <a href={'https://practicum.yandex.ru/'} target={'_blank'} className={'footer__link animation-transition hovered-link'}>Яндекс.Практикум</a>
          </li>
          <li>
            <a href={'https://github.com/TearsOprah'} target={'_blank'} className={'footer__link animation-transition hovered-link'}>Github</a>
          </li>
        </ul>
      </div>
    </footer>
  )
}
