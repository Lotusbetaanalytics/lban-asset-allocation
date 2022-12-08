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
// import { createCategoryRequest } from '../../hooks/requestHooks';
import { fetchDepartments } from '../../hooks/departmentHooks';
// import { getDataIdAndTitle, getStaffById } from '../../../utils/listUtils';
import { goBack, handleSelectChange } from '../../../utils/formUtils';
import splist from '../../hooks/splistHook';
import { defaultPropValidation } from '../../../utils/componentUtils';
import { fetchOptions } from '../../hooks/queryOptions';

const Category = ({section = ""}) => {
  const history = useHistory()
  const { id } = useParams()
  const queryClient = useQueryClient();

  const sectionUrl = `/app/${section ? section + "/" : ""}`
  // const departmentQuery = {"ManagerId": "ManagerId"}

  const [errors, setErrors] = React.useState({} as any);
  const [formData, setFormData] = React.useState({})
  // const [pageData, setpageData] = React.useState({})

  const actionFunction = (id = undefined, formData = {}) => {
    if (id) return splist("Category").updateItem(id, formData)
    return splist("Category").createItem(formData)
  }

  // get category from sp list using id
  const {
    isLoading: isCategoryLoading,
    data: category = {},
    isError: isCategoryError,
    error: categoryError ,
  } = useQuery(["fetch-category", id], () => splist("Category").fetchItem(id), {
    ...fetchOptions,
    onSuccess: (data) => setFormData({...data}),
    onError: (error) => console.log("error getting category using id: ", error),
  })
  console.log({isCategoryLoading, category})

  // update or create category
  const { data, isLoading, isError, error, mutate } = useMutation(actionFunction, {
    onSuccess: data => {
      console.log("Category Created Sucessfully: ", data)
      alert("success")
    },
    onError: (error) => {
      console.log("Error Creating Category: ", error)
      alert("there was an error")
    },
    onSettled: () => {
      queryClient.invalidateQueries('fetch-categories');
    },
  })

  const handleChange = (name, value) => setFormData({ ...formData, [name]: value });
  const validationHandler = (name, error) => setErrors({ ...errors, [name]: error });
  const submitHandler = (e) => {
    mutate(id, formData)
    history.push(`${sectionUrl}category/manage`)
  };

  console.log({formData})

  if (isLoading || isCategoryLoading) return (<div>Loading...</div>)
  if (isError) toast.error(`${error}`);
  if (id && isCategoryError) toast.error(`${categoryError}`)

  return (
    <div className='background container'>
      <NavBar active='settings' />

      <div className='container--info'>
        <HeaderBar title='Category Request Form' hasBackButton={true} />
        <Toaster position="bottom-center" reverseOrder={false} />

        <div className='container--form py-6'>
          <FormGroup
            onSubmit={submitHandler}
            validation={formData}
            errors={""}
            setErrors={""} 
          >
            <Input
              name="Title"
              label="Category Name"
              value={formData["Title"]}
              onChange={handleChange}
              type="text"
              placeholder="Category Name"
              className="br-xlg mb-2"
              labelClassName="ml-2"
              validationHandler={validationHandler}
              error={errors["Title"]}
            />
            <Textarea
              name="Description"
              label="Category Description"
              value={formData["Description"]}
              onChange={handleChange}
              size="medium"
              placeholder="Category Description"
              className="br-xlg mb-2"
              labelClassName="ml-2"
              validationHandler={validationHandler}
              error={errors["Description"]}
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

Category.propTypes = defaultPropValidation

export default Category