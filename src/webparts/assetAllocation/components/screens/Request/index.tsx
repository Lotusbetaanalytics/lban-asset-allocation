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
import { getDataIdAndTitle } from '../../../utils/listUtils';
import { goBack, handleSelectChange } from '../../../utils/formUtils';

const AssetRequest = ({section = ""}) => {
  const history = useHistory()
  const sectionUrl = `/app/${section ? section + "/" : ""}`

  const [errors, setErrors] = React.useState({} as any);
  const [formData, setFormData] = React.useState([])
  
  const branches = []
  const categories = []

  // get departments from sp list
  const { 
    isLoading: isDepartmentLoading,
    data: departments = [],
    isError: isDepartmentError,
    error: departmentError 
  } = useQuery("fetch-request", fetchDepartments, {
    enabled: false
  })

  const { isLoading, isFetching, data, isError, error } = useQuery("create-request", () => createAssetRequest(formData), {
    enabled: false
  })

  // // handle changes for select inputs, adding both the text value and id to formData
  // const handleSelectChange = (name, value, list) => {
  //   const { data, instance } = getDataIdAndTitle(name, value, list);
  //   setFormData({ ...formData, ...data });
  // };
  const handleChange = (name, value) => setFormData({ ...formData, [name]: value });
  const validationHandler = (name, error) => setErrors({ ...errors, [name]: error });
  const submitHandler = (e) => {
    history.push(`${sectionUrl}request/manage`)
  };

  if (isLoading || isDepartmentLoading) return (<div>Loading...</div>)
  if (isError || isDepartmentError) return toast.error(`${error || departmentError}`);

  return (
    <div className='background container'>
      <NavBar active='dashboard' />

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
            <Input
                name="Employee"
                label="Employee Name"
                value={formData["Employee"]}
                onChange={handleChange}
                type="text"
                // size="large"
                placeholder="Employee Name"
                className="br-xlg mb-2"
                labelClassName="ml-2"
                validationHandler={validationHandler}
                error={errors.Employee}
              />
              <Input
                name="EmployeeEmail"
                label="Employee Email"
                value={formData["EmployeeEmail"]}
                onChange={handleChange}
                type="text"
                // size="large"
                placeholder="Employee Email"
                className="br-xlg mb-2"
                labelClassName="ml-2"
                validationHandler={validationHandler}
                error={errors.EmployeeEmail}
              />
              <Input
                name="EmployeePhone"
                label="Employee Phone"
                value={formData["EmployeePhone"]}
                onChange={handleChange}
                type="text"
                // size="large"
                placeholder="Employee Phone"
                className="br-xlg mb-2"
                labelClassName="ml-2"
                validationHandler={validationHandler}
                error={errors.EmployeePhone}
              />
              <Select
                name="Department"
                label="Department"
                value={formData["Department"]}
                // onChange={handleChange}
                // onChange={(name, value) => handleSelectChange(name, value, departments)}
                onChange={(name, value) => handleSelectChange(name, value, departments, formData, setFormData)}
                data={departments}
                filter="Title"
                // filterValue="ID"
                filterValue="Title"
                // required={true}
                className="br-xlg mb-2"
                labelClassName="ml-2"
                validationHandler={validationHandler}
                error={errors.Department}
              />
              <Select
                name="Branch"
                label="Branch"
                value={formData["Branch"]}
                // onChange={handleChange}
                // onChange={(name, value) => handleSelectChange(name, value, branches)}
                onChange={(name, value) => handleSelectChange(name, value, branches, formData, setFormData)}
                data={branches}
                filter="Title"
                // filterValue="ID"
                filterValue="Title"
                // required={true}
                className="br-xlg mb-2"
                labelClassName="ml-2"
                validationHandler={validationHandler}
                error={errors.Branch}
              />
              <Select
                name="Category"
                label="Asset Category"
                value={formData["Category"]}
                // onChange={handleChange}
                // onChange={(name, value) => handleSelectChange(name, value, categories)}
                onChange={(name, value) => handleSelectChange(name, value, categories, formData, setFormData)}
                data={categories}
                filter="Title"
                // filterValue="ID"
                filterValue="Title"
                // required={true}
                className="br-xlg mb-2"
                labelClassName="ml-2"
                validationHandler={validationHandler}
                error={errors.Category}
              />
              <Textarea
                name="Description"
                label="Asset Description"
                value={formData["Description"]}
                onChange={handleChange}
                // side={true}
                size="medium"
                placeholder="Asset Description"
                className="br-xlg mb-2"
                labelClassName="ml-2"
                validationHandler={validationHandler}
                error={errors.Description}
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
                error={errors.Date}
              />
              <div className="container--side">
                
              </div>
              <Input
                name="DepartmentManager"
                label="Department Manager"
                value={formData["DepartmentManager"]}
                onChange={handleChange}
                type="text"
                // size="large"
                placeholder="Department Manager"
                className="br-xlg mb-2"
                labelClassName="ml-2"
                validationHandler={validationHandler}
                error={errors.DepartmentManager}
              />
              <Button
                title="Submit"
                loading={isLoading}
                disabled={isLoading}
                size="small"
                // bgColor="bg-purple"
                className="btn--purple br-xlg mr-2"
              />
              <Button
                title="Clear"
                type="button"
                onClick={() => history.goBack()}
                // onClick={() => history.back()}  // goes to previous page
                // loading={isLoading}
                // disabled={isLoading}
                size="small"
                // bgColor="bg-purple"
                className="btn br-xlg mr-auto"
              />
          </FormGroup>
        </div>
      </div>
    </div>
  )
}

export default AssetRequest