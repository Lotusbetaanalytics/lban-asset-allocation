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

const OfficeManager = ({context, section = ""}) => {
  const history = useHistory()
  const { id } = useParams()
  const queryClient = useQueryClient();

  const sectionUrl = `/app/${section ? section + "/" : ""}`
  const titleText = id ? "Update Office Manager" : "Add Office Manager"


  const [formData, setFormData] = React.useState({})

  const actionFunction = (formData, id = undefined) => {
    if (id) return splist("OfficeManager").updateItem(id, formData)
    return splist("OfficeManager").createItem(formData)
  }

  // get officeManager from sp list using id
  const {
    isLoading: isOMLoading,
    data: officeManager = {},
    isError: isOMError,
    error: OMError ,
  } = useQuery(["fetch-office-manager", id], () => splist("OfficeManager").fetchItem(id), {
    ...fetchOptions,
    onSuccess: (data) => setFormData({...data}),
    // onError: (error) => console.log("error getting officeManager using id: ", error),
  })
  // console.log({isOMLoading, officeManager})

  const { data, isLoading, isError, error, mutate } = useMutation(actionFunction, {
    onSuccess: data => {
      console.log("Office Manager Created Sucessfully: ", data)
      toast.success("Office Manager Deleted Sucessfully")
    },
    onError: (error) => {
      console.log("Error Creating OfficeManager: ", error)
      toast.error("Error Creating Office Manager")
    },
    onSettled: () => {
      queryClient.invalidateQueries('fetch-office-managers');
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
    history.push(`${sectionUrl}om/manage`)
  };

  // console.log({formData})

  if (isLoading || isOMLoading) return (<div>Loading...</div>)
  if (isError) toast.error(`${error}`);
  if (id && isOMError) toast.error(`${OMError}`)

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
              titleText="Office Manager"
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

OfficeManager.propTypes = defaultPropValidation

export default OfficeManager