import * as React from 'react'
import { Link } from 'react-router-dom'
import { NavLinks } from './NavLinks'

const NavBar = ({active = "home", section = ""}) => {
  const links = NavLinks(section)
  return (
    <div className="nav text-center">
      <nav className="nav__list">
          <Link className="">
            <img className='nav__item--img br-auto' src={require("../../assets/img/pic2.png")} alt="user" />
          </Link>
          {links.map((instance, i) => {
            const styleClasses = `${instance.class == "logout" ? "nav__item--logout" : "nav__item--icon"} ${instance.class == active ? "nav__item--active" : ""}`
            return (<Link to={instance.url} className={styleClasses} key={i}>
              <instance.Icon/>
            </Link>)
          })}
          {/* <Link to="" className="nav__item">Test</Link> */}
      </nav>
    </div>
  )
}

export default NavBar