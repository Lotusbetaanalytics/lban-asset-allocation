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
import { defaultPropValidation } from '../../../utils/componentUtils';
import { fetchOptions } from '../../hooks/queryOptions';

const Asset = ({section = ""}) => {
  const history = useHistory()
  const { id } = useParams()
  const queryClient = useQueryClient();

  const sectionUrl = `/app/${section ? section + "/" : ""}`
  const departmentQuery = {"ManagerId": "ManagerId"}

  const [errors, setErrors] = React.useState({} as any);
  const [formData, setFormData] = React.useState({})
  const [pageData, setpageData] = React.useState({})

  const actionFunction = (id = undefined, formData = {}) => {
    if (id) return splist("Asset").updateItem(id, formData)
    return splist("Asset").createItem(formData)
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
    error: categoryError,
  } = useQuery("fetch-categories", () => splist("Category").fetchItems(), {...fetchOptions})

  // get asset from sp list using id
  const {
    isLoading: isAssetLoading,
    data: asset = {},
    isError: isAssetError,
    error: assetError ,
  } = useQuery(["fetch-asset", id], () => splist("Asset").fetchItem(id), {
    ...fetchOptions,
    onSuccess: (data) => setFormData({...data}),
    onError: (error) => console.log("error getting asset using id: ", error),
  })
  console.log({isAssetLoading, asset})

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
    // refetch()
    mutate(id, formData)
    history.push(`${sectionUrl}asset/manage/all`)
  };

  console.log({formData})

  if (isLoading || isDepartmentLoading || isBranchLoading || isCategoryLoading || isAssetLoading) return (<div>Loading...</div>)
  if (isError || isDepartmentError || isBranchError || isCategoryError) toast.error(`${error || departmentError || branchError || categoryError}`);
  if (id && isAssetError) toast.error(`${assetError}`)

  return (
    <div className='background container'>
      <NavBar active='asset' />

      <div className='container--info'>
        <HeaderBar title='Asset Request Form' hasBackButton={true} />
        <Toaster position="bottom-center" reverseOrder={false} />

        <div className='container--form py-6'>
          <FormGroup
            onSubmit={submitHandler}
            validation={formData}
            errors={""}
            setErrors={""} 
          >
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
            <Input
              name="Name"
              label="Asset Name"
              value={formData["Name"]}
              onChange={handleChange}
              type="text"
              placeholder="Asset Name"
              className="br-xlg mb-2"
              labelClassName="ml-2"
              validationHandler={validationHandler}
              error={errors["Name"]}
            />
            <Input
              name="SerialNumber"
              label="Serial Number"
              value={formData["SerialNumber"]}
              onChange={handleChange}
              type="text"
              placeholder="Serial Number"
              className="br-xlg mb-2"
              labelClassName="ml-2"
              validationHandler={validationHandler}
              error={errors["SerialNumber"]}
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
            {/* <div className="container--side"></div> */}
            <Button
              title={id ? "Update" : "Submit"}
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

Asset.propTypes = defaultPropValidation

export default Asset