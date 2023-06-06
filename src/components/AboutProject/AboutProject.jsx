import './AboutProject.css'
export default function AboutProject() {
  return (
    <section className={'about-project'}>
      <h2 className={'about-project__title'}>О проекте</h2>
      <div className={'about-project__container'}>
        <div className={'about-project__item'}>
          <h3 className={'about-project__item-title'}>Дипломный проект включал 5 этапов</h3>
          <p className={'about-project__item-description'}>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </div>
        <div className={'about-project__item'}>
          <h3 className={'about-project__item-title'}>На выполнение диплома ушло 5 недель</h3>
          <p className={'about-project__item-description'}>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
      </div>
      <div className={'about-project__statistic'}>
        <div className={'about-project__statistic-block'}>
          <div className={'about-project__black-progress-bar'}>
            <p className={'white-text'}>1 неделя</p>
          </div>
          <p className={'gray-text'}>Back-end</p>
        </div>
        <div className={'about-project__statistic-block'}>
          <div className={'about-project__grey-progress-bar'}>
            <p>4 недели</p>
          </div>
          <p className={'gray-text'}>Front-end</p>
        </div>
      </div>
    </section>
  )
}
