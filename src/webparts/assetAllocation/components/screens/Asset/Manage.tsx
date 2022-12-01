import * as React from "react";
import { HeaderBar, NavBar, Table } from "../../containers";
import { useQuery } from 'react-query';
import { useHistory } from 'react-router-dom';
import toast, { Toaster } from "react-hot-toast";
import { fetchAssetRequests } from '../../hooks/requestHooks';
import RequestTable from "../../containers/RequestTable";
import splist from "../../hooks/splistHook";

const Manage = ({status = undefined, section = ""}) => {
  const history = useHistory()
  const titleText = `${status ? status : "Manage"} Requests`
  const sectionUrl = `/app/${section ? section + "/" : ""}`


  type IType = "string" | "boolean" | "numeric" | "date" | "datetime" | "time" | "currency";
  const string: IType = "string";
  const columns = React.useState([
    { title: "Serial Number", field: "SerialNumber", type: "string" as const },
    { title: "Name", field: "Name", type: "string" as const },
    { title: "Description", field: "Description", type: "string" as const },
    { title: "Category", field: "Category", type: "string" as const },
    { title: "Branch", field: "Branch", type: "string" as const },
    { title: "RamSize", field: "RamSize", type: "string" as const },
    { title: "HardDriveSize", field: "HardDriveSize", type: "string" as const },
    { title: "SSD", field: "SSD", type: "string" as const },
    { title: "Date", field: "Date", type: "string" as const },
  ]);

  const viewHandler = (id) => {
    // view asset request
    history.push(`${sectionUrl}asset/detail/${id}`)
  }
  // const updateHandler = () => {
  //   // update asset request
  // }
  // const removeHandler = () => {
  //   // remove asset request
  // }

  const { isLoading, isFetching, data: requests = [], isError, error } = useQuery("fetch-requests", () => splist("Asset").fetchItems(), {
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
          <Table columns={columns} data={data} viewHandler={viewHandler}/>
        </div>
      </div>
    </div>
  );
};

export default Manage;
