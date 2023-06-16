import './ProfileButton.css'
import profileIcon from "../../images/profile_icon.svg";
import {Link} from "react-router-dom";

export default function ProfileButton({ hidden, closeMenu }) {
  return (
    <Link onClick={closeMenu} className={`profile-button ${hidden ? 'profile-button_hidden' : ''} animation-transition hovered-button`} to={'/profile'}>
      <img className={'profile-button__icon'} src={profileIcon} alt="Profile Icon" />
      <p>Аккаунт</p>
    </Link>
  );
}
