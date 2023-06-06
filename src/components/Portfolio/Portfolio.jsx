import './Portfolio.css'
import linkIcon from '../../images/link.svg'
export default function Portfolio() {
  return (
    <section className={'main-section portfolio'}>
      <h2 className={'portfolio__title'}>Портфолио</h2>
      <ul className={'portfolio__list'}>
        <li className={'portfolio__item'}>
          <a className={'portfolio__link'} href={''}>
            <h3 className={'portfolio__item-name'}>Статичный сайт</h3>
            <img className={'portfolio__link-icon'} src={linkIcon} alt={'link-icon'} />
          </a>
        </li>
        <li className={'portfolio__item'}>
          <a className={'portfolio__link'} href={''}>
            <h3 className={'portfolio__item-name'}>Адаптивный сайт</h3>
            <img className={'portfolio__link-icon'} src={linkIcon} alt={'link-icon'} />
          </a>
        </li>
        <li className={'portfolio__item'}>
          <a className={'portfolio__link'} href={''}>
            <h3 className={'portfolio__item-name'}>Одностраничное приложение</h3>
            <img className={'portfolio__link-icon'} src={linkIcon} alt={'link-icon'} />
          </a>
        </li>
      </ul>
    </section>
  )
}
