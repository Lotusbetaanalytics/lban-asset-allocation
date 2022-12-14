import * as React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import toast, { Toaster } from "react-hot-toast";
import {
  HeaderBar,
  NavBar,
  DetailItem,
  LoadingSpinner,
} from "../../containers";
import splist from "../../hooks/splistHook";
import { defaultPropValidation } from "../../../utils/componentUtils";
import { fetchOptions } from "../../hooks/queryOptions";

const Detail = ({ section = "" }) => {
  const { id } = useParams();

  const {
    isLoading,
    isFetching,
    data: officeManager = {},
    isError,
    error,
  } = useQuery(
    ["fetch-office-manager", id],
    () => splist("OfficeManager").fetchItem(id),
    { ...fetchOptions }
  );

  if (isLoading || isFetching) return <LoadingSpinner />;
  if (isError) toast.error(`${error}`);

  return (
    <div className="background container">
      <NavBar active="settings" section={section} />

      <div className="container--info">
        <HeaderBar title="Office Manager Detail" hasBackButton={true} />
        <Toaster position="bottom-center" reverseOrder={false} />

        <div className="container--form">
          <div className="container--details">
            <DetailItem
              heading={"Name"}
              body={officeManager["Name"] || "Unavailable"}
            />
            <DetailItem
              heading={"Email"}
              body={officeManager["Email"] || "Unavailable"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

Detail.propTypes = defaultPropValidation;

export default Detail;
