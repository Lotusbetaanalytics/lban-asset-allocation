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
import { createAssetRequest } from '../../hooks/requestHooks';
import { fetchDepartments } from '../../hooks/departmentHooks';
import { getDataIdAndTitle, getStaffById, getUserProfile } from '../../../utils/listUtils';
import { goBack, handleSelectChange } from '../../../utils/formUtils';
import splist from '../../hooks/splistHook';
import { findDataById } from "../../../utils/listUtils";
import { fetchOptions } from '../../hooks/queryOptions';
import { defaultPropValidation } from '../../../utils/componentUtils';

const AssetRequest = ({status = undefined, section = ""}) => {
  const history = useHistory()
  const { id } = useParams()
  const queryClient = useQueryClient();

  const sectionUrl = `/app/${section ? section + "/" : ""}`
  const departmentQuery = {"ManagerId": "ManagerId"}

  const [errors, setErrors] = React.useState({} as any);
  const [formData, setFormData] = React.useState({})
  const [pageData, setpageData] = React.useState({})

  const placeholderUser = {DisplayName: "anonymous", Email: "anonymous@asset.com", PictureUrl: ""}
  const onSuccess = (data) => {
    /**
     * {
    "authUser": {
        "odata.metadata": "https://lotusbetaanalytics.sharepoint.com/sites/AssetAllocation/_api/$metadata#SP.ApiData.PersonPropertiess/@Element",
        "odata.type": "SP.UserProfiles.PersonProperties",
        "odata.id": "https://lotusbetaanalytics.sharepoint.com/sites/AssetAllocation/_api/sp.userprofiles.peoplemanager/getmyproperties",
        "odata.editLink": "sp.userprofiles.peoplemanager/getmyproperties",
        "AccountName": "i:0#.f|membership|akinwale@lotusbetaanalytics.com",
        "DirectReports": [],
        "DisplayName": "Akinwale Jude",
        "Email": "Akinwale@lotusbetaanalytics.com",
        "ExtendedManagers": [
            "i:0#.f|membership|ademola@lotusbetaanalytics.com",
            "i:0#.f|membership|sunday@lotusbetaanalytics.com",
            "i:0#.f|membership|onipede@lotusbetaanalytics.com"
        ],
        "ExtendedReports": [
            "i:0#.f|membership|akinwale@lotusbetaanalytics.com"
        ],
        "IsFollowed": false,
        "LatestPost": null,
        "Peers": [
            "i:0#.f|membership|abidoye@lotusbetaanalytics.com",
            "i:0#.f|membership|adeboye@lotusbetaanalytics.com",
            "i:0#.f|membership|aishat@lotusbetaanalytics.com",
            "i:0#.f|membership|amarachi@lotusbetaanalytics.com",
            "i:0#.f|membership|ogoh@lotusbetaanalytics.com",
            "i:0#.f|membership|chibuzor@lotusbetaanalytics.com",
            "i:0#.f|membership|faseun@lotusbetaanalytics.com",
            "i:0#.f|membership|ejoor@lotusbetaanalytics.com",
            "i:0#.f|membership|obafemi@lotusbetaanalytics.com",
            "i:0#.f|membership|frederick@lotusbetaanalytics.com",
            "i:0#.f|membership|godwin@lotusbetaanalytics.com",
            "i:0#.f|membership|okoji@lotusbetaanalytics.com",
            "i:0#.f|membership|ochoyi@lotusbetaanalytics.com",
            "i:0#.f|membership|nneoma@lotusbetaanalytics.com",
            "i:0#.f|membership|oladayo@lotusbetaanalytics.com",
            "i:0#.f|membership|oluwapelumi@lotusbetaanalytics.com",
            "i:0#.f|membership|omotayo@lotusbetaanalytics.com",
            "i:0#.f|membership|opeyemi@lotusbetaanalytics.com",
            "i:0#.f|membership|owolabi@lotusbetaanalytics.com",
            "i:0#.f|membership|rahmat@lotusbetaanalytics.com",
            "i:0#.f|membership|samirudeen@lotusbetaanalytics.com",
            "i:0#.f|membership|muritala@lotusbetaanalytics.com",
            "i:0#.f|membership|israel@lotusbetaanalytics.com",
            "i:0#.f|membership|sulaiman@lotusbetaanalytics.com",
            "i:0#.f|membership|kolapo@lotusbetaanalytics.com",
            "i:0#.f|membership|sylvester@lotusbetaanalytics.com",
            "i:0#.f|membership|nwaeze@lotusbetaanalytics.com",
            "i:0#.f|membership|alfavictor@lotusbetaanalytics.com"
        ],
        "PersonalSiteHostUrl": "https://lotusbetaanalytics-my.sharepoint.com:443/",
        "PersonalUrl": "https://lotusbetaanalytics-my.sharepoint.com/personal/akinwale_lotusbetaanalytics_com/",
        "PictureUrl": "https://lotusbetaanalytics-my.sharepoint.com:443/User%20Photos/Profile%20Pictures/306225cd-94aa-4c5f-9a13-1a2344795973_MThumb.jpg?t=63783110969",
        "Title": null,
        "UserProfileProperties": [
            {
                "Key": "UserProfile_GUID",
                "Value": "c13dcf80-71f1-4cbf-b174-7856bc94f6cc",
                "ValueType": "Edm.String"
            },
            {
                "Key": "SID",
                "Value": "i:0h.f|membership|100320013bdd1ea4@live.com",
                "ValueType": "Edm.String"
            },
            {
                "Key": "ADGuid",
                "Value": "System.Byte[]",
                "ValueType": "Edm.String"
            },
            {
                "Key": "AccountName",
                "Value": "i:0#.f|membership|akinwale@lotusbetaanalytics.com",
                "ValueType": "Edm.String"
            },
            {
                "Key": "FirstName",
                "Value": "Akinwale",
                "ValueType": "Edm.String"
            },
            {
                "Key": "SPS-PhoneticFirstName",
                "Value": "",
                "ValueType": "Edm.String"
            },
            {
                "Key": "LastName",
                "Value": "Jude",
                "ValueType": "Edm.String"
            },
            {
                "Key": "SPS-PhoneticLastName",
                "Value": "",
                "ValueType": "Edm.String"
            },
            {
                "Key": "PreferredName",
                "Value": "Akinwale Jude",
                "ValueType": "Edm.String"
            },
            {
                "Key": "SPS-PhoneticDisplayName",
                "Value": "",
                "ValueType": "Edm.String"
            },
            {
                "Key": "WorkPhone",
                "Value": "",
                "ValueType": "Edm.String"
            },
            {
                "Key": "Department",
                "Value": "Business Solution",
                "ValueType": "Edm.String"
            },
            {
                "Key": "Title",
                "Value": "",
                "ValueType": "Edm.String"
            },
            {
                "Key": "SPS-JobTitle",
                "Value": "",
                "ValueType": "Edm.String"
            },
            {
                "Key": "SPS-Department",
                "Value": "Business Solution",
                "ValueType": "Edm.String"
            },
            {
                "Key": "Manager",
                "Value": "i:0#.f|membership|onipede@lotusbetaanalytics.com",
                "ValueType": "Edm.String"
            },
            {
                "Key": "AboutMe",
                "Value": "",
                "ValueType": "Edm.String"
            },
            {
                "Key": "PersonalSpace",
                "Value": "/personal/akinwale_lotusbetaanalytics_com/",
                "ValueType": "Edm.String"
            },
            {
                "Key": "PictureURL",
                "Value": "https://lotusbetaanalytics-my.sharepoint.com:443/User%20Photos/Profile%20Pictures/306225cd-94aa-4c5f-9a13-1a2344795973_MThumb.jpg",
                "ValueType": "Edm.String"
            },
            {
                "Key": "UserName",
                "Value": "Akinwale@lotusbetaanalytics.com",
                "ValueType": "Edm.String"
            },
            {
                "Key": "QuickLinks",
                "Value": "",
                "ValueType": "Edm.String"
            },
            {
                "Key": "WebSite",
                "Value": "",
                "ValueType": "Edm.String"
            },
            {
                "Key": "PublicSiteRedirect",
                "Value": "",
                "ValueType": "Edm.String"
            },
            {
                "Key": "SPS-DataSource",
                "Value": "",
                "ValueType": "Edm.String"
            },
            {
                "Key": "SPS-MemberOf",
                "Value": "",
                "ValueType": "Edm.String"
            },
            {
                "Key": "SPS-Dotted-line",
                "Value": "",
                "ValueType": "Edm.String"
            },
            {
                "Key": "SPS-Peers",
                "Value": "",
                "ValueType": "Edm.String"
            },
            {
                "Key": "SPS-Responsibility",
                "Value": "",
                "ValueType": "Edm.String"
            },
            {
                "Key": "SPS-SipAddress",
                "Value": "Akinwale@lotusbetaanalytics.com",
                "ValueType": "Edm.String"
            },
            {
                "Key": "SPS-MySiteUpgrade",
                "Value": "",
                "ValueType": "Edm.String"
            },
            {
                "Key": "SPS-DontSuggestList",
                "Value": "",
                "ValueType": "Edm.String"
            },
            {
                "Key": "SPS-ProxyAddresses",
                "Value": "",
                "ValueType": "Edm.String"
            },
            {
                "Key": "SPS-HireDate",
                "Value": "",
                "ValueType": "Edm.String"
            },
            {
                "Key": "SPS-DisplayOrder",
                "Value": "",
                "ValueType": "Edm.String"
            },
            {
                "Key": "SPS-ClaimID",
                "Value": "Akinwale@lotusbetaanalytics.com",
                "ValueType": "Edm.String"
            },
            {
                "Key": "SPS-ClaimProviderID",
                "Value": "membership",
                "ValueType": "Edm.String"
            },
            {
                "Key": "SPS-LastColleagueAdded",
                "Value": "",
                "ValueType": "Edm.String"
            },
            {
                "Key": "SPS-ClaimProviderType",
                "Value": "Forms",
                "ValueType": "Edm.String"
            },
            {
                "Key": "SPS-OWAUrl",
                "Value": "",
                "ValueType": "Edm.String"
            },
            {
                "Key": "SPS-SavedAccountName",
                "Value": "i:0#.f|membership|akinwale@lotusbetaanalytics.com",
                "ValueType": "Edm.String"
            },
            {
                "Key": "SPS-ResourceSID",
                "Value": "",
                "ValueType": "Edm.String"
            },
            {
                "Key": "SPS-SavedSID",
                "Value": "System.Byte[]",
                "ValueType": "Edm.String"
            },
            {
                "Key": "SPS-ResourceAccountName",
                "Value": "",
                "ValueType": "Edm.String"
            },
            {
                "Key": "SPS-ObjectExists",
                "Value": "",
                "ValueType": "Edm.String"
            },
            {
                "Key": "SPS-MasterAccountName",
                "Value": "",
                "ValueType": "Edm.String"
            },
            {
                "Key": "SPS-UserPrincipalName",
                "Value": "Akinwale@lotusbetaanalytics.com",
                "ValueType": "Edm.String"
            },
            {
                "Key": "SPS-PersonalSiteCapabilities",
                "Value": "36",
                "ValueType": "Edm.String"
            },
            {
                "Key": "SPS-O15FirstRunExperience",
                "Value": "",
                "ValueType": "Edm.String"
            },
            {
                "Key": "SPS-PersonalSiteInstantiationState",
                "Value": "2",
                "ValueType": "Edm.String"
            },
            {
                "Key": "SPS-PersonalSiteFirstCreationTime",
                "Value": "5/5/2021 1:33:02 PM",
                "ValueType": "Edm.String"
            },
            {
                "Key": "SPS-PersonalSiteLastCreationTime",
                "Value": "5/5/2021 1:33:02 PM",
                "ValueType": "Edm.String"
            },
            {
                "Key": "SPS-PersonalSiteNumberOfRetries",
                "Value": "1",
                "ValueType": "Edm.String"
            },
            {
                "Key": "SPS-PersonalSiteFirstCreationError",
                "Value": "",
                "ValueType": "Edm.String"
            },
            {
                "Key": "SPS-DistinguishedName",
                "Value": "CN=306225cd-94aa-4c5f-9a13-1a2344795973,OU=39dab133-5d7b-4bec-8eca-7f89b173e27f,OU=Tenants,OU=MSOnline,DC=SPODS188307,DC=msft,DC=net",
                "ValueType": "Edm.String"
            },
            {
                "Key": "SPS-SourceObjectDN",
                "Value": "",
                "ValueType": "Edm.String"
            },
            {
                "Key": "SPS-LastKeywordAdded",
                "Value": "",
                "ValueType": "Edm.String"
            },
            {
                "Key": "SPS-FeedIdentifier",
                "Value": "",
                "ValueType": "Edm.String"
            },
            {
                "Key": "WorkEmail",
                "Value": "Akinwale@lotusbetaanalytics.com",
                "ValueType": "Edm.String"
            },
            {
                "Key": "CellPhone",
                "Value": "",
                "ValueType": "Edm.String"
            },
            {
                "Key": "Fax",
                "Value": "",
                "ValueType": "Edm.String"
            },
            {
                "Key": "HomePhone",
                "Value": "",
                "ValueType": "Edm.String"
            },
            {
                "Key": "Office",
                "Value": "",
                "ValueType": "Edm.String"
            },
            {
                "Key": "SPS-Location",
                "Value": "",
                "ValueType": "Edm.String"
            },
            {
                "Key": "Assistant",
                "Value": "",
                "ValueType": "Edm.String"
            },
            {
                "Key": "SPS-PastProjects",
                "Value": "",
                "ValueType": "Edm.String"
            },
            {
                "Key": "SPS-Skills",
                "Value": "",
                "ValueType": "Edm.String"
            },
            {
                "Key": "SPS-School",
                "Value": "",
                "ValueType": "Edm.String"
            },
            {
                "Key": "SPS-Birthday",
                "Value": "",
                "ValueType": "Edm.String"
            },
            {
                "Key": "SPS-StatusNotes",
                "Value": "",
                "ValueType": "Edm.String"
            },
            {
                "Key": "SPS-Interests",
                "Value": "",
                "ValueType": "Edm.String"
            },
            {
                "Key": "SPS-HashTags",
                "Value": "",
                "ValueType": "Edm.String"
            },
            {
                "Key": "SPS-EmailOptin",
                "Value": "",
                "ValueType": "Edm.String"
            },
            {
                "Key": "SPS-PictureTimestamp",
                "Value": "63783110969",
                "ValueType": "Edm.String"
            },
            {
                "Key": "SPS-PrivacyPeople",
                "Value": "True",
                "ValueType": "Edm.String"
            },
            {
                "Key": "SPS-PicturePlaceholderState",
                "Value": "0",
                "ValueType": "Edm.String"
            },
            {
                "Key": "SPS-PrivacyActivity",
                "Value": "0",
                "ValueType": "Edm.String"
            },
            {
                "Key": "SPS-PictureExchangeSyncState",
                "Value": "1",
                "ValueType": "Edm.String"
            },
            {
                "Key": "SPS-MUILanguages",
                "Value": "",
                "ValueType": "Edm.String"
            },
            {
                "Key": "SPS-ContentLanguages",
                "Value": "",
                "ValueType": "Edm.String"
            },
            {
                "Key": "SPS-TimeZone",
                "Value": "",
                "ValueType": "Edm.String"
            },
            {
                "Key": "SPS-RegionalSettings-FollowWeb",
                "Value": "",
                "ValueType": "Edm.String"
            },
            {
                "Key": "SPS-Locale",
                "Value": "",
                "ValueType": "Edm.String"
            },
            {
                "Key": "SPS-CalendarType",
                "Value": "",
                "ValueType": "Edm.String"
            },
            {
                "Key": "SPS-AltCalendarType",
                "Value": "",
                "ValueType": "Edm.String"
            },
            {
                "Key": "SPS-AdjustHijriDays",
                "Value": "",
                "ValueType": "Edm.String"
            },
            {
                "Key": "SPS-ShowWeeks",
                "Value": "",
                "ValueType": "Edm.String"
            },
            {
                "Key": "SPS-WorkDays",
                "Value": "",
                "ValueType": "Edm.String"
            },
            {
                "Key": "SPS-WorkDayStartHour",
                "Value": "",
                "ValueType": "Edm.String"
            },
            {
                "Key": "SPS-WorkDayEndHour",
                "Value": "",
                "ValueType": "Edm.String"
            },
            {
                "Key": "SPS-Time24",
                "Value": "",
                "ValueType": "Edm.String"
            },
            {
                "Key": "SPS-FirstDayOfWeek",
                "Value": "",
                "ValueType": "Edm.String"
            },
            {
                "Key": "SPS-FirstWeekOfYear",
                "Value": "",
                "ValueType": "Edm.String"
            },
            {
                "Key": "SPS-RegionalSettings-Initialized",
                "Value": "",
                "ValueType": "Edm.String"
            },
            {
                "Key": "OfficeGraphEnabled",
                "Value": "",
                "ValueType": "Edm.String"
            },
            {
                "Key": "SPS-UserType",
                "Value": "0",
                "ValueType": "Edm.String"
            },
            {
                "Key": "SPS-HideFromAddressLists",
                "Value": "False",
                "ValueType": "Edm.String"
            },
            {
                "Key": "SPS-RecipientTypeDetails",
                "Value": "",
                "ValueType": "Edm.String"
            },
            {
                "Key": "DelveFlags",
                "Value": "",
                "ValueType": "Edm.String"
            },
            {
                "Key": "PulseMRUPeople",
                "Value": "",
                "ValueType": "Edm.String"
            },
            {
                "Key": "msOnline-ObjectId",
                "Value": "306225cd-94aa-4c5f-9a13-1a2344795973",
                "ValueType": "Edm.String"
            },
            {
                "Key": "SPS-PointPublishingUrl",
                "Value": "",
                "ValueType": "Edm.String"
            },
            {
                "Key": "SPS-TenantInstanceId",
                "Value": "",
                "ValueType": "Edm.String"
            },
            {
                "Key": "SPS-SharePointHomeExperienceState",
                "Value": "17301505",
                "ValueType": "Edm.String"
            },
            {
                "Key": "SPS-RefreshToken",
                "Value": "",
                "ValueType": "Edm.String"
            },
            {
                "Key": "SPS-MultiGeoFlags",
                "Value": "",
                "ValueType": "Edm.String"
            },
            {
                "Key": "PreferredDataLocation",
                "Value": "",
                "ValueType": "Edm.String"
            }
        ],
        "UserUrl": "https://lotusbetaanalytics-my.sharepoint.com:443/Person.aspx?accountname=i%3A0%23%2Ef%7Cmembership%7Cakinwale%40lotusbetaanalytics%2Ecom"
    },
    "isAuthError": false,
    "authError": null
}
     */
    const properties = data?.UserProfileProperties
    const department = properties.filter(p => p?.key == "Department")[0]
    const departmentValue = department?.value
    // "Key": "Manager",
    // "Value": "i:0#.f|membership|onipede@lotusbetaanalytics.com",
    const manager = properties.filter(p => p?.key == "Manager")[0]
    const managerValue = manager?.value

    setFormData({...formData, Employee: data?.DisplayName, EmployeeEmail: data?.Email, Department: departmentValue, DepartmentManager: managerValue })
  }

  const { data: authUser = placeholderUser, isError: isAuthError, error: authError } = useQuery("fetch-auth-user", getUserProfile, {...fetchOptions, onSuccess})
  console.log({authUser, isAuthError, authError})

  const actionFunction = (id = undefined, formData = {}) => {
    // createAssetRequest(formData)
    if (id) return splist("AssetRequest").updateItem(id, formData)
    return splist("AssetRequest").createItem(formData)
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
    error: categoryError 
  } = useQuery("fetch-categories", () => splist("Category").fetchItems(), {...fetchOptions})

  // get asset request from sp list using id
  const {
    isLoading: isRequestLoading,
    data: request = {},
    isError: isRequestError,
    error: requestError ,
  } = useQuery(["fetch-request", id], () => splist("AssetRequest").fetchItem(id), {
    ...fetchOptions,
    onSuccess: (data) => {
      try {
        // // TODO: Properly Display (set) Manager Name
        // const dept = findDataById(data["DepartmentIdId"], departments)
        // data["ManagerId"] = dept?.Manager
        console.log("trying")
      } catch (error) {
        toast.error(error)
      }
      setFormData({...data})
    },
    onError: (error) => console.log("error getting request using id: ", error),
  })
  console.log({isRequestLoading, request})

  const { data, isLoading, isError, error, mutate } = useMutation(actionFunction, {
    onSuccess: data => {
      console.log("Asset Created Sucessfully: ", data)
      alert("success")
    },
    onError: (error) => {
      console.log("Error Creating Asset: ", error)
      alert("there was an error")
    },
    onSettled: () => {
      queryClient.invalidateQueries('fetch-assets');
    },
  })

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
  const handleChange = (name, value) => setFormData({ ...formData, [name]: value });
  const validationHandler = (name, error) => setErrors({ ...errors, [name]: error });
  const submitHandler = (e) => {
    formData["ManagerId"] = undefined  // ? confirm this works
    formData["DepartmentManager"] = undefined  // ? confirm this works
    // refetch()
    mutate(id, formData)
    history.push(`${sectionUrl}request/manage/all`)
  };

  if (isLoading || isDepartmentLoading || isBranchLoading || isCategoryLoading || (isRequestLoading && id)) return (<div>Loading...</div>)
  if (isError || isDepartmentError || isBranchError || isCategoryError) toast.error(`${error || departmentError || branchError || categoryError}`);
  if (id && isRequestError) toast.error(`${requestError}`)

  return (
    <div className='background container'>
      <NavBar active={status?.toLowerCase() || "pending"} section={section} />

      <div className='container--info'>
        <HeaderBar title='Asset Request Form' hasBackButton={true} />
        <Toaster position="bottom-center" reverseOrder={false} />

        <div className='container--form py-6'>
          <FormGroup
            onSubmit={submitHandler}
            // validation={formData}
            // errors={""}
            // setErrors={""} 
          >
            <Input
                name="Employee"
                label="Employee Name"
                value={formData["Employee"]}
                onChange={handleChange}
                type="text"
                placeholder="Employee Name"
                className="br-xlg mb-2"
                labelClassName="ml-2"
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
                validationHandler={validationHandler}
                error={errors["EmployeePhone"]}
              />
              {/* <Select
                name="Department"
                label="Department"
                value={formData["Department"]}
                // onChange={(name, value) => handleSelectChange(name, value, departments)}
                onChange={(name, value) => handleSelectChange(name, value, departments, formData, setFormData, departmentQuery)}
                data={departments}
                filter="Title"
                // filterValue="ID"
                filterValue="Title"
                required={true}
                className="br-xlg mb-2"
                labelClassName="ml-2"
                validationHandler={validationHandler}
                error={errors["Department"]}
              /> */}
              <Input
                name="Department"
                label="Department"
                value={formData["Department"]}
                onChange={handleChange}
                type="text"
                placeholder="Department"
                className="br-xlg mb-2"
                labelClassName="ml-2"
                validationHandler={validationHandler}
                error={errors["Department"]}
              />
              <Select
                name="Branch"
                label="Branch"
                value={formData["Branch"]}
                // onChange={(name, value) => handleSelectChange(name, value, branches)}
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
              <Select
                name="Category"
                label="Asset Category"
                value={formData["Category"]}
                // onChange={(name, value) => handleSelectChange(name, value, categories)}
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
                validationHandler={validationHandler}
                error={errors["Date"]}
              />
              <div className="container--side"></div>
              <Input
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
              />
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
  )
}

AssetRequest.propTypes = defaultPropValidation

export default AssetRequest