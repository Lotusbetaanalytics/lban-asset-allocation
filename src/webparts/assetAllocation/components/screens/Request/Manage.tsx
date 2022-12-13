import * as React from "react";
import { HeaderBar, NavBar } from "../../containers";
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useHistory } from 'react-router-dom';
import toast, { Toaster } from "react-hot-toast";
import { fetchAssetRequests } from '../../hooks/requestHooks';
import RequestTable from "../../containers/RequestTable";
import splist from "../../hooks/splistHook";
import { fetchOptions } from "../../hooks/queryOptions";
import { defaultPropValidation } from "../../../utils/componentUtils";
import { getMyProfile } from "../../../utils/listUtils";
import { titleCase } from "../../../utils/formUtils";

const Manage = ({status = undefined, section = ""}) => {
  const history = useHistory()
  const queryClient = useQueryClient();

  const titleText = `${status ? status : "Manage"} Requests`
  const sectionUrl = `/app/${section ? section + "/" : ""}`
  // let authUser

  const [id, setId] = React.useState(undefined)

  const viewHandler = (id) => {
    // view asset request
    history.push(`${sectionUrl}request/detail/${id}`)
  }
  const updateHandler = (id) => {
    // update asset request
    history.push(`${sectionUrl}request/${id}`)
  }
  const removeHandler = (id) => {
    // remove asset request
    setId(id)
    // refetch()
    mutate(id)
  }

  const filterData = data => {
    if (status) {
      const titledStatus = titleCase(status)
      data = data.filter((i) => i.Status == titledStatus)
    }
    if (section == "employee" && authUser) data = data.filter((i) => i.EmployeeEmail == authUser?.Email)
    console.log("filtering attempted", status, section)
    return data
  }

  const { data: authUser = {Email: undefined}, isError: isAuthError, error: authError } = useQuery("fetch-auth-user", getMyProfile, {...fetchOptions})
  console.log({authUser, isAuthError, authError})

  const { isLoading, isFetching, data: requests = [], isError, error } = useQuery("fetch-requests", fetchAssetRequests, {...fetchOptions, select: filterData})
  console.log(requests, isLoading, isFetching, isError)

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

  // const { isLoading: delIsLoading, isFetching: delIsFetching, data: delData, isError: delIsError, error: delError, refetch } = useQuery("fetch-requests", () => splist("AssetRequest").deleteItem(id), {
  //   enabled: false,
  //   staleTime: Infinity,
  //   onError: (error) => console.log("Error Deleting Asset Request: ", error),
  //   onSuccess: (data) => console.log("Asset Request Deleted Sucessfully: ", data),
  // })
  // console.log("delete request", delData, isLoading, delIsFetching, delIsError)

  let data = requests
  if (status) {
    data = requests.filter((d) => {
      console.log({status, "d.Status": d.Status, "filtered data": data, "is true": `${d.Status}`.toLowerCase() === `${status}`.toLowerCase()})
      return `${d.Status}`.toLowerCase() === `${status}`.toLowerCase()
    })
  }
  // TODO: filter by authenticated user Id
  // if (authUser.ID && (section == "employee")) {
  //   data = data.filter((d) => {
  //     console.log({authUser.ID, "d.Status": d.Status, "filtered data": data, "is true": `${d.Status}`.toLowerCase() === `${authUser.ID}`.toLowerCase()})
  //     return `${d.Status}`.toLowerCase() === `${authUser.ID}`.toLowerCase()
  //   })
  // }

  if (isLoading || delIsLoading) return (<div>Loading...</div>)
  if (isError || delIsError) toast.error(`${error || delError}`);

  return (
    <div className='background container'>
      <NavBar active={status?.toLowerCase() || "all"} section={section} />

      <div className='container--info'>
        <HeaderBar title={titleText} />
        <Toaster position="bottom-center" reverseOrder={false} />
        
        <div className='container--form'>
          <RequestTable data={data} viewHandler={viewHandler} updateHandler={updateHandler} removeHandler={removeHandler} />
        </div>
      </div>
    </div>
  );
};

Manage.propTypes = defaultPropValidation

export default Manage;
