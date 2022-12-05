import * as React from 'react'
import { Button } from "mtforms";
import "mtforms/dist/index.css";

const HeaderBar = ({title = "Welcome", user = {name: " anonymous", email: "anonymous@asset.com"}, hasBackButton = false}) => {
  return (
    <>
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
      {
        hasBackButton ? (
        <div className="constainer--info">
          <Button
            title="Back"
            type="button"
            // onClick={() => history.goBack()}
            onClick={() => history.back()}  // goes to previous page
            size="small"
            className="btn br-xlg w-8 bg-light-grey2"
          />
        </div>
        ) : ""
      }
      
    </>
  )
}

export default HeaderBar