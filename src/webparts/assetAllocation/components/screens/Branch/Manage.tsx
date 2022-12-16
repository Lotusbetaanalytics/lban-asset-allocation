import * as React from "react";
import { HeaderBar, LoadingSpinner, NavBar, Table } from "../../containers";
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  Button,
} from "mtforms";
import "mtforms/dist/index.css";
import { useHistory } from 'react-router-dom';
import toast, { Toaster } from "react-hot-toast";
import splist from "../../hooks/splistHook";
import { fetchOptions } from "../../hooks/queryOptions";
import { defaultPropValidation } from "../../../utils/componentUtils";

const Manage = ({section = ""}) => {
  const history = useHistory()
  const queryClient = useQueryClient();

  const titleText = `Branches`
  const sectionUrl = `/app/${section ? section + "/" : ""}`

  // type IType = "string" | "boolean" | "numeric" | "date" | "datetime" | "time" | "currency";
  // const string: IType = "string";
  const columns = [
    { title: "Name", field: "Title", type: "string" as const },
    { title: "Location", field: "Location", type: "string" as const },
    { title: "Address", field: "Address", type: "string" as const },
  ];

  const viewHandler = (id) => history.push(`${sectionUrl}branch/detail/${id}`)
  const updateHandler = (id) => history.push(`${sectionUrl}branch/${id}`)
  const removeHandler = (id) => mutate(id)

  // get branches
  const { isLoading, isFetching, data: branches = [], isError, error } = useQuery("fetch-branches", splist("Branch").fetchItems, {...fetchOptions})
  // console.log("get request", branches, isLoading, isFetching, isError)

  // delete branch
  const { data: delData, isLoading: delIsLoading, isError: delIsError, error: delError, mutate } = useMutation(splist("Branch").deleteItem, {
    onSuccess: data => {
      console.log("Branch Deleted Sucessfully: ", data)
      toast.success("Branch Deleted Sucessfully")
    },
    onError: (error) => {
      console.log("Error Deleting Branch: ", error)
      toast.error("Error Deleting Branch")
    },
    onSettled: () => {
      queryClient.invalidateQueries('fetch-branches');
    },

  })
  // console.log("delete request", delData, delIsLoading, delIsError)

  const data = branches

  if (isLoading || delIsLoading) return (<LoadingSpinner />)
  if (isError || delIsError) toast.error(`${error || delError}`);

  return (
    <div className='background container'>
      <NavBar active='settings' section={section} />

      <div className='container--info'>
        <HeaderBar title={titleText} />
        <Toaster position="bottom-center" reverseOrder={false} />
        <div className="container--info">
          <Button
            title="Add Branch"
            type="button"
            onClick={() => history.push(`${sectionUrl}branch`)}
            size="small"
            className="btn--purple br-xlg w-16"
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
