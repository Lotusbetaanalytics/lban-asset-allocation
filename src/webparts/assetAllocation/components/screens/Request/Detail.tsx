import * as React from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ParsedQuery } from "query-string";
import {
  // Input,
  // Select,
  Button,
  // Radio,
  // DateInput,
  // FormGroup,
  Textarea,
} from "mtforms";
import "mtforms/dist/index.css";
import toast, { Toaster } from "react-hot-toast";
import { HeaderBar, NavBar, DetailItem, LoadingSpinner } from "../../containers";
import splist from "../../hooks/splistHook";
import { defaultPropValidation } from "../../../utils/componentUtils";
import { fetchOptions } from "../../hooks/queryOptions";

const Detail = ({status = undefined, section = ""}) => {
  const { id } = useParams();
  const history = useHistory();
  const queryClient = useQueryClient();

  const sectionUrl = `/app/${section ? section + "/" : ""}`

  const [errors, setErrors] = React.useState({} as any);
  const [formData, setFormData] = React.useState({})
  const [redirectUrl, setRedirectUrl] = React.useState("")
  let updateData = {...formData}

  const handleChange = (name, value) => setFormData({ ...formData, [name]: value });
  const validationHandler = (name, error) => setErrors({ ...errors, [name]: error });
  const options = {
    name: "OfficeManagerComment",
    label: "OfficeManagerComment",
    value: formData["OfficeManagerComment"],
    onChange: handleChange,
    validationHandler: validationHandler,
    error: errors.OfficeManagerComment,
    required: true,
    size: "large",
  }
  const hrOptions = {
    ...options,
    name: "HrComment",
    label: "HrComment",
    value: formData["HrComment"],
    error: errors.HrComment,
  }
  // const goBack = () => history.goBack()

  const actionFunction = (formData, id = undefined) => {
    return splist("AssetRequest").updateItem(id, formData)
  }

  console.log({id, section})
  const { isLoading, isFetching, data: request = {}, refetch, isError, error } = useQuery(["fetch-request", id], () => splist("AssetRequest").fetchItem(id), {...fetchOptions})

  const { data, isLoading: updateIsLoading, isError: updateIsError, error: updateError, mutate } = useMutation(() => actionFunction(id, updateData), {
    onSuccess: data => {
      console.log("Asset Updated Sucessfully: ", data)
      refetch()
      toast.success("Manager Deleted Sucessfully")
      history.push(`${sectionUrl}request/detail/${id}`)
    },
    onError: (error) => {
      console.log("Error Updating Asset: ", error)
      toast.error("Error Deleting Manager")
    },
    onSettled: () => {
      queryClient.invalidateQueries(["fetch-request", id]);
      // queryClient.invalidateQueries('fetch-assets');
    },
  })

  const approvedOrDeclinedRequest = () => {
    if (request["Status"] == "Declined") return true
    if (request["Status"] == "Approved") return true
    return false
  }

  const updateRequest = (approved = false) => {
    const payload = {
      // HrComment: section == "hr" ? formData["Comment"] : undefined,
      // OfficeManagerComment: section == "" ? formData["Comment"] : undefined,
      // Comment: undefined,
      HrComment: formData["HrComment"],
      OfficeManagerComment: formData["OfficeManagerComment"],
      Status: "Started"
    }

    console.log("updateRequest", {section, HRApproved: request["IsHrApproved"], OMApproved: request["IsOfficeManagerApproved"]})

    if (
      section == "hr" 
      && request["IsOfficeManagerApproved"] 
      && !request["IsHrApproved"] 
      // && formData["IsHrApproved"]
      && approved
    ) {
      payload["IsHrApproved"] = true
      // payload["Status"] = "Assigned"
      console.log("hr: 1")
    }

    if (
      section == "" 
      && request["IsHrApproved"] 
      && request["IsOfficeManagerApproved"] 
      && !formData["IsHrApproved"] 
      // && formData["IsOfficeManagerApproved"]
      && approved
    ) {
      payload["Status"] = "Approved"
      console.log("om: 1")
    }

    if (
      section == "" 
      && !request["IsOfficeManagerApproved"] 
      // && formData["IsOfficeManagerApproved"]
      && approved
    ) {
      payload["IsOfficeManagerApproved"] = true
      console.log("om: 2")
    }

    if (!approved) {
      payload["Status"] = "Declined"
      console.log("declined: 1")
    }

    const updatedData = {...formData, ...payload}
    updateData = updatedData
    console.log({updatedData})
    setFormData(updatedData)
    mutate(id, updateData)
    // mutate(formData, id)
    refetch()
  }

  const actionButtons = () => {

    if (approvedOrDeclinedRequest()) return
    // if (request["Status"] == "Declined") return
    // if (request["Status"] == "Approved") return

    if (
      section == "" 
      // && request["Status"] 
      // && request["Status"].toLowerCase() == "started" 
      && request["IsOfficeManagerApproved"]
      && request["IsHrApproved"]
    ) {
      return (
        <Button
          title="Assign Asset"
          type="button"
          onClick={() => updateRequest(true)}
          // onClick={() => history.push(`${sectionUrl}request/${id}`)}
          // onClick={() => history.back()}  // goes to previous page
          size="small"
          // className="btn br-xlg w-8 bg-purple"
          className="btn--purple br-xlg mr-auto"
        />
      )
    }

    if (section !== "hr" && section !== "") return

    if (
      section == ""
      && !request["IsOfficeManagerApproved"]
      && !request["IsHrApproved"]
    ) {
      return (
        <>
          <Button
            title="Available"
            type="button"
            onClick={() => updateRequest(true)}
            size="small"
            className="btn--purple br-xlg mr-auto"
          />
          <Button
            title="Unavailable"
            type="button"
            onClick={() => updateRequest()}
            size="small"
            className="btn--yellow br-xlg mr-auto"
          />
        </>
      )
    }

    if (
      section == "hr"
      && request["IsOfficeManagerApproved"]
      && !request["IsHrApproved"]
    ) {
      return (
        <>
          <Button
            title="Approve"
            type="button"
            onClick={() => updateRequest(true)}
            size="small"
            className="btn--purple br-xlg mr-auto"
          />
          <Button
            title="Decline"
            type="button"
            onClick={() => updateRequest()}
            size="small"
            className="btn br-xlg mr-auto"
          />
        </>
      )
    }

    if (
      section == "hr"
      && !request["IsOfficeManagerApproved"]
      && !request["IsHrApproved"]
    ) {
      return (
      <div className="m-2 p-2 detail__info text-purple">
        <h3 className="">Asset Availability has not been confirmed</h3>
      </div>
      )
    }

    return
  }

  // if (!status) status = `${request["Status"]}`.toLowerCase() || "pending"
  if (!status) status = request["Status"] || "Pending"
  const titleText = status ? status + " " + "Request" : "Request Detail"
  
  // console.log({section, HRApproved: request["IsHrApproved"], OMApproved: request["IsOfficeManagerApproved"], request})
  console.log({formData})

  if (isLoading || isFetching) return (<LoadingSpinner />)
  if (isError) toast.error(`${error}`);


  return (
    <div className='background container'>
      <NavBar active={status && status.toLowerCase() || "pending"} section={section} />

      <div className='container--info'>
        <HeaderBar title={titleText} hasBackButton={true} />
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
            <DetailItem heading={"Employee Name"} body={request["Employee"] || "Unavailable"} />
            <DetailItem heading={"Employee Email"} body={request["EmployeeEmail"] || "Unavailable"} />
            <DetailItem heading={"Request Description"} body={request["Description"] || "Unavailable"} />
            <DetailItem heading={"Employee Phone"} body={request["EmployeePhone"] || "Unavailable"} />
            <DetailItem heading={"Department"} body={request["Department"] || "Unavailable"} />
            <DetailItem heading={"Request Date"} body={request["Date"] || "Unavailable"} />
            <DetailItem heading={"Branch"} body={request["Branch"] || "Unavailable"} />
            <DetailItem heading={"Asset Category"} body={request["Category"] || "Unavailable"} />
            <DetailItem heading={"Department Manager Email"} body={request["Manager Email"] || "Unavailable"} />
            {/* <DetailItem heading={"Department Manager"} body={request["DepartmentManager"] || "Unavailable"} /> */}
{/* 
            {section !== "hr" && <DetailItem heading={"HR's Comment"} body={request["HrComment"] || "Unavailable"} />}
            {section !== "" && <DetailItem heading={"Office Manager's Comment"} body={request["OfficeManagerComment"] || "Unavailable"} />}

            {section == "hr" && approvedOrDeclinedRequest() && <DetailItem heading={"HR's Comment"} body={request["HrComment"] || "Unavailable"} />}
            {section == "" && approvedOrDeclinedRequest() && <DetailItem heading={"Office Manager's Comment"} body={request["OfficeManagerComment"] || "Unavailable"} />} */}


            {(section == "" || approvedOrDeclinedRequest()) && <DetailItem heading={"HR's Comment"} body={request["HrComment"] || "Unavailable"} />}
            {(section == "hr" || approvedOrDeclinedRequest()) && <DetailItem heading={"Office Manager's Comment"} body={request["OfficeManagerComment"] || "Unavailable"} />}

            {section == "hr" && !approvedOrDeclinedRequest() && 
              <div>
                <DetailItem heading={"HrComment"} body={request["HrComment"] || "Unavailable"} hasTextBox={true} />
                <Textarea
                  name={"HrComment"}
                  value={formData[`HrComment`]}
                  onChange={handleChange}
                  validationHandler={validationHandler["HrComment"]}
                  error={errors.HrComment}
                  labelClassName = {'d-none'}
                  className={'mt-n2 ml-n1'}
                  required={true}
                  size={"large"}
                />
              </div>  
            }
            {section == "" && !approvedOrDeclinedRequest() && 
              <div className="div">
                <DetailItem heading={"OfficeManagerComment"} body={request["OfficeManagerComment"] || "Unavailable"} hasTextBox={true} />
                <Textarea
                  name={"OfficeManagerComment"}
                  value={formData[`OfficeManagerComment`]}
                  onChange={handleChange}
                  validationHandler={validationHandler["OfficeManagerComment"]}
                  error={errors.OfficeManagerComment}
                  labelClassName = {'d-none'}
                  className={'mt-n2 ml-n1'}
                  required={true}
                  size={"large"}
                />
              </div>
            }

            <div className="container--side"></div>

            {/* {section && section == "employee"
              ? <><DetailItem heading={"HR's Comment"} body={request["HrComment"] || "Unavailable"} />
                <DetailItem heading={"Office Manager's Comment"} body={request["OfficeManagerComment"] || "Unavailable"} /></>
              : section && section == "hr"
                ? <DetailItem heading={"Comment"} body={request["Comment"] || "Unavailable"} hasTextBox={true} textBoxOptions={options} />
                : <div className="border">
                    <><DetailItem heading={"HR's Comment"} body={request["HrComment"] || "Unavailable"} />
                    <DetailItem heading={"Comment"} body={request["Comment"] || "Unavailable"} /></>
                  </div>
            }
            <div className=""> */}

            {actionButtons()}

            {/* </div> */}

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
