import * as React from 'react'

const HeaderBar = ({title = "Welcome", user = {name: " anonymous", email: "anonymous@asset.com"}}) => {
  return (
    <div className="container--header mt-4">
      <div className="header__title">
        <h1>{title}</h1>
      </div>
      <div className="header__info">
        <div className="">
          <img className='header__info__img br-auto' src={require("../../assets/img/pic2.png")} alt="user" />
        </div>
        <div className="header__info__text">
          <h4>{user.name}</h4>
          <p>{user.email}</p>
        </div>
      </div>
    </div>
  )
}

export default HeaderBar