import './AboutMe.css'
import photoImg from '../../images/photo.png'
export default function AboutMe() {
  return (
    <section className={'about-me main-section'}>
      <h2 className={'main-title'}>Студент</h2>
      <div className={'about-me__container'}>
        <div className={'about-me__block'}>
          <p className={'about-me__name'}>Михаил</p>
          <p className={'about-me__profession'}>Фронтенд-разработчик, 30 лет</p>
          <p className={'about-me__description'}>Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена
            и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
          <a className={'about-me__link animation-transition hovered-link'} target={"_blank"} href={'https://github.com/TearsOprah'}>Github</a>
        </div>
        <img className={'about-me__photo'} src={photoImg} alt={'photo'} />
      </div>
      </section>
  )
}
