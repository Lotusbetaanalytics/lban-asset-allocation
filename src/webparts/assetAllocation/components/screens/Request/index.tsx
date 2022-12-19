import * as React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useHistory, useParams } from "react-router-dom";
import {
  Input,
  Select,
  Button,
  //   Radio,
  DateInput,
  FormGroup,
  Textarea,
} from "mtforms";
import "mtforms/dist/index.css";
import toast, { Toaster } from "react-hot-toast";
import { HeaderBar, LoadingSpinner, NavBar } from "../../containers";
// import { createAssetRequest } from '../../hooks/requestHooks';
import { fetchDepartments } from "../../hooks/departmentHooks";
import {
  getDataIdAndTitle,
  getStaffById,
  getUserProfile,
} from "../../../utils/listUtils";
import { goBack, handleSelectChange } from "../../../utils/formUtils";
import splist from "../../hooks/splistHook";
import { findDataById } from "../../../utils/listUtils";
import { fetchOptions } from "../../hooks/queryOptions";
import { defaultPropValidation } from "../../../utils/componentUtils";

const AssetRequest = ({ status = undefined, section = "" }) => {
  const history = useHistory();
  const { id } = useParams();
  const queryClient = useQueryClient();
  let filteredAssets = [];

  const sectionUrl = `/app/${section ? section + "/" : ""}`;
  let titleText = id ? "Update Asset Request" : "Add Asset Request";
  // const departmentQuery = {"ManagerId": "ManagerId"}

  const [errors, setErrors] = React.useState({} as any);
  const [formData, setFormData] = React.useState({});
  // const [pageData, setpageData] = React.useState({})

  const placeholderUser = {
    DisplayName: "anonymous",
    Email: "anonymous@asset.com",
    PictureUrl: "",
  };

  const onSuccess = (data) => {
    
    const properties = data?.UserProfileProperties;
    const department = properties.filter(
      (prop) => prop?.Key == "Department"
    )[0];
    const departmentValue = department?.Value;
    // "Key": "Manager",
    // "Value": "i:0#.f|membership|onipede@lotusbetaanalytics.com",
    const manager = properties.filter((p) => p?.Key == "Manager")[0];
    let managerValue = manager?.Value;
    managerValue = `${managerValue}`.split("|membership|")[1];

    const phone = properties.filter((prop) => {
      if (prop?.Key == "WorkPhone" && prop.Value !== "") return;
      if (prop?.Key == "CellPhone" && prop.Value !== "") return;
      if (prop?.Key == "HomePhone" && prop.Value !== "") return;
      if (prop?.Key == "WorkPhone") return;
    })[0];
    const phoneValue = phone?.Value ? Number(phone?.Value) : undefined;

    console.log("onSuccess", {
      departmentValue,
      managerValue,
      phoneValue,
      properties,
    });

    setFormData({
      ...formData,
      Employee: data?.DisplayName,
      EmployeeEmail: data?.Email,
      EmployeePhone: phoneValue,
      Department: departmentValue,
      // DepartmentManager: managerValue
      ManagerEmail: managerValue,
    });
  };

  const {
    data: authUser = placeholderUser,
    isError: isAuthError,
    error: authError,
  } = useQuery("fetch-auth-user", getUserProfile, {
    ...fetchOptions,
    onSuccess,
  });
  console.log("auth", { authUser, isAuthError, authError });

  const employeeHasPermission =  () => {
    // if (section !== "employee") return false
    const userEmail = authUser["Email"] && authUser["Email"].toLowerCase()
    const EmployeeEmail = request["EmployeeEmail"] && request["EmployeeEmail"].toLowerCase()
    const hasPermission = section == "employee" && (userEmail === EmployeeEmail)
    console.log({hasPermission})
    return hasPermission
  }

  const actionFunction = (formData, id = undefined) => {
    if (id) return splist("AssetRequest").updateItem(id, formData);
    return splist("AssetRequest").createItem(formData);
  };

  // get departments from sp list
  const {
    isLoading: isDepartmentLoading,
    data: departments = [],
    isError: isDepartmentError,
    error: departmentError,
  } = useQuery("fetch-departments", fetchDepartments, { ...fetchOptions });

  // get assets from sp list
  const {
    isLoading: isAssetLoading,
    data: assets = [],
    isError: isAssetError,
    error: assetError,
  } = useQuery("fetch-assets", () => splist("Asset").fetchItems(), {
    ...fetchOptions,
    onSuccess: (data) => (filteredAssets = data),
  });

  // get branches from sp list
  const {
    isLoading: isBranchLoading,
    data: branches = [],
    isError: isBranchError,
    error: branchError,
  } = useQuery("fetch-branches", () => splist("Branch").fetchItems(), {
    ...fetchOptions,
  });

  // get categories from sp list
  const {
    isLoading: isCategoryLoading,
    data: categories = [],
    isError: isCategoryError,
    error: categoryError,
  } = useQuery("fetch-categories", () => splist("Category").fetchItems(), {
    ...fetchOptions,
  });

  // get asset request from sp list using id
  const {
    isLoading: isRequestLoading,
    data: request = {},
    isError: isRequestError,
    error: requestError,
  } = useQuery(
    ["fetch-request", id],
    () => splist("AssetRequest").fetchItem(id),
    {
      ...fetchOptions,
      onSuccess: (data) => {
        console.log("trying");
        setFormData({ ...data });
      },
      onError: (error) =>
        console.log("error getting request using id: ", error),
    }
  );
  console.log({ isRequestLoading, request });

  const { data, isLoading, isError, error, mutate } = useMutation(
    actionFunction,
    {
      onSuccess: (data) => {
        console.log("Request Created Sucessfully: ", data);
        toast.success("Request Created Sucessfully");
      },
      onError: (error) => {
        console.log("Error Creating Request: ", error);
        toast.error("Error Creating Request");
      },
      onSettled: () => {
        queryClient.invalidateQueries("fetch-requests");
      },
    }
  );

  // // const { isLoading, isFetching, data, isError, error, refetch } = useQuery("create-request", () => actionFunction(), {
  // //   enabled: false,
  // //   staleTime: Infinity,
  // //   onError: (error) => console.log("Error Creating Asset Request: ", error),
  // //   onSuccess: (data) => console.log("Asset Request Created Sucessfully: ", data),
  // // })
  // // console.log("isFetching, data: ", isFetching, data)

  // // TODO: fix getting manager details using their staff id (getStaffById is async)
  // if (formData["ManagerId"]) {
  //   // TODO: Properly Display (set) Manager Name
  //   setpageData({"DepartmentManager": getStaffById(formData["ManagerId"])})
  //   formData["ManagerId"] = undefined
  // }

  // // handle changes for select inputs, adding both the text value and id to formData
  // const handleSelectChange = (name, value, list) => {
  //   const { data, instance } = getDataIdAndTitle(name, value, list);
  //   setFormData({ ...formData, ...data });
  // };
  const handleChange = (name, value) =>
    setFormData({ ...formData, [name]: value });
  const validationHandler = (name, error) =>
    setErrors({ ...errors, [name]: error });
  const submitHandler = (e) => {
    // formData["ManagerId"] = undefined  // ? confirm this works
    // formData["DepartmentManager"] = undefined  // ? confirm this works
    // refetch()
    mutate(formData, id);
    history.push(`${sectionUrl}request/manage`);
  };

  const handleCategoryChange = (name, value) => {
    handleSelectChange(name, value, categories, formData, setFormData);
    if (assets.length > 0) {
      filteredAssets = assets.filter((a) => a.Category == value);
    }
  };

  if (id && section == "" && request["Status"] == "Approved")
    titleText = "Assign Asset";

  if (
    isLoading ||
    isDepartmentLoading ||
    isAssetLoading ||
    isBranchLoading ||
    isCategoryLoading ||
    (isRequestLoading && id)
  )
    return <LoadingSpinner />;
  if (isError || isDepartmentError || isAssetError || isBranchError || isCategoryError)
    toast.error(`${error || departmentError || assetError || branchError || categoryError}`);
  if (id && isRequestError) toast.error(`${requestError}`);

  if (section == "employee" && !(employeeHasPermission())) history.goBack()

  return (
    <div className="background container">
      <NavBar active={status?.toLowerCase() || "all"} section={section} />

      <div className="container--info">
        <HeaderBar title={titleText} hasBackButton={true} />
        <Toaster position="bottom-center" reverseOrder={false} />

        <div className="container--form py-6">
          <FormGroup
            onSubmit={submitHandler}
            // validation={formData}
            // errors={""}
            // setErrors={""}
          >
            {section == "" && (
              <Select
                name="Asset"
                label="Asset"
                value={formData["Asset"]}
                onChange={(name, value) =>
                  handleSelectChange(name, value, assets, formData, setFormData)
                }
                data={assets}
                filter="Title"
                // filterValue="ID"
                filterValue="Title"
                required={true}
                className="br-xlg mb-2"
                labelClassName="ml-2"
                validationHandler={validationHandler}
                error={errors["Asset"]}
              />
            )}
            <Input
              name="Employee"
              label="Employee Name"
              value={formData["Employee"]}
              onChange={handleChange}
              type="text"
              placeholder="Employee Name"
              className="br-xlg mb-2"
              labelClassName="ml-2"
              disabled={section !== "employee"}
              validationHandler={validationHandler}
              error={errors["Employee"]}
            />
            <Input
              name="EmployeeEmail"
              label="Employee Email"
              value={formData["EmployeeEmail"]}
              onChange={handleChange}
              type="text"
              placeholder="Employee Email"
              className="br-xlg mb-2"
              labelClassName="ml-2"
              disabled={section !== "employee"}
              validationHandler={validationHandler}
              error={errors["EmployeeEmail"]}
            />
            <Input
              name="EmployeePhone"
              label="Employee Phone"
              value={formData["EmployeePhone"]}
              onChange={handleChange}
              type="text"
              placeholder="Employee Phone"
              className="br-xlg mb-2"
              labelClassName="ml-2"
              disabled={section !== "employee"}
              validationHandler={validationHandler}
              error={errors["EmployeePhone"]}
            />
            <Input
              name="Department"
              label="Department"
              value={formData["Department"]}
              onChange={handleChange}
              type="text"
              placeholder="Department"
              className="br-xlg mb-2"
              labelClassName="ml-2"
              disabled={section !== "employee"}
              validationHandler={validationHandler}
              error={errors["Department"]}
            />
            <Select
              name="Branch"
              label="Branch"
              value={formData["Branch"]}
              onChange={(name, value) =>
                handleSelectChange(name, value, branches, formData, setFormData)
              }
              data={branches}
              filter="Title"
              // filterValue="ID"
              filterValue="Title"
              required={true}
              className="br-xlg mb-2"
              labelClassName="ml-2"
              disabled={section !== "employee"}
              validationHandler={validationHandler}
              error={errors["Branch"]}
            />
            <Select
              name="Category"
              label="Asset Category"
              value={formData["Category"]}
              onChange={handleCategoryChange}
              // onChange={(name, value) => handleSelectChange(name, value, categories, formData, setFormData)}
              data={categories}
              filter="Title"
              // filterValue="ID"
              filterValue="Title"
              required={true}
              className="br-xlg mb-2"
              labelClassName="ml-2"
              disabled={section !== "employee"}
              validationHandler={validationHandler}
              error={errors["Category"]}
            />
            <Textarea
              name="Description"
              label="Request Description"
              value={formData["Description"]}
              onChange={handleChange}
              size="medium"
              placeholder="Request Description"
              className="br-xlg mb-2"
              labelClassName="ml-2"
              disabled={section !== "employee"}
              validationHandler={validationHandler}
              error={errors["Description"]}
            />
            <DateInput
              name="Date"
              label="Request Date"
              value={formData["Date"]}
              onChange={handleChange}
              type="text"
              // required={true}
              placeholder="Request Date"
              className="br-xlg mb-2"
              labelClassName="ml-2"
              disabled={section !== "employee"}
              validationHandler={validationHandler}
              error={errors["Date"]}
            />
            {section !== "" && <div className="container--side"></div>}
            <Input
              name="ManagerEmail"
              label="Department Manager"
              value={formData["ManagerEmail"]}
              onChange={handleChange}
              type="text"
              placeholder="Department Manager"
              className="br-xlg mb-2"
              labelClassName="ml-2"
              disabled={section !== "employee"}
              validationHandler={validationHandler}
              error={errors["ManagerEmail"]}
            />
            {/* <Input
                name="DepartmentManager"
                label="Department Manager"
                value={formData["DepartmentManager"]}
                // value={pageData["DepartmentManager"]}
                onChange={handleChange}
                type="text"
                placeholder="Department Manager"
                className="br-xlg mb-2"
                labelClassName="ml-2"
                validationHandler={validationHandler}
                error={errors["DepartmentManager"]}
              /> */}
            <Button
              title="Submit"
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
  );
};

AssetRequest.propTypes = defaultPropValidation;

export default AssetRequest;
