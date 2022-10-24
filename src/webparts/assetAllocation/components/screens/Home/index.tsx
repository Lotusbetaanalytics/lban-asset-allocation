import * as React from "react";
import { } from "react-icons/fa";

const Home = () => {
  return (
    <div className="maincontainer">
        <div className="Container">
            <div>
                <img src="/Assets/Rectangle 8.png" className="blob" alt=""/>
                <img src="/Assets/Rectangle 9.png" className="blob2" alt=""/>
                <img src="/Assets/Rectangle 6 .png" className="blob3" alt=""/>
                <img src="/Assets/Rectangle 7.png" className="blob4" alt=""/>
            </div>
            <div className="imgContainer">
                <a href="" className="imgbtn"><img src="./Assets/pic1.png" alt="laptop"/></a>
                <p>HR</p>
                <br/>
                <a href="/Employee/landingpage.html" className="imgbtn"><img src="./Assets/pic2.png" alt="Mouse"/></a>
                <p>Employee</p>
            </div>
            <div className="imgContainer2">
                <a href="" className="imgbtn"><img src="./Assets/pic3.png" alt="mouse"/></a>
                <p>Office Manager</p>
                <br/>
                <img src="./Assets/pic4.png" alt="box"/>
            </div>
        </div>
        <div className="textContainer">
            <div className="text">
                <h3>Welcome to the</h3>
                <h1>Asset Allocation</h1>
                <h1 className="portal">Portal</h1>
            </div>
        </div>
    </div>
  );
};

export default Home;
