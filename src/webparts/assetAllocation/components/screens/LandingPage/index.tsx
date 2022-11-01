import * as React from 'react'
import { Link } from 'react-router-dom'

const LandingPage = () => {
  return (
    <div className="background--landing">
        <div className="container--side landing">
            <div className="mr-auto">
                <img className="" src={require("../../assets/img/lban-logo-white.png")} alt="LOGO"/>
            </div>
            <div className="my-4 mr-auto home__text">
                <h3 className="my-2">Welcome to the</h3>
                <hr />
                <h1 className="home__heading mt-2">Asset Allocation Portal</h1>
            </div>
            <Link to="/app/dashboard" className="btn--purple my-4 mr-auto">Proceed</Link>
        </div>
    </div>
  )
}

export default LandingPage