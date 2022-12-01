import * as React from 'react'
import { useQuery } from 'react-query'
import { useHistory } from 'react-router-dom'
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

const Asset = ({section = ""}) => {
  const history = useHistory()
  const sectionUrl = `/app/${section ? section + "/" : ""}`
  const departmentQuery = {"ManagerId": "ManagerId"}

  const [errors, setErrors] = React.useState({} as any);
  const [formData, setFormData] = React.useState({})
  const [pageData, setpageData] = React.useState({})

  // get departments from sp list
  const { 
    isLoading: isDepartmentLoading,
    data: departments = [],
    isError: isDepartmentError,
    error: departmentError 
  } = useQuery("fetch-departments", fetchDepartments, {})

  // get branches from sp list
  const { 
    isLoading: isBranchLoading,
    data: branches = [],
    isError: isBranchError,
    error: branchError 
  } = useQuery("fetch-branches", () => splist("Branch").fetchItems(), {})

  // get categories from sp list
  const { 
    isLoading: isCategoryLoading,
    data: categories = [],
    isError: isCategoryError,
    error: categoryError 
  } = useQuery("fetch-categories", () => splist("Category").fetchItems(), {})

  const { isLoading, isFetching, data, isError, error, refetch } = useQuery("create-request", () => splist("Asset").createItem(formData), {
    enabled: false,
    onError: (error) => console.log("Error Creating Asset Request: ", error),
    onSuccess: (data) => console.log("Asset Request Created Sucessfully: ", data),
  })
  console.log("isFetching, data: ", isFetching, data)

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
    refetch()
    history.push(`${sectionUrl}asset/manage`)
  };

  if (isLoading || isDepartmentLoading || isBranchLoading || isCategoryLoading) return (<div>Loading...</div>)
  if (isError || isDepartmentError || isBranchError || isCategoryError) toast.error(`${error || departmentError || branchError || categoryError}`);

  return (
    <div className='background container'>
      <NavBar active='asset' />

      <div className='container--info'>
        <HeaderBar title='Asset Request Form' />
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

export default Asset