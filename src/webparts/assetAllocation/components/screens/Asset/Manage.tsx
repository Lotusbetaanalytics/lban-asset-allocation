import * as React from "react";
import { HeaderBar, NavBar, Table } from "../../containers";
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  // Input,
  // Select,
  Button,
  // Radio,
  // DateInput,
  // FormGroup,
  // Textarea,
} from "mtforms";
import "mtforms/dist/index.css";
import { useHistory } from 'react-router-dom';
import toast, { Toaster } from "react-hot-toast";
// import { fetchAssetRequests } from '../../hooks/requestHooks';
// import RequestTable from "../../containers/RequestTable";
import splist from "../../hooks/splistHook";
import { fetchOptions } from "../../hooks/queryOptions";
import { defaultPropValidation } from "../../../utils/componentUtils";

const Manage = ({status = undefined, section = ""}) => {
  const history = useHistory()
  const queryClient = useQueryClient();

  // const titleText = `${status ? status : "Manage"} Assets`
  const titleText = `Available Assets`
  const sectionUrl = `/app/${section ? section + "/" : ""}`


  // type IType = "string" | "boolean" | "numeric" | "date" | "datetime" | "time" | "currency";
  // const string: IType = "string";
  const columns = [
    { title: "Serial Number", field: "SerialNumber", type: "string" as const },
    { title: "Name", field: "Name", type: "string" as const },
    { title: "Description", field: "Description", type: "string" as const },
    { title: "Category", field: "Category", type: "string" as const },
    { title: "Branch", field: "Branch", type: "string" as const },
    { title: "RamSize", field: "RamSize", type: "string" as const },
    { title: "HardDriveSize", field: "HardDriveSize", type: "string" as const },
    { title: "SSD", field: "SSD", type: "string" as const },
    { title: "Date", field: "Date", type: "string" as const },
  ];

  // const [id, setId] = React.useState(undefined)

  const viewHandler = (id) => {
    // view asset
    history.push(`${sectionUrl}asset/detail/${id}`)
  }
  const updateHandler = (id) => {
    // update asset
    history.push(`${sectionUrl}asset/${id}`)
  }
  const removeHandler = (id) => {
    // remove asset
    mutate(id)
  }

  // get assets
  const { isLoading, isFetching, data: assets = [], isError, error } = useQuery("fetch-assets", splist("Asset").fetchItems, {...fetchOptions})
  console.log("get request", assets, isLoading, isFetching, isError)

  // delete asset
  const { data: delData, isLoading: delIsLoading, isError: delIsError, error: delError, mutate } = useMutation(splist("Asset").deleteItem, {
    onSuccess: data => {
      console.log("Asset Deleted Sucessfully: ", data)
      alert("success")
    },
    onError: (error) => {
      console.log("Error Deleting Asset: ", error)
      alert("there was an error")
    },
    onSettled: () => {
      queryClient.invalidateQueries('fetch-assets');
    },

  })
  console.log("delete request", delData, delIsLoading, delIsError)


  let data = assets
  if (status) {
    data = assets.filter((d) => `${d.Status}`.toLowerCase() === `${status}`.toLowerCase())
    console.log("filtered data: ", data)
  }

  if (isLoading || delIsLoading) return (<div>Loading...</div>)
  if (isError || delIsError) toast.error(`${error || delError}`);

  // if (isLoading) return (<div>Loading...</div>)
  // if (isError) toast.error(`${error}`);

  return (
    <div className='background container'>
      <NavBar active='asset' section={section} />

      <div className='container--info'>
        <HeaderBar title={titleText} />
        <Toaster position="bottom-center" reverseOrder={false} />
        <div className="constainer--info">
          <Button
            title="Add Asset"
            type="button"
            onClick={() => console.log("create asset")}
            size="small"
            className="btn--purple br-xlg w-12"
          />
        </div>
        <div className='container--form'>
          <Table columns={columns} data={data} viewHandler={viewHandler} updateHandler={updateHandler} removeHandler={removeHandler} actionsType="all" />
        </div>
      </div>
    </div>
  );
};

Manage.propTypes = defaultPropValidation

export default Manage;
