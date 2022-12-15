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

  const titleText = `Categories`
  const sectionUrl = `/app/${section ? section + "/" : ""}`

  // type IType = "string" | "boolean" | "numeric" | "date" | "datetime" | "time" | "currency";
  // const string: IType = "string";
  const columns = [
    { title: "Title", field: "Title", type: "string" as const },
    { title: "Description", field: "Description", type: "string" as const },
  ];

  const viewHandler = (id) => history.push(`${sectionUrl}category/detail/${id}`)
  const updateHandler = (id) => history.push(`${sectionUrl}category/${id}`)
  const removeHandler = (id) => mutate(id)

  // get categories
  const { isLoading, isFetching, data: categories = [], isError, error } = useQuery("fetch-categories", splist("Category").fetchItems, {...fetchOptions})
  // console.log("get request", categories, isLoading, isFetching, isError)

  // delete category
  const { data: delData, isLoading: delIsLoading, isError: delIsError, error: delError, mutate } = useMutation(splist("Category").deleteItem, {
    onSuccess: data => {
      console.log("Category Deleted Sucessfully: ", data)
      toast.success("Category Deleted Sucessfully")
    },
    onError: (error) => {
      console.log("Error Deleting Category: ", error)
      toast.error("Error Deleting Category")
    },
    onSettled: () => {
      queryClient.invalidateQueries('fetch-categories');
    },

  })
  // console.log("delete request", delData, delIsLoading, delIsError)

  const data = categories

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
            title="Add Category"
            type="button"
            onClick={() => history.push(`${sectionUrl}category`)}
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
