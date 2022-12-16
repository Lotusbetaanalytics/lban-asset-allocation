import * as React from "react";
import { defaultPropValidation } from "../../../utils/componentUtils";
import { HeaderBar, LoadingSpinner, NavBar } from "../../containers";
import {
  FaClipboard,
  FaEllipsisH,
  FaCheckCircle,
  FaTimesCircle,
  FaLayerGroup,
} from "react-icons/fa";
import { Button } from "mtforms";
import "mtforms/dist/index.css";
import { useHistory } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import DashboardCard from "../../containers/Dashboard/Card";
import { useQuery } from "react-query";
import { fetchOptions } from "../../hooks/queryOptions";
import { getUserProfile } from "../../../utils/listUtils";
import splist from "../../hooks/splistHook";

const Dashboard = ({ section = "" }) => {
  const history = useHistory();
  const sectionUrl = `/app/${section ? section + "/" : ""}`;
  const currentDate = new Date();

  const filterRequest = (data) => {
    if (section == "employee" && authUser)
      data = data.filter((i) => i.EmployeeEmail == authUser?.Email);
    // console.log("filtering attempted", section)
    return data;
  };

  const filteredDataLength = (
    data,
    property = undefined,
    value = undefined
  ) => {
    if (property && value) data = data.filter((i) => i[property] == value);
    // console.log({"data.length": data.length, property, value})
    return data.length;
  };

  const {
    data: authUser = { Email: undefined },
    isError: isAuthError,
    error: authError,
  } = useQuery("fetch-auth-user", getUserProfile, { ...fetchOptions });
  // console.log({authUser, isAuthError, authError})

  const {
    isLoading,
    isFetching,
    data: requests = [],
    isError,
    error,
  } = useQuery("fetch-requests", () => splist("AssetRequest").fetchItems(), {
    ...fetchOptions,
    select: filterRequest,
  });
  // console.log(requests, isLoading, isFetching, isError)

  const {
    isLoading: isAssetLoading,
    isFetching: isAssetFetching,
    data: assets = [],
    isError: isAssetError,
    error: assetError,
  } = useQuery("fetch-assets", () => splist("Asset").fetchItems(), {
    ...fetchOptions,
  });
  // console.log(assets, isAssetLoading, isAssetFetching, isAssetError)

  if (isLoading || isAssetLoading) return <LoadingSpinner />;
  if (isError || isAssetError || isAuthError)
    toast.error(`${error || assetError || authError}`);

  return (
    <div className="background container">
      <NavBar active="dashboard" section={section} />

      <div className="container--info">
        <HeaderBar title="Dashboard" />
        <Toaster position="bottom-center" reverseOrder={false} />

        <div className="container--grid">
          {section !== "employee" && (
            <Button
              title="Add Asset"
              type="button"
              onClick={() => history.push(`/app/asset`)}
              size="small" // still too large
              className="btn--purple br-xlg w-12"
            />
          )}

          {section == "" && (
            <Button
              title="Add Asset Category"
              type="button"
              onClick={() => history.push(`/app/category`)}
              size="small"
              className="btn--yellow text-white br-xlg w-18"
            />
          )}

          {section == "employee" && (
            <Button
              title="Request Asset"
              type="button"
              onClick={() => history.push(`${sectionUrl}request`)}
              size="small"
              className="btn--purple br-xlg w-16"
            />
          )}
        </div>

        <div className="dashboard">
          <div className="dashboard__details">
            <DashboardCard
              title="Total Asset Requests"
              Icon={FaClipboard}
              data={filteredDataLength(requests)}
            />
            <DashboardCard
              title="Pending Asset Request"
              Icon={FaEllipsisH}
              data={filteredDataLength(requests, "Status", "Pending")}
            />
            {section == "" && (
              <DashboardCard
                title="Total Assigned Assets"
                Icon={FaCheckCircle}
                data={filteredDataLength(assets, "IsAssigned", true)}
              />
            )}
            {section !== "" && (
              <DashboardCard
                title="Approved Asset Requests"
                Icon={FaCheckCircle}
                data={filteredDataLength(requests, "Status", "Approved")}
              />
            )}
            {section !== "" && (
              <DashboardCard
                title="Rejected Asset Requests"
                Icon={FaTimesCircle}
                data={filteredDataLength(requests, "Status", "Declined")}
              />
            )}
            {section !== "employee" && (
              <DashboardCard
                title="Total Available Assets"
                Icon={FaLayerGroup}
                data={filteredDataLength(assets)}
              />
            )}
          </div>
          <div className="dashboard__calender--container p-2">
            <Calendar value={currentDate} className={"dashboard__calender"} />
          </div>
        </div>
      </div>
    </div>
  );
};

Dashboard.propTypes = defaultPropValidation;

export default Dashboard;
