import * as React from "react";
import { defaultPropValidation } from "../../../utils/componentUtils";
import { HeaderBar, NavBar } from "../../containers";
import {
  FaThLarge,
  FaChartBar,
  FaCogs,
  FaQuestionCircle,
  FaUsers,
  FaUserShield,
  FaVoteYea,
  FaSignOutAlt,
  FaBoxes,
  FaBorderAll,
  FaClipboard,
  FaEllipsisH,
  FaCheckCircle,
  FaTimesCircle,
  FaArrowCircleRight,
  FaArrowAltCircleRight,
  FaUsersCog,
  FaLayerGroup,
} from "react-icons/fa";
import {
  // Input,
  // Select,
  Button,
  // Radio,
  // DateInput,
  // FormGroup,
  // Textarea,
} from "mtforms";
import "mtforms/dist/index.css";
import { useHistory } from 'react-router-dom';
import toast, { Toaster } from "react-hot-toast";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import DashboardCard from "../../containers/Dashboard/Card";

const Dashboard = ({section = ""}) => {
  const history = useHistory()
  const sectionUrl = `/app/${section ? section + "/" : ""}`

  // const [value, onChange] = useState(new Date());
  const value = new Date();

  return (
    <div className='background container'>
      <NavBar active='dashboard' section={section} />

      <div className='container--info'>
        <HeaderBar title='Dashboard' />
        <Toaster position="bottom-center" reverseOrder={false} />

        <div className="container--grid">
        {section !== "employee" && 
          <Button
            title="Add Asset"
            type="button"
            onClick={() => history.push(`${sectionUrl}asset`)}
            size="small"
            // className="btn--purple br-xlg w-12"
            className="btn--purple br-xlg w-12"
          />}

          {section == "" && 
          <Button
            title="Add Asset Category"
            type="button"
            onClick={() => history.push(`${sectionUrl}category`)}
            size="small"
            className="btn--yellow text-white br-xlg w-18"
          />}

          {section == "employee" && 
          <Button
            title="Request Asset"
            type="button"
            onClick={() => history.push(`${sectionUrl}request`)}
            size="small"
            className="btn--purple br-xlg w-16"
          />}

        </div>

        <div className='dashboard'>
          <div className="dashboard__details">
            <DashboardCard title="Total Asset Requests" Icon={FaClipboard} data={"5"} />
            <DashboardCard title="Pending Asset Request" Icon={FaEllipsisH} data={"5"} />
            {section == "" && <DashboardCard title="Total Assigned Assets" Icon={FaCheckCircle} data={"5"} />}
            {section !== "" && <DashboardCard title="Approved Asset Requests" Icon={FaCheckCircle} data={"5"} />}
            {section !== "" && <DashboardCard title="Rejected Asset Requests" Icon={FaTimesCircle} data={"5"} />}
            {section !== "employee" && <DashboardCard title="Total Available Assets" Icon={FaLayerGroup} data={"5"} />}
          </div>
          <div className="dashboard__calender--container p-2">
            {/* <Calendar onChange={onChange} value={value} /> */}
            <Calendar value={value} className={"dashboard__calender"} />
          </div>
        </div>


        {/* <div className='container--form'>
          <nav className='container--form'>
            <img src='/Assets/Ellipse 2.png' alt='User Image' className='UserImg' />

            <div className='icon'>
              <a href='/Employee/dashboard.html' className='white'>
                <i className='fa-solid fa-boxes-stacked icons'></i>
              </a>
              <br />
              <a href='/Employee/pendingRequest.html'>
                <i className='fa-solid fa-ellipsis icons A'></i>
              </a>
              <br />
              <a href=''>
                <i className='fa-solid fa-circle-check icons'></i>
              </a>
              <br />
              <a href=''>
                <i className='fa-sharp fa-solid fa-circle-xmark icons'></i>
              </a>
              <br />
              <div className='B'>
                <a href='/index.html'>
                  <i className='fa-solid fa-arrow-right-from-br/acket icons'></i>
                </a>
              </div>
            </div>
          </nav>
          <div className='dash'>
            <div>
              <h1>Dashboard</h1>
              <h2 className='shadow2'>New Request</h2>
            </div>
            <div className='userLoggedIn'>
              <img src='/Assets/Ellipse 5.png' alt='userimg' className='UserImg1' />
              <h1>John Doe</h1>
              <p>john@lotusbetaanalytics.com</p>
            </div>
          </div>
          <div className='firstSection'>
            <div className='file shadow2'>
              <div>
                <p>Total Assets Requests</p>
                <br />
                <i className='fa-solid fa-5 num'></i>
              </div>

              <i className='fa-solid fa-box-archive filesvg'></i>
            </div>
            <div className='pending shadow2'>
              <div>
                <p>Approved Asset Requests</p>
                <br />
                <i className='fa-solid fa-1 digit'></i>
                <i className='fa-solid fa-0 digit'></i>
              </div>
              <i className='fa-solid fa-circle-check filesvg'></i>
            </div>
          </div>
          <div className='secondSection'>
            <div className='file shadow2'>
              <div>
                <p>Pending Asset Request</p>
                <br />
                <i className='fa-solid fa-2 num'></i>
              </div>

              <i className='fa-solid fa-ellipsis filesvg'></i>
            </div>
            <div className='pending shadow2'>
              <div>
                <p>Rejected Asset Requests</p>
                <br />
                <i className='fa-solid fa-3 num'></i>
              </div>

              <i className='fa-sharp fa-solid fa-circle-xmark filesvg'></i>
            </div>
          </div>
        </div> */}


      </div>
    </div>
  );
};

Dashboard.propTypes = defaultPropValidation

export default Dashboard;
