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
import { defaultPropValidation } from "../../../utils/componentUtils";
import { fetchOptions } from "../../hooks/queryOptions";

const Detail = ({section = ""}) => {
  const { id } = useParams();

  const { isLoading, isFetching, data: category = {}, isError, error } = useQuery(["fetch-category", id], () => splist("Category").fetchItem(id), {...fetchOptions})

  if (isLoading || isFetching) return (<div>Loading...</div>)
  if (isError) toast.error(`${error}`);

  return (
    <div className='background container'>
      <NavBar active='settings' section={section} />

      <div className='container--info'>
        <HeaderBar title='Category Detail' hasBackButton={true} />
        <Toaster position="bottom-center" reverseOrder={false} />

        <div className='container--form'>
          <div className="container--details">
            <DetailItem heading={"Category Name"} body={category["Title"] || "Unavailable"} />
            <DetailItem heading={"Category Description"} body={category["Description"] || "Unavailable"} />
          </div>
        </div>
      </div>
    </div>
  );
};

Detail.propTypes = defaultPropValidation

export default Detail;
