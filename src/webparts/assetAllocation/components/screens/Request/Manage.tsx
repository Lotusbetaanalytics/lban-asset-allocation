import * as React from "react";
import { HeaderBar, NavBar } from "../../containers";
import { useQuery } from 'react-query';
import { fetchAssetRequests } from '../../hooks/requestHooks';
import RequestTable from "../../containers/RequestTable";

const Manage = ({status = undefined, section = ""}) => {
  const titleText = `${status ? status : "Manage"} Requests`
  const { isLoading, isFetching, data, isError, error } = useQuery("fetch-requests", fetchAssetRequests, {
    enabled: false
  })
  console.log(data, isLoading, isFetching, isError)

  return (
    <div className='background container'>
      <NavBar active='dashboard' section={section} />

      <div className='container--info'>
        <HeaderBar title={titleText} />

        <div className='container--form'>
          <RequestTable data={data} />
        </div>
      </div>
    </div>
  );
};

export default Manage;
