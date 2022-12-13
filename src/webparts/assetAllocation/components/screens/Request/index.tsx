import * as React from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useHistory, useParams } from 'react-router-dom'
import {
  Input,
  Select,
  Button,
  Radio,
  DateInput,
  FormGroup,
  Textarea,
} from "mtforms";
import "mtforms/dist/index.css";
import toast, { Toaster } from "react-hot-toast";
import { HeaderBar, NavBar } from '../../containers';
import { createAssetRequest } from '../../hooks/requestHooks';
import { fetchDepartments } from '../../hooks/departmentHooks';
import { getDataIdAndTitle, getStaffById } from '../../../utils/listUtils';
import { goBack, handleSelectChange } from '../../../utils/formUtils';
import splist from '../../hooks/splistHook';
import { findDataById } from "../../../utils/listUtils";
import { fetchOptions } from '../../hooks/queryOptions';
import { defaultPropValidation } from '../../../utils/componentUtils';

const AssetRequest = ({status = undefined, section = ""}) => {
  const history = useHistory()
  const { id } = useParams()
  const queryClient = useQueryClient();

  const sectionUrl = `/app/${section ? section + "/" : ""}`
  const departmentQuery = {"ManagerId": "ManagerId"}

  const [errors, setErrors] = React.useState({} as any);
  const [formData, setFormData] = React.useState({})
  const [pageData, setpageData] = React.useState({})

  const actionFunction = (id = undefined, formData = {}) => {
    // createAssetRequest(formData)
    if (id) return splist("AssetRequest").updateItem(id, formData)
    return splist("AssetRequest").createItem(formData)
  }

  // get departments from sp list
  const { 
    isLoading: isDepartmentLoading,
    data: departments = [],
    isError: isDepartmentError,
    error: departmentError 
  } = useQuery("fetch-departments", fetchDepartments, {...fetchOptions})

  // get branches from sp list
  const { 
    isLoading: isBranchLoading,
    data: branches = [],
    isError: isBranchError,
    error: branchError 
  } = useQuery("fetch-branches", () => splist("Branch").fetchItems(), {...fetchOptions})

  // get categories from sp list
  const { 
    isLoading: isCategoryLoading,
    data: categories = [],
    isError: isCategoryError,
    error: categoryError 
  } = useQuery("fetch-categories", () => splist("Category").fetchItems(), {...fetchOptions})

  // get asset request from sp list using id
  const {
    isLoading: isRequestLoading,
    data: request = {},
    isError: isRequestError,
    error: requestError ,
  } = useQuery(["fetch-request", id], () => splist("AssetRequest").fetchItem(id), {
    ...fetchOptions,
    onSuccess: (data) => {
      try {
        // TODO: Properly Display (set) Manager Name
        const dept = findDataById(data["DepartmentIdId"], departments)
        data["ManagerId"] = dept?.Manager
      } catch (error) {
        toast.error(error)
      }
      setFormData({...data})
    },
    onError: (error) => console.log("error getting request using id: ", error),
  })
  console.log({isRequestLoading, request})

  const { data, isLoading, isError, error, mutate } = useMutation(actionFunction, {
    onSuccess: data => {
      console.log("Asset Created Sucessfully: ", data)
      alert("success")
    },
    onError: (error) => {
      console.log("Error Creating Asset: ", error)
      alert("there was an error")
    },
    onSettled: () => {
      queryClient.invalidateQueries('fetch-assets');
    },
  })

  // const { isLoading, isFetching, data, isError, error, refetch } = useQuery("create-request", () => actionFunction(), {
  //   enabled: false,
  //   staleTime: Infinity,
  //   onError: (error) => console.log("Error Creating Asset Request: ", error),
  //   onSuccess: (data) => console.log("Asset Request Created Sucessfully: ", data),
  // })
  // console.log("isFetching, data: ", isFetching, data)

  // TODO: fix getting manager details using their staff id (getStaffById is async)
  if (formData["ManagerId"]) {
    // TODO: Properly Display (set) Manager Name
    setpageData({"DepartmentManager": getStaffById(formData["ManagerId"])})
    formData["ManagerId"] = undefined
  }

  // // handle changes for select inputs, adding both the text value and id to formData
  // const handleSelectChange = (name, value, list) => {
  //   const { data, instance } = getDataIdAndTitle(name, value, list);
  //   setFormData({ ...formData, ...data });
  // };
  const handleChange = (name, value) => setFormData({ ...formData, [name]: value });
  const validationHandler = (name, error) => setErrors({ ...errors, [name]: error });
  const submitHandler = (e) => {
    formData["ManagerId"] = undefined  // ? confirm this works
    formData["DepartmentManager"] = undefined  // ? confirm this works
    // refetch()
    mutate(id, formData)
    history.push(`${sectionUrl}request/manage`)
  };

  if (isLoading || isDepartmentLoading || isBranchLoading || isCategoryLoading || (isRequestLoading && id)) return (<div>Loading...</div>)
  if (isError || isDepartmentError || isBranchError || isCategoryError) toast.error(`${error || departmentError || branchError || categoryError}`);
  if (id && isRequestError) toast.error(`${requestError}`)

  return (
    <div className='background container'>
      <NavBar active={status?.toLowerCase() || "pending"} section={section} />

      <div className='container--info'>
        <HeaderBar title='Asset Request Form' hasBackButton={true} />
        <Toaster position="bottom-center" reverseOrder={false} />

        <div className='container--form py-6'>
          <FormGroup
            onSubmit={submitHandler}
            // validation={formData}
            // errors={""}
            // setErrors={""} 
          >
            <Input
                name="Employee"
                label="Employee Name"
                value={formData["Employee"]}
                onChange={handleChange}
                type="text"
                placeholder="Employee Name"
                className="br-xlg mb-2"
                labelClassName="ml-2"
                validationHandler={validationHandler}
                error={errors["Employee"]}
              />
              <Input
                name="EmployeeEmail"
                label="Employee Email"
                value={formData["EmployeeEmail"]}
                onChange={handleChange}
                type="text"
                placeholder="Employee Email"
                className="br-xlg mb-2"
                labelClassName="ml-2"
                validationHandler={validationHandler}
                error={errors["EmployeeEmail"]}
              />
              <Input
                name="EmployeePhone"
                label="Employee Phone"
                value={formData["EmployeePhone"]}
                onChange={handleChange}
                type="text"
                placeholder="Employee Phone"
                className="br-xlg mb-2"
                labelClassName="ml-2"
                validationHandler={validationHandler}
                error={errors["EmployeePhone"]}
              />
              <Select
                name="Department"
                label="Department"
                value={formData["Department"]}
                // onChange={(name, value) => handleSelectChange(name, value, departments)}
                onChange={(name, value) => handleSelectChange(name, value, departments, formData, setFormData, departmentQuery)}
                data={departments}
                filter="Title"
                // filterValue="ID"
                filterValue="Title"
                required={true}
                className="br-xlg mb-2"
                labelClassName="ml-2"
                validationHandler={validationHandler}
                error={errors["Department"]}
              />
              <Select
                name="Branch"
                label="Branch"
                value={formData["Branch"]}
                // onChange={(name, value) => handleSelectChange(name, value, branches)}
                onChange={(name, value) => handleSelectChange(name, value, branches, formData, setFormData)}
                data={branches}
                filter="Title"
                // filterValue="ID"
                filterValue="Title"
                required={true}
                className="br-xlg mb-2"
                labelClassName="ml-2"
                validationHandler={validationHandler}
                error={errors["Branch"]}
              />
              <Select
                name="Category"
                label="Asset Category"
                value={formData["Category"]}
                // onChange={(name, value) => handleSelectChange(name, value, categories)}
                onChange={(name, value) => handleSelectChange(name, value, categories, formData, setFormData)}
                data={categories}
                filter="Title"
                // filterValue="ID"
                filterValue="Title"
                required={true}
                className="br-xlg mb-2"
                labelClassName="ml-2"
                validationHandler={validationHandler}
                error={errors["Category"]}
              />
              <Textarea
                name="Description"
                label="Asset Description"
                value={formData["Description"]}
                onChange={handleChange}
                size="medium"
                placeholder="Asset Description"
                className="br-xlg mb-2"
                labelClassName="ml-2"
                validationHandler={validationHandler}
                error={errors["Description"]}
              />
              <DateInput
                name="Date"
                label="Request Date"
                value={formData["Date"]}
                onChange={handleChange}
                type="text"
                // required={true}
                placeholder="Request Date"
                className="br-xlg mb-2"
                labelClassName="ml-2"
                validationHandler={validationHandler}
                error={errors["Date"]}
              />
              <div className="container--side"></div>
              <Input
                name="DepartmentManager"
                label="Department Manager"
                value={pageData["DepartmentManager"]}
                onChange={handleChange}
                type="text"
                placeholder="Department Manager"
                className="br-xlg mb-2"
                labelClassName="ml-2"
                validationHandler={validationHandler}
                error={errors["DepartmentManager"]}
              />
              <Button
                title="Submit"
                loading={isLoading}
                disabled={isLoading}
                size="small"
                className="btn--purple br-xlg mr-2"
              />
              <Button
                title="Clear"
                type="button"
                onClick={() => history.goBack()}
                // onClick={() => history.back()}  // goes to previous page
                size="small"
                className="btn br-xlg mr-auto"
              />
          </FormGroup>
        </div>
      </div>
    </div>
  )
}

AssetRequest.propTypes = defaultPropValidation

export default AssetRequest