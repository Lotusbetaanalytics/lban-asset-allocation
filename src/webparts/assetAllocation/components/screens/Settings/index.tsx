import * as React from "react";
import { defaultPropValidation } from "../../../utils/componentUtils";
import { HeaderBar, NavBar } from "../../containers";
import {
  FaClipboard,
  FaEllipsisH,
  // FaCheckCircle,
  // FaTimesCircle,
  FaLayerGroup,
} from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import DashboardCard from "../../containers/Dashboard/Card";

const Dashboard = ({ section = "" }) => {
  const sectionUrl = `/app/${section ? section + "/" : ""}`;

  return (
    <div className="background container">
      <NavBar active="settings" section={section} />

      <div className="container--info">
        <HeaderBar title="Configuration" hasBackButton={true} />
        <Toaster position="bottom-center" reverseOrder={false} />

        <div className="settings">
          {section == "" && (
            <DashboardCard
              title="Manage Asset Categories"
              Icon={FaClipboard}
              url="/app/category/manage"
              titleClassName="settings__card__title"
            />
          )}
          {section == "" && (
            <DashboardCard
              title="Manage Branches"
              Icon={FaEllipsisH}
              url="/app/branch/manage"
              titleClassName="settings__card__title"
            />
          )}
          {/* <DashboardCard title="Manage Other Property" Icon={FaCheckCircle} url="/app/settings" titleClassName="settings__card__title" /> */}
          {/* <DashboardCard title="Manage Other Property" Icon={FaCheckCircle} url="/app/settings" titleClassName="settings__card__title" /> */}
          {section == "hr" && (
            <DashboardCard
              title="Manage Office Managers"
              Icon={FaClipboard}
              url={`${sectionUrl}settings/om/manage`}
              titleClassName="settings__card__title"
            />
          )}
          {section == "hr" && (
            <DashboardCard
              title="Manage HR Managers"
              Icon={FaLayerGroup}
              url={`${sectionUrl}settings/hr/manage`}
              titleClassName="settings__card__title"
            />
          )}
        </div>
      </div>
    </div>
  );
};

Dashboard.propTypes = defaultPropValidation;

export default Dashboard;
