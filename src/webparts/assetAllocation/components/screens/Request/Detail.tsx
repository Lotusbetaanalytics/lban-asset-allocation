import * as React from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { useQuery } from "react-query";
import { ParsedQuery } from "query-string";
import {
  // Input,
  // Select,
  Button,
  // Radio,
  // DateInput,
  // FormGroup,
  // Textarea,
} from "mtforms";
import "mtforms/dist/index.css";
import toast, { Toaster } from "react-hot-toast";
import { HeaderBar, NavBar, DetailItem } from "../../containers";
import splist from "../../hooks/splistHook";
import { defaultPropValidation } from "../../../utils/componentUtils";
import { fetchOptions } from "../../hooks/queryOptions";

const Detail = ({status = undefined, section = ""}) => {
  const { id } = useParams();
  const history = useHistory();
  const sectionUrl = `/app/${section ? section + "/" : ""}`

  const [errors, setErrors] = React.useState({} as any);
  const [formData, setFormData] = React.useState({})

  const handleChange = (name, value) => setFormData({ ...formData, [name]: value });
  const validationHandler = (name, error) => setErrors({ ...errors, [name]: error });
  const options = {
    name: "address",
    label: "Address",
    value: formData["address"],
    onChange: handleChange,
    validationHandler: validationHandler,
    error: errors.address,
    required: true,
    size: "large"    ,
  }
  // const goBack = () => history.goBack()

  console.log(id)
  console.log(section)
  const { isLoading, isFetching, data: request = {}, isError, error } = useQuery(["fetch-request", id], () => splist("AssetRequest").fetchItem(id), {...fetchOptions})

  const actions = () => {
    if (request["Status"] && request["Status"].toLowerCase() == "pending") {
      return (
        <Button
          title="Assign Asset"
          type="button"
          onClick={() => history.push(`${sectionUrl}request/${id}`)}
          // onClick={() => history.back()}  // goes to previous page
          size="small"
          // className="btn br-xlg w-8 bg-purple"
          className="btn--purple br-xlg mr-auto"
        />
      )
    }
  }

  if (isLoading || isFetching) return (<div>Loading...</div>)
  if (isError) toast.error(`${error}`);


  return (
    <div className='background container'>
      <NavBar active={status.toLowerCase() || "pending"} section={section} />

      <div className='container--info'>
        <HeaderBar title='Request Detail' hasBackButton={true} />
        <Toaster position="bottom-center" reverseOrder={false} />

        <div className='container--form'>
          {/* <Button
            title="Back"
            type="button"
            onClick={() => history.goBack()}
            // onClick={() => history.back()}  // goes to previous page
            size="small"
            className="btn br-xlg w-8 bg-light-grey2"
          /> */}

          <div className="container--details">
            <DetailItem heading={"Employee Name"} body={request["Employee"] || "test"} />
            <DetailItem heading={"Employee Email"} body={request["EmployeeEmail"] || "test"} />
            <DetailItem heading={"Request Description"} body={request["Description"] || "test"} />
            <DetailItem heading={"Employee Phone"} body={request["EmployeePhone"] || "test"} />
            <DetailItem heading={"Department"} body={request["Department"] || "test"} />
            <DetailItem heading={"Request Date"} body={request["Date"] || "test"} />
            <DetailItem heading={"Branch"} body={request["Branch"] || "test"} />
            <DetailItem heading={"Asset Category"} body={request["Category"] || "test"} />
            <DetailItem heading={"Department Manager"} body={request["DepartmentManager"] || "test"} />
            {section && section == "employee"
              ? <DetailItem heading={"HR's Comment"} body={request["Comment"] || "test"} />
              : section && section == "hr"
                ? <DetailItem heading={"Comment"} body={request["Comment"] || "test"} hasTextBox={true} textBoxOptions={options} />
                : <div className="border">
                    <DetailItem heading={"Comment"} body={request["Comment"] || "test"} />
                    {actions()}
                  </div>
            }

            {/* {section == "" && <Button
              title="Assign Asset"
              type="button"
              onClick={() => history.push(`${sectionUrl}request/${id}`)}
              // onClick={() => history.back()}  // goes to previous page
              size="small"
              className="btn br-xlg w-8 bg-purple"
            />} */}
            {/* <Textarea
              name="address"
              label="Address"
              value={formData["address"]}
              onChange={handleChange}
              validationHandler={validationHandler}
              error={errors.address}
              required={true}
              size="large"
            /> */}
            {/* <DetailItem heading={"request.Comment"} body="test" /> */}
            {/* <DetailItem heading={"request."} body="test" /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

Detail.propTypes = defaultPropValidation

export default Detail;
