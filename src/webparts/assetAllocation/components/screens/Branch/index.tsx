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
// import { createBranchRequest } from '../../hooks/requestHooks';
// import { fetchDepartments } from '../../hooks/departmentHooks';
// import { getDataIdAndTitle, getStaffById } from '../../../utils/listUtils';
import { goBack, handleSelectChange } from '../../../utils/formUtils';
import splist from '../../hooks/splistHook';
import { defaultPropValidation } from '../../../utils/componentUtils';
import { fetchOptions } from '../../hooks/queryOptions';
import { locationHelper } from '../../containers/FormHelpers/OptionHelpers';

const Branch = ({section = ""}) => {
  const history = useHistory()
  const { id } = useParams()
  const queryClient = useQueryClient();

  const sectionUrl = `/app/${section ? section + "/" : ""}`
  // const departmentQuery = {"ManagerId": "ManagerId"}

  const [errors, setErrors] = React.useState({} as any);
  const [formData, setFormData] = React.useState({})
  // const [pageData, setpageData] = React.useState({})

  const actionFunction = (id = undefined, formData = {}) => {
    if (id) return splist("Branch").updateItem(id, formData)
    return splist("Branch").createItem(formData)
  }

  // get branch from sp list using id
  const {
    isLoading: isBranchLoading,
    data: branch = {},
    isError: isBranchError,
    error: branchError ,
  } = useQuery(["fetch-branch", id], () => splist("Branch").fetchItem(id), {
    ...fetchOptions,
    onSuccess: (data) => setFormData({...data}),
    onError: (error) => console.log("error getting branch using id: ", error),
  })
  console.log({isBranchLoading, branch})

  const { data, isLoading, isError, error, mutate } = useMutation(actionFunction, {
    onSuccess: data => {
      console.log("Branch Created Sucessfully: ", data)
      alert("success")
    },
    onError: (error) => {
      console.log("Error Creating Branch: ", error)
      alert("there was an error")
    },
    onSettled: () => {
      queryClient.invalidateQueries('fetch-branches');
    },
  })

  const handleChange = (name, value) => setFormData({ ...formData, [name]: value });
  const validationHandler = (name, error) => setErrors({ ...errors, [name]: error });
  const submitHandler = (e) => {
    mutate(id, formData)
    history.push(`${sectionUrl}branch/manage`)
  };

  console.log({formData})

  if (isLoading) return (<div>Loading...</div>)
  if (isError) toast.error(`${error}`);
  if (id && isBranchError) toast.error(`${branchError}`)

  return (
    <div className='background container'>
      <NavBar active='branch' />

      <div className='container--info'>
        <HeaderBar title='Branch Request Form' hasBackButton={true} />
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
              label="Branch Name"
              value={formData["Title"]}
              onChange={handleChange}
              type="text"
              placeholder="Branch Name"
              className="br-xlg mb-2"
              labelClassName="ml-2"
              validationHandler={validationHandler}
              error={errors["Title"]}
            />
            {/* <Select
              name="Location"
              label="Branch Location"
              value={formData["Location"]}
              onChange={handleChange}
              data={locationHelper}
              filter="value"
              // filterValue="ID"
              filterValue="value"
              required={true}
              className="br-xlg mb-2"
              labelClassName="ml-2"
              validationHandler={validationHandler}
              error={errors["Location"]}
            /> */}
            <Input
              name="Location"
              label="Branch Location"
              value={formData["Location"]}
              onChange={handleChange}
              type="text"
              placeholder="Branch Location"
              className="br-xlg mb-2"
              labelClassName="ml-2"
              validationHandler={validationHandler}
              error={errors["Location"]}
            />
            <Textarea
              name="Address"
              label="Branch Address"
              value={formData["Address"]}
              onChange={handleChange}
              size="medium"
              placeholder="Branch Address"
              className="br-xlg mb-2"
              labelClassName="ml-2"
              validationHandler={validationHandler}
              error={errors["Address"]}
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

Branch.propTypes = defaultPropValidation

export default Branch