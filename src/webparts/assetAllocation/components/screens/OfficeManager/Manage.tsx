import * as React from "react";
import { HeaderBar, NavBar, Table } from "../../containers";
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
  
  const titleText = `Office Managers`
  const sectionUrl = `/app/${section ? section + "/" : ""}`

  // type IType = "string" | "boolean" | "numeric" | "date" | "datetime" | "time" | "currency";
  // const string: IType = "string";
  const columns = [
    { title: "Name", field: "Title", type: "string" as const },
    { title: "Email", field: "Email", type: "string" as const },
  ];

  const viewHandler = (id) => history.push(`${sectionUrl}om/detail/${id}`)
  const updateHandler = (id) => history.push(`${sectionUrl}om/${id}`)
  const removeHandler = (id) => mutate(id)

  // get officeManagers
  const { isLoading, isFetching, data: officeManagers = [], isError, error } = useQuery("fetch-office-managers", splist("OfficeManager").fetchItems, {...fetchOptions})
  // console.log("get request", officeManagers, isLoading, isFetching, isError)

  // delete officeManager
  const { data: delData, isLoading: delIsLoading, isError: delIsError, error: delError, mutate } = useMutation(splist("OfficeManager").deleteItem, {
    onSuccess: data => {
      console.log("Office Manager Deleted Sucessfully: ", data)
      toast.success("Office Manager Deleted Sucessfully")
    },
    onError: (error) => {
      console.log("Error Deleting Office Manager: ", error)
      toast.error("Error Deleting Office Manager")
    },
    onSettled: () => {
      queryClient.invalidateQueries('fetch-office-managers');
    },
  })
  // console.log("delete request", delData, delIsLoading, delIsError)

  const data = officeManagers

  if (isLoading || delIsLoading) return (<div>Loading...</div>)
  if (isError || delIsError) toast.error(`${error || delError}`);

  return (
    <div className='background container'>
      <NavBar active='settings' section={section} />

      <div className='container--info'>
        <HeaderBar title={titleText} />
        <Toaster position="bottom-center" reverseOrder={false} />
        <div className="container--info">
          <Button
            title="Add Office Manager"
            type="button"
            onClick={() => history.push(`${sectionUrl}om`)}
            size="small"
            className="btn--purple br-xlg w-18"
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
