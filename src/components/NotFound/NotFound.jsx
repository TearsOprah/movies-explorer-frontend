import './NotFound.css'
import {Link} from "react-router-dom";

export default function NotFound() {
  return (
    <div className={'not-found'}>
      <div className={'not-found__block'}>
        <p className={'not-found__error'}>404</p>
        <p className={'not-found__message'}>Страница не найдена</p>
      </div>
      <Link className={'not-found__link'} to={'/'}>Назад</Link>
    </div>
  )
}
