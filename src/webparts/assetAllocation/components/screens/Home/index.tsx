import * as React from "react";
import { Link } from 'react-router-dom'
// import { } from "react-icons/fa";

const Home = () => {
  return (
    <div className="background--home">
      <div className="container--home">
        <div className="container--side">
          {/* <div>
            <img src={require("../../assets/img/Rectangle8.png")} className="blob" alt=""/>
            <img src={require("../../assets/img/Rectangle9.png")} className="blob2" alt=""/>
            <img src={require("../../assets/img/Rectangle6.png")} className="blob3" alt=""/>
            <img src={require("../../assets/img/Rectangle7.png")} className="blob4" alt=""/>
          </div> */}
          <div className="container--image">
            <Link to="/app/landing" className="image--btn" >
              <img className="image" src={require("../../assets/img/pic1.png")} alt="laptop"/>
              <p className="image__text">HR</p>
            </Link>
            <Link to="/app/landing" className="image--btn" >
              <img className="image" src={require("../../assets/img/pic2.png")} alt="Mouse"/>
              <p className="image__text">Employee</p>
            </Link>
          </div>
          <div className="container--image mt-6">
            <Link to="/app/landing" className="image--btn">
              <img className="image" src={require("../../assets/img/pic3.png")} alt="mouse"/>
              <p className="image__text">Office Manager</p>
            </Link>
            <br/>
            <img className="image" src={require("../../assets/img/pic4.png")} alt="box"/>
          </div>
        </div>
        <div className="container--side">
            <div className="home__text p-4">
                <h3>Welcome to the</h3>
                <h1 className="home__heading">Asset Allocation Portal</h1>
            </div>
        </div>
    </div>
  </div>
  );
};


// NOTE: Old Code
// const Home = () => {
//     return (
//       <div className="maincontainer">
//           <div className="Container">
//               <div>
//                   <img src={require("../../assets/img/Rectangle8.png")} className="blob" alt=""/>
//                   <img src={require("../../assets/img/Rectangle9.png")} className="blob2" alt=""/>
//                   <img src={require("../../assets/img/Rectangle6.png")} className="blob3" alt=""/>
//                   <img src={require("../../assets/img/Rectangle7.png")} className="blob4" alt=""/>
//               </div>
//               <div className="imgContainer">
//                   <Link to="/app/hr" className="imgbtn" >
//                       <img src={require("../../assets/img/pic1.png")} alt="laptop"/>
//                   </Link>
//                   <p>HR</p>
//                   <br/>
//                   <Link to="/app/employee" className="imgbtn" >
//                       <img src={require("../../assets/img/pic2.png")} alt="Mouse"/>
//                   </Link>
//                   {/* <a href="" className="imgbtn"><img src="../../assets/img/pic1.png" alt="laptop"/></a> */}
//                   {/* <a href="" className="imgbtn"><img src={require("../../assets/img/pic1.png")} alt="laptop"/></a> */}
//                   {/* <a href="/Employee/landingpage.html" className="imgbtn"><img src={require("../../assets/img/pic2.png")} alt="Mouse"/></a> */}
//                   <p>Employee</p>
//               </div>
//               <div className="imgContainer2">
//                   <a href="" className="imgbtn"><img src={require("../../assets/img/pic3.png")} alt="mouse"/></a>
//                   <p>Office Manager</p>
//                   <br/>
//                   <img src={require("../../assets/img/pic4.png")} alt="box"/>
//               </div>
//           </div>
//           <div className="textContainer">
//               <div className="text">
//                   <h3>Welcome to the</h3>
//                   <h1>Asset Allocation</h1>
//                   <h1 className="portal">Portal</h1>
//               </div>
//           </div>
//       </div>
//     );
//   };

export default Home;
