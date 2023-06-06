import './Footer.css'
export default function Footer() {
  return (
    <footer className={'footer'}>
      <p className={'footer__description'}>Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className={'footer__container'}>
        <p className={'footer__copyright'}>© 2023</p>
        <ul className={'footer__links'}>
          <li>
            <a className={'footer__link'}>Яндекс.Практикум</a>
          </li>
          <li>
            <a className={'footer__link'}>Github</a>
          </li>
        </ul>
      </div>
    </footer>
  )
}
