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
import {
  HeaderBar,
  NavBar,
  DetailItem,
  LoadingSpinner,
} from "../../containers";
import splist from "../../hooks/splistHook";
import { defaultPropValidation } from "../../../utils/componentUtils";
import { fetchOptions } from "../../hooks/queryOptions";

const Detail = ({ status = undefined, section = "" }) => {
  const { id } = useParams();
  const history = useHistory();

  // const [errors, setErrors] = React.useState({} as any);
  // const [formData, setFormData] = React.useState({})

  // const handleChange = (name, value) => setFormData({ ...formData, [name]: value });
  // const validationHandler = (name, error) => setErrors({ ...errors, [name]: error });
  // const options = {
  //   name: "address",
  //   label: "Address",
  //   value: formData["address"],
  //   onChange: handleChange,
  //   validationHandler: validationHandler,
  //   error: errors.address,
  //   required: true,
  //   size: "large"    ,
  // }
  // const goBack = () => history.goBack()

  const {
    isLoading,
    isFetching,
    data: asset = {},
    isError,
    error,
  } = useQuery(["fetch-asset", id], () => splist("Asset").fetchItem(id), {
    ...fetchOptions,
  });

  if (isLoading || isFetching) return <LoadingSpinner />;
  if (isError) toast.error(`${error}`);

  return (
    <div className="background container">
      <NavBar active="dashboard" section={section} />

      <div className="container--info">
        <HeaderBar title="Asset Detail" hasBackButton={true} />
        <Toaster position="bottom-center" reverseOrder={false} />

        <div className="container--form">
          {/* <Button
            title="Back"
            type="button"
            onClick={() => history.goBack()}
            // onClick={() => history.back()}  // goes to previous page
            size="small"
            className="btn br-xlg w-8 bg-light-grey2"
          /> */}

          <div className="container--details">
            <DetailItem
              heading={"Asset Category"}
              body={asset["Category"] || "Unavailable"}
            />
            <DetailItem
              heading={"Asset Name"}
              body={asset["Name"] || "Unavailable"}
            />
            <DetailItem
              heading={"Serial Number"}
              body={asset["SerialNumber"] || "Unavailable"}
            />
            <DetailItem
              heading={"Asset Description"}
              body={asset["Description"] || "Unavailable"}
            />
            <DetailItem
              heading={"Branch"}
              body={asset["Branch"] || "Unavailable"}
            />
            <DetailItem
              heading={"Request Date"}
              body={asset["Date"] || "Unavailable"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

Detail.propTypes = defaultPropValidation;

export default Detail;
