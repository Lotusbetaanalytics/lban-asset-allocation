import * as React from "react";
import { HeaderBar, NavBar } from "../../containers";
import { useQuery } from 'react-query';
import { useHistory } from 'react-router-dom';
import { fetchAssetRequests } from '../../hooks/requestHooks';
import RequestTable from "../../containers/RequestTable";

const Manage = ({status = undefined, section = ""}) => {
  const history = useHistory()
  const titleText = `${status ? status : "Manage"} Requests`
  const sectionUrl = `/app/${section ? section + "/" : ""}`

  const viewHandler = () => {
    // view asset request
    history.push(`${sectionUrl}request/detail`)
  }
  // const updateHandler = () => {
  //   // update asset request
  // }
  // const removeHandler = () => {
  //   // remove asset request
  // }

  let { isLoading, isFetching, data = [], isError, error } = useQuery("fetch-requests", fetchAssetRequests, {
    enabled: false
  })
  console.log(data, isLoading, isFetching, isError)

  if (status) {
    data = data.filter((d) => `${d.Status}`.toLowerCase === `${status}`.toLowerCase)
    console.log("filtered data: ", data)
  }

  return (
    <div className='background container'>
      <NavBar active='dashboard' section={section} />

      <div className='container--info'>
        <HeaderBar title={titleText} />

        <div className='container--form'>
          <RequestTable data={data} viewHandler={viewHandler}/>
        </div>
      </div>
    </div>
  );
};

export default Manage;
