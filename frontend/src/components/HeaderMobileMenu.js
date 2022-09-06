import React from "react";

function HeaderMobileMenu(props) {
  if (props.isVisible) {
    return (
      <div className="header__mobile-menu">
        <p className="header_email">{props.email}</p>
        <button className="header__link" onClick={props.onSignOut}>Выйти</button>
      </div>
    );
  } else {
    return (
      <div></div>
    );
  }

}

export default HeaderMobileMenu;
