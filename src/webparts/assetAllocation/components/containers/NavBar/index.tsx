import * as React from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { navPropValidation } from "../../../utils/componentUtils";
import { getUserProfile } from "../../../utils/listUtils";
import { fetchOptions } from "../../hooks/queryOptions";
import { NavLinks } from "./NavLinks";

const NavBar = ({ active = "home", section = "" }) => {
  const links = NavLinks(section);
  const sectionUrl = `/app/${section ? section + "/" : ""}`;

  const placeholderUser = {
    DisplayName: "anonymous",
    Email: "anonymous@asset.com",
    PictureUrl: "",
  };

  const {
    data: authUser = placeholderUser,
    isError: isAuthError,
    error: authError,
  } = useQuery("fetch-auth-user", getUserProfile, { ...fetchOptions });
  // console.log({authUser, isAuthError, authError})

  return (
    <div className="nav text-center">
      <nav className="nav__list">
        <Link to={`${sectionUrl}dashboard`} className="">
          <div className="nav__item__img--container br-auto">
            {/* <img className='header__info__img br-auto' src={authUser.PictureUrl} alt="user" /> :  */}
            {/* <img className='nav__item__img br-auto' src={require("../../assets/img/pic2.png")} alt="user" /> */}
            <img
              className="nav__item__img br-auto"
              src={authUser.PictureUrl || require("../../assets/img/pic2.png")}
              alt="user"
            />
          </div>
        </Link>
        {links.map((instance, i) => {
          const styleClasses = `${
            instance.class == "logout" ? "nav__item--logout" : "nav__item--icon"
          } ${instance.class == active ? "nav__item--active" : ""}`;
          return (
            <Link to={instance.url} className={styleClasses} key={i}>
              <instance.Icon />
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

NavBar.propTypes = navPropValidation;

export default NavBar;
