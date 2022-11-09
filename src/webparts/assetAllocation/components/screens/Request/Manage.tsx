import * as React from "react";
import { HeaderBar, NavBar } from "../../containers";
import { useQuery } from 'react-query';
import { fetchAssetRequest } from '../../hooks/requestHooks';
import RequestTable from "../../containers/RequestTable";

const Manage = ({status = undefined}) => {
  const { isLoading, isFetching, data, isError, error } = useQuery("asset-request", fetchAssetRequest, {enabled: false})
  console.log(data, isLoading, isFetching, isError)

  return (
    <div className='background container'>
      <NavBar active='dashboard' />

      <div className='container--info'>
        <HeaderBar title='Manage Requests' />

        <div className='container--form'>
          <RequestTable data={data} />
        </div>
      </div>
    </div>
  );
};

export default Manage;
