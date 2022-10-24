import * as React from 'react'

const LandingPage = () => {
  return (
    <div className="Employeecontainer">
        <div className="container2">
            <div>
                <img src="/Assets/lban white logo 1.png" className="LBAN" alt="LBAN LOGO" />
            </div>
            <div className="text1 ">
                <h3 className="welcome">Welcome to the</h3>
                <div className="lineContainer">
                    <div className="line">
                        <div></div>
                    </div>
                </div>
                <h1 className="allocate">Asset Allocation</h1>
                <h1 className="allocate">Portal</h1>
                <a href="/Employee/dashboard.html" className="btn shadow">Proceed</a>
            </div>
        </div>
    </div>
  )
}

export default LandingPage