import * as React from 'react'
import { useQuery } from 'react-query'
import {
  Input,
  Select,
  Button,
  // Radio,
  // DateInput,
  FormGroup,
  // Textarea,
} from "mtforms";
import { HeaderBar, NavBar } from '../../containers';

const AssetRequest = () => {
  const [formData, setFormData] = React.useState([])
  // const {isLoading, data, error} = useQuery('asset-request', () => {})

  const handleChange = (name, value) => setFormData({ ...formData, [name]: value })
  const submitHandler = (e) => {}

  // if (isLoading) return (<div>Loading...</div>)

  return (
    <div className='background container'>
      <NavBar active='dashboard' />

      <div className='container--info'>
        <HeaderBar title='Requests' />

        <div className='container--form'>
          <FormGroup
            onSubmit={submitHandler}
            validation={formData}
            errors={""}
            setErrors={""} 
          >

          </FormGroup>
        </div>
      </div>
    </div>
  )
}

export default AssetRequest