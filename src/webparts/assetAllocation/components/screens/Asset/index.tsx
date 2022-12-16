import * as React from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useHistory, useParams } from 'react-router-dom'
import {
  Input,
  Select,
  Button,
  DateInput,
  FormGroup,
  Textarea,
} from "mtforms";
import "mtforms/dist/index.css";
import toast, { Toaster } from "react-hot-toast";
import { HeaderBar, LoadingSpinner, NavBar } from '../../containers';
import { fetchDepartments } from '../../hooks/departmentHooks';
import { goBack, handleSelectChange } from '../../../utils/formUtils';
import splist from '../../hooks/splistHook';
import { defaultPropValidation } from '../../../utils/componentUtils';
import { fetchOptions } from '../../hooks/queryOptions';

const Asset = ({section = ""}) => {
  const history = useHistory()
  const { id } = useParams()
  const queryClient = useQueryClient();

  const sectionUrl = `/app/${section ? section + "/" : ""}`
  const titleText = id ? "Update Asset" : "Add Asset"

  const [errors, setErrors] = React.useState({} as any);
  const [formData, setFormData] = React.useState({})
  // const [pageData, setpageData] = React.useState({})

  const actionFunction = (formData, id = undefined) => {
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
    // onError: (error) => console.log("error getting asset using id: ", error),
  })
  console.log({isAssetLoading, asset})

  const { data, isLoading, isError, error, mutate } = useMutation(actionFunction, {
    onSuccess: data => {
      console.log("Asset Created Sucessfully: ", data)
      toast.success("Asset Created Sucessfully")
    },
    onError: (error) => {
      console.log("Error Creating Asset: ", error)
      toast.error("Error Creating Asset")
    },
    onSettled: () => {
      queryClient.invalidateQueries('fetch-assets');
    },
  })

  const handleChange = (name, value) => setFormData({ ...formData, [name]: value });
  const validationHandler = (name, error) => setErrors({ ...errors, [name]: error });
  const submitHandler = (e) => {
    mutate(formData, id)
    history.push(`${sectionUrl}asset/manage`)
  };

  // console.log({formData})

  if (isLoading || isDepartmentLoading || isBranchLoading || isCategoryLoading || isAssetLoading) return (<LoadingSpinner />)
  if (isError || isDepartmentError || isBranchError || isCategoryError) toast.error(`${error || departmentError || branchError || categoryError}`);
  if (id && isAssetError) toast.error(`${assetError}`)

  return (
    <div className='background container'>
      <NavBar active='asset' section={section} />

      <div className='container--info'>
        <HeaderBar title={titleText} hasBackButton={true} />
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