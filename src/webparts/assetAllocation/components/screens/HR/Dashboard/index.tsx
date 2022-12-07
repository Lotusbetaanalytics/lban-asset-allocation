import * as React from "react";
import {
  FaCheckCircle,
  FaComments,
  FaFile,
  FaLayerGroup,
  FaTimesCircle,
} from "react-icons/fa";
import { Card, HeaderBar, NavBar } from "../../../containers";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const Dashboard = () => {
  const [value, onChange] = React.useState(new Date());
  return (
    <div className="background container">
      <NavBar active="dashboard" />

      <div className="container--info">
        <HeaderBar title="Dashboard" />
        <div className="cardContainer">
          <div className="cardFlex">
            <Card title="Total Asset Requests" count={2} Icon={FaFile} />
            <Card title="Pending Asset Request" count={2} Icon={FaComments} />
            <Card
              title="Approved Asset Requests"
              count={2}
              Icon={FaCheckCircle}
            />
            <Card
              title="Rejected Asset Requests"
              count={2}
              Icon={FaTimesCircle}
            />
            <Card
              title="Total Available Assets"
              count={2}
              Icon={FaLayerGroup}
            />
          </div>
          <div className="calendar">
            <Calendar onChange={onChange} value={value} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
