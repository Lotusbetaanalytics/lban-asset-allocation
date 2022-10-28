import * as React from 'react'

const Dashboard = () => {
  return (
    <div className="container">
        <nav className="sidebar shadow1">
            <div className="sideb">

                <img src="/Assets/Ellipse 2.png" alt="User Image" className="UserImg"/>

                <div className="icon">
                    <a href="/Employee/dashboard.html" className="white"><i className="fa-solid fa-boxes-stacked icons"></i></a>
                    <br/>
                    <a href="/Employee/pendingRequest.html"><i className="fa-solid fa-ellipsis icons A"></i></a>
                    <br/>
                    <a href=""><i className="fa-solid fa-circle-check icons"></i></a>
                    <br/>
                    <a href=""><i className="fa-sharp fa-solid fa-circle-xmark icons"></i></a>
                    <br/>
                    <div className="B">
                        <a href="/index.html"><i className="fa-solid fa-arrow-right-from-br/acket icons"></i></a>
                    </div>
                </div>
            </div>
        </nav>
        <div className="dashboard">
            <div className="dash">
                <div>
                    <h1>Dashboard</h1>
                    <h2 className="shadow2">New Request</h2>
                </div>
                <div className="userLoggedIn">
                    <img src="/Assets/Ellipse 5.png" alt="userimg" className="UserImg1"/>
                    <h1>John Doe</h1>
                    <p>john@lotusbetaanalytics.com</p>
                </div>
            </div>
            <div className="firstSection">
                <div className="file shadow2">
                    <div>
                        <p>Total Assets Requests</p>
                        <br/>
                        <i className="fa-solid fa-5 num"></i>
                    </div>

                    <i className="fa-solid fa-box-archive filesvg"></i>
                </div>
                <div className="pending shadow2">
                    <div>
                        <p>Approved Asset Requests</p>
                        <br/>
                        <i className="fa-solid fa-1 digit"></i>
                        <i className="fa-solid fa-0 digit"></i>
                    </div>
                    <i className="fa-solid fa-circle-check filesvg"></i>
                </div>
            </div>
            <div className="secondSection">
                <div className="file shadow2">
                    <div>
                        <p>Pending Asset Request</p>
                        <br/>
                        <i className="fa-solid fa-2 num"></i>
                    </div>

                    <i className="fa-solid fa-ellipsis filesvg"></i>
                </div>
                <div className="pending shadow2">
                    <div>
                        <p>Rejected Asset Requests</p>
                        <br/>
                        <i className="fa-solid fa-3 num"></i>
                    </div>

                    <i className="fa-sharp fa-solid fa-circle-xmark filesvg"></i>
                </div>
            </div>

        </div>
    </div>
  )
}

export default Dashboard