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

const AssetRequest = () => {
  const [formData, setFormData] = React.useState([])
  const {isLoading, data, error} = useQuery('asset-request', () => {})

  const handleChange = (name, value) => setFormData({ ...formData, [name]: value })
  const submitHandler = (e) => {}

  if (isLoading) return (<div>Loading...</div>)

  return (
    <div>
      Asset Request
      <div className="">
        <FormGroup
          onSubmit={submitHandler}
          validation={formData}
          errors={""}
          setErrors={""} 
        >

        </FormGroup>
      </div>
    </div>
  )
}

export default AssetRequest