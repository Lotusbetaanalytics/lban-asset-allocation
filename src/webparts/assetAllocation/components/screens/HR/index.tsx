import * as React from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useHistory, useParams } from 'react-router-dom'
import {
  Button,
  FormGroup,
} from "mtforms";
import "mtforms/dist/index.css";
import toast, { Toaster } from "react-hot-toast";
import { HeaderBar, NavBar } from '../../containers';
import splist from '../../hooks/splistHook';
import { defaultPropValidation } from '../../../utils/componentUtils';
import { fetchOptions } from '../../hooks/queryOptions';
import {
  PeoplePicker,
  PrincipalType,
} from "@pnp/spfx-controls-react/lib/PeoplePicker";

const HRManager = ({context, section = ""}) => {
  const history = useHistory()
  const { id } = useParams()
  const queryClient = useQueryClient();

  const sectionUrl = `/app/${section ? section + "/" : ""}`
  const titleText = id ? "Update HR Manager" : "Add HR Manager"

  const [formData, setFormData] = React.useState({})

  const actionFunction = (formData, id = undefined) => {
    if (id) return splist("HRManager").updateItem(id, formData)
    return splist("HRManager").createItem(formData)
  }

  // get hrManager from sp list using id
  const {
    isLoading: isHRLoading,
    data: hrManager = {},
    isError: isHRError,
    error: HRError ,
  } = useQuery(["fetch-hr-manager", id], () => splist("HRManager").fetchItem(id), {
    ...fetchOptions,
    onSuccess: (data) => setFormData({...data}),
    // onError: (error) => console.log("error getting hrManager using id: ", error),
  })
  // console.log({isHRLoading, hrManager})

  const { data, isLoading, isError, error, mutate } = useMutation(actionFunction, {
    onSuccess: data => {
      console.log("HR Manager Created Sucessfully: ", data)
      toast.success("HR Manager Deleted Sucessfully")
    },
    onError: (error) => {
      console.log("Error Creating HRManager: ", error)
      toast.error("Error Creating HR Manager")
    },
    onSettled: () => {
      queryClient.invalidateQueries('fetch-hr-managers');
    },
  })

  function getPeoplePickerItems(items: any[]) {
    // console.log({items})
    setFormData({
      ...formData,
      Title: items[0].text,
      Name: items[0].text,
      Email: items[0].secondaryText,
    });
  }

  // const handleChange = (name, value) => setFormData({ ...formData, [name]: value });
  // const validationHandler = (name, error) => setErrors({ ...errors, [name]: error });
  const submitHandler = (e) => {
    mutate(formData, id)
    history.push(`${sectionUrl}hr/manage`)
  };

  // console.log({formData})

  if (isLoading || isHRLoading) return (<div>Loading...</div>)
  if (isError) toast.error(`${error}`);
  if (id && isHRError) toast.error(`${HRError}`)

  return (
    <div className='background container'>
      <NavBar active='settings' section={section} />

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
            <PeoplePicker
              context={context}
              titleText="HR Manager"
              personSelectionLimit={1}
              groupName="" // Leave this blank in case you want to filter from all users
              showtooltip={true}
              required={true}
              disabled={false}
              onChange={getPeoplePickerItems}
              showHiddenInUI={false}
              principalTypes={[PrincipalType.User]}
              resolveDelay={1000}
              peoplePickerCntrlclassName="people-picker__input"
              peoplePickerWPclassName='m-4'
              // errorMessageClassName='people-picker__input'
            />
            <div className="container--side"></div>
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
              size="small"
              className="btn br-xlg mr-auto"
            />
          </FormGroup>
        </div>
      </div>
    </div>
  )
}

HRManager.propTypes = defaultPropValidation

export default HRManager