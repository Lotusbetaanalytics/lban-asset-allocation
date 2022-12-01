import * as React from "react";
import { HeaderBar, NavBar } from "../../containers";
import { useQuery } from 'react-query';
import { useHistory } from 'react-router-dom';
import toast, { Toaster } from "react-hot-toast";
import { fetchAssetRequests } from '../../hooks/requestHooks';
import RequestTable from "../../containers/RequestTable";

const Manage = ({status = undefined, section = ""}) => {
  const history = useHistory()
  const titleText = `${status ? status : "Manage"} Requests`
  const sectionUrl = `/app/${section ? section + "/" : ""}`

  const viewHandler = (id) => {
    // view asset request
    history.push(`${sectionUrl}request/detail/${id}`)
  }
  // const updateHandler = () => {
  //   // update asset request
  // }
  // const removeHandler = () => {
  //   // remove asset request
  // }

  const { isLoading, isFetching, data: requests = [], isError, error } = useQuery("fetch-requests", fetchAssetRequests, {
    // enabled: false,
    refetchInterval: 3000,
    refetchOnMount:false,
    refetchOnWindowFocus: false,
  })
  console.log(requests, isLoading, isFetching, isError)

  let data = requests
  if (status) {
    data = requests.filter((d) => `${d.Status}`.toLowerCase === `${status}`.toLowerCase)
    console.log("filtered data: ", data)
  }

  if (isLoading) return (<div>Loading...</div>)
  if (isError) toast.error(`${error}`);

  return (
    <div className='background container'>
      <NavBar active='dashboard' section={section} />

      <div className='container--info'>
        <HeaderBar title={titleText} />
        <Toaster position="bottom-center" reverseOrder={false} />

        <div className='container--form'>
          <RequestTable data={data} viewHandler={viewHandler}/>
        </div>
      </div>
    </div>
  );
};

export default Manage;
