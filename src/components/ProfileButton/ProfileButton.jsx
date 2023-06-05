import './ProfileButton.css'
import profileIcon from "../../images/profile_icon.svg";
import {Link} from "react-router-dom";

export default function ProfileButton( hidden ) {
  return (
    <Link className={`profile-button ${hidden && 'profile-button_hidden'}`} to={'/'}>
      <img className={'profile-button__icon'} src={profileIcon}/>
      <p>Аккаунт</p>
    </Link>
  )
}
