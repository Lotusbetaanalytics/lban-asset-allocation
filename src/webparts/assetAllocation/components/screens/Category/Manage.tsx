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
// import { fetchCategoryRequests } from '../../hooks/requestHooks';
// import RequestTable from "../../containers/RequestTable";
import splist from "../../hooks/splistHook";
import { fetchOptions } from "../../hooks/queryOptions";
import { defaultPropValidation } from "../../../utils/componentUtils";

const Manage = ({status = undefined, section = ""}) => {
  const history = useHistory()
  const queryClient = useQueryClient();

  // const titleText = `${status ? status : "Manage"} Categorys`
  const titleText = `Categories`
  const sectionUrl = `/app/${section ? section + "/" : ""}`


  // type IType = "string" | "boolean" | "numeric" | "date" | "datetime" | "time" | "currency";
  // const string: IType = "string";
  const columns = [
    { title: "Title", field: "Name", type: "string" as const },
    { title: "Description", field: "Description", type: "string" as const },
  ];

  // const [id, setId] = React.useState(undefined)

  const viewHandler = (id) => {
    // view category
    history.push(`${sectionUrl}category/detail/${id}`)
  }
  const updateHandler = (id) => {
    // update category
    history.push(`${sectionUrl}category/${id}`)
  }
  const removeHandler = (id) => {
    // remove category
    mutate(id)
  }

  // get categories
  const { isLoading, isFetching, data: categories = [], isError, error } = useQuery("fetch-categories", splist("Category").fetchItems, {...fetchOptions})
  console.log("get request", categories, isLoading, isFetching, isError)

  // delete category
  const { data: delData, isLoading: delIsLoading, isError: delIsError, error: delError, mutate } = useMutation(splist("Category").deleteItem, {
    onSuccess: data => {
      console.log("Category Deleted Sucessfully: ", data)
      alert("success")
    },
    onError: (error) => {
      console.log("Error Deleting Category: ", error)
      alert("there was an error")
    },
    onSettled: () => {
      queryClient.invalidateQueries('fetch-categories');
    },

  })
  console.log("delete request", delData, delIsLoading, delIsError)


  let data = categories
  if (status) {
    data = categories.filter((d) => `${d.Status}`.toLowerCase() === `${status}`.toLowerCase())
    console.log("filtered data: ", data)
  }

  if (isLoading || delIsLoading) return (<div>Loading...</div>)
  if (isError || delIsError) toast.error(`${error || delError}`);

  // if (isLoading) return (<div>Loading...</div>)
  // if (isError) toast.error(`${error}`);

  return (
    <div className='background container'>
      <NavBar active='settings' section={section} />

      <div className='container--info'>
        <HeaderBar title={titleText} />
        <Toaster position="bottom-center" reverseOrder={false} />
        <div className="constainer--info">
          <Button
            title="Add Category"
            type="button"
            onClick={() => console.log("create category")}
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
