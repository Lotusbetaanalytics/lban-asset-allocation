import * as React from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { useQuery } from "react-query";
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

const Detail = ({status = undefined, section = ""}) => {
  const { id } = useParams();
  const history = useHistory();

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

  const { isLoading, isFetching, data = {}, isError, error } = useQuery("fetch-request", () => splist("AssetRequest").fetchItem(id), {})

  if (isLoading || isFetching) return (<div>Loading...</div>)
  if (isError) toast.error(`${error}`);


  return (
    <div className='background container'>
      <NavBar active='dashboard' />

      <div className='container--info'>
        <HeaderBar title='Request Detail' />
        <Toaster position="bottom-center" reverseOrder={false} />

        <div className='container--form'>
          <Button
            title="Back"
            type="button"
            onClick={() => history.goBack()}
            // onClick={() => history.back()}  // goes to previous page
            size="small"
            className="btn br-xlg w-8 bg-light-grey2"
          />

          <div className="container--details">
            <DetailItem heading={"Employee Name"} body={data["Employee"] || "test"} />
            <DetailItem heading={"Employee Email"} body={data["EmployeeEmail"] || "test"} />
            <DetailItem heading={"Request Description"} body={data["Description"] || "test"} />
            <DetailItem heading={"Employee Phone"} body={data["EmployeePhone"] || "test"} />
            <DetailItem heading={"Department"} body={data["Department"] || "test"} />
            <DetailItem heading={"Request Date"} body={data["Date"] || "test"} />
            <DetailItem heading={"Branch"} body={data["Branch"] || "test"} />
            <DetailItem heading={"Asset Category"} body={data["Category"] || "test"} />
            <DetailItem heading={"Department Manager"} body={data["DepartmentManager"] || "test"} />
            {section && section == "employee"
              ? <DetailItem heading={"HR's Comment"} body={data["Comment"] || "test"} />
              : section && section == "hr"
                ? <DetailItem heading={"Comment"} body={data["Comment"] || "test"} hasTextBox={true} textBoxOptions={options} />
                : <DetailItem heading={"Comment"} body={data["Comment"] || "test"} />
            }
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
            {/* <DetailItem heading={"data.Comment"} body="test" /> */}
            {/* <DetailItem heading={"data."} body="test" /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
