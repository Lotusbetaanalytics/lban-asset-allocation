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
// import { fetchBranchRequests } from '../../hooks/requestHooks';
// import RequestTable from "../../containers/RequestTable";
import splist from "../../hooks/splistHook";
import { fetchOptions } from "../../hooks/queryOptions";
import { defaultPropValidation } from "../../../utils/componentUtils";

const Manage = ({status = undefined, section = ""}) => {
  const history = useHistory()
  const queryClient = useQueryClient();

  // const titleText = `${status ? status : "Manage"} Branchs`
  const titleText = `Branches`
  const sectionUrl = `/app/${section ? section + "/" : ""}`


  // type IType = "string" | "boolean" | "numeric" | "date" | "datetime" | "time" | "currency";
  // const string: IType = "string";
  const columns = [
    { title: "Name", field: "Title", type: "string" as const },
    { title: "Location", field: "Location", type: "string" as const },
    { title: "Address", field: "Address", type: "string" as const },
  ];

  // const [id, setId] = React.useState(undefined)

  const viewHandler = (id) => {
    // view branch
    history.push(`${sectionUrl}branch/detail/${id}`)
  }
  const updateHandler = (id) => {
    // update branch
    history.push(`${sectionUrl}branch/${id}`)
  }
  const removeHandler = (id) => {
    // remove branch
    mutate(id)
  }

  // get branches
  const { isLoading, isFetching, data: branches = [], isError, error } = useQuery("fetch-branches", splist("Branch").fetchItems, {...fetchOptions})
  console.log("get request", branches, isLoading, isFetching, isError)

  // delete branch
  const { data: delData, isLoading: delIsLoading, isError: delIsError, error: delError, mutate } = useMutation(splist("Branch").deleteItem, {
    onSuccess: data => {
      console.log("Branch Deleted Sucessfully: ", data)
      alert("success")
    },
    onError: (error) => {
      console.log("Error Deleting Branch: ", error)
      alert("there was an error")
    },
    onSettled: () => {
      queryClient.invalidateQueries('fetch-branches');
    },

  })
  console.log("delete request", delData, delIsLoading, delIsError)


  let data = branches
  if (status) {
    data = branches.filter((d) => `${d.Status}`.toLowerCase === `${status}`.toLowerCase)
    console.log("filtered data: ", data)
  }

  if (isLoading || delIsLoading) return (<div>Loading...</div>)
  if (isError || delIsError) toast.error(`${error || delError}`);

  // if (isLoading) return (<div>Loading...</div>)
  // if (isError) toast.error(`${error}`);

  return (
    <div className='background container'>
      <NavBar active='dashboard' section={section} />

      <div className='container--info'>
        <HeaderBar title={titleText} />
        <Toaster position="bottom-center" reverseOrder={false} />
        <div className="constainer--info">
          <Button
            title="Add Branch"
            type="button"
            onClick={() => console.log("create branch")}
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
