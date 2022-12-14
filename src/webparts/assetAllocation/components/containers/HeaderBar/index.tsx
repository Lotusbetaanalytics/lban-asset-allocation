import * as React from 'react'
import { Button } from "mtforms";
import "mtforms/dist/index.css";
import { useQuery } from 'react-query';
import { getUserProfile } from '../../../utils/listUtils';
import { fetchOptions } from '../../hooks/queryOptions';

const HeaderBar = ({title = "Welcome", hasBackButton = false}) => {

  const placeholderUser = {DisplayName: "anonymous", Email: "anonymous@asset.com", PictureUrl: ""}

  const { data: authUser = placeholderUser, isError: isAuthError, error: authError } = useQuery("fetch-auth-user", getUserProfile, {...fetchOptions})
  console.log({authUser, isAuthError, authError})

  return (
    <>
      <div className="container--header mt-4">
        <div className="header__title">
          <h1>{title}</h1>
        </div>
        <div className="header__info">
          <div className="">
            <img className='header__info__img br-auto' src={require("../../assets/img/pic2.png")} alt="user" />
            {/* <img className='header__info__img br-auto' src={authUser.PictureUrl || require("../../assets/img/pic2.png")} alt="user" /> */}
          </div>
          <div className="header__info__text">
            <h4>{authUser.DisplayName}</h4>
            <p>{authUser.Email}</p>
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