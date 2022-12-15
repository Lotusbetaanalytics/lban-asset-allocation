import * as React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import toast, { Toaster } from "react-hot-toast";
import { HeaderBar, NavBar, DetailItem } from "../../containers";
import splist from "../../hooks/splistHook";
import { defaultPropValidation } from "../../../utils/componentUtils";
import { fetchOptions } from "../../hooks/queryOptions";

const Detail = ({section = ""}) => {
  const { id } = useParams();

  const { isLoading, isFetching, data: hrManager = {}, isError, error } = useQuery(["fetch-hr-manager", id], () => splist("HRManager").fetchItem(id), {...fetchOptions})

  if (isLoading || isFetching) return (<div>Loading...</div>)
  if (isError) toast.error(`${error}`);

  return (
    <div className='background container'>
      <NavBar active='settings' section={section} />

      <div className='container--info'>
        <HeaderBar title='HR Manager Detail' hasBackButton={true} />
        <Toaster position="bottom-center" reverseOrder={false} />

        <div className='container--form'>
          <div className="container--details">
            <DetailItem heading={"Name"} body={hrManager["Name"] || "Unavailable"} />
            <DetailItem heading={"Email"} body={hrManager["Email"] || "Unavailable"} />
          </div>
        </div>
      </div>
    </div>
  );
};

Detail.propTypes = defaultPropValidation

export default Detail;
