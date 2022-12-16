import * as React from "react";
import { HeaderBar, LoadingSpinner, NavBar, Table } from "../../containers";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Button } from "mtforms";
import "mtforms/dist/index.css";
import { useHistory } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import splist from "../../hooks/splistHook";
import { fetchOptions } from "../../hooks/queryOptions";
import { defaultPropValidation } from "../../../utils/componentUtils";

const Manage = ({ section = "" }) => {
  const history = useHistory();
  const queryClient = useQueryClient();

  const titleText = `Available Assets`;
  const sectionUrl = `/app/${section ? section + "/" : ""}`;

  // type IType = "string" | "boolean" | "numeric" | "date" | "datetime" | "time" | "currency";
  // const string: IType = "string";
  const columns = [
    { title: "Serial Number", field: "SerialNumber", type: "string" as const },
    { title: "Name", field: "Name", type: "string" as const },
    { title: "Description", field: "Description", type: "string" as const },
    { title: "Category", field: "Category", type: "string" as const },
    { title: "Branch", field: "Branch", type: "string" as const },
    { title: "RamSize", field: "RamSize", type: "string" as const },
    { title: "HardDriveSize", field: "HardDriveSize", type: "string" as const },
    { title: "SSD", field: "SSD", type: "string" as const },
    { title: "Date", field: "Date", type: "string" as const },
  ];

  const viewHandler = (id) => history.push(`${sectionUrl}asset/detail/${id}`);
  const updateHandler = (id) => history.push(`${sectionUrl}asset/${id}`);
  const removeHandler = (id) => mutate(id);

  // get assets
  const {
    isLoading,
    isFetching,
    data: assets = [],
    isError,
    error,
  } = useQuery("fetch-assets", splist("Asset").fetchItems, { ...fetchOptions });
  // console.log("get request", assets, isLoading, isFetching, isError)

  // delete asset
  const {
    data: delData,
    isLoading: delIsLoading,
    isError: delIsError,
    error: delError,
    mutate,
  } = useMutation(splist("Asset").deleteItem, {
    onSuccess: (data) => {
      console.log("Asset Deleted Sucessfully: ", data);
      toast.success("Asset Deleted Sucessfully");
    },
    onError: (error) => {
      console.log("Error Deleting Asset: ", error);
      toast.error("Error Deleting Asset");
    },
    onSettled: () => {
      queryClient.invalidateQueries("fetch-assets");
    },
  });
  // console.log("delete request", delData, delIsLoading, delIsError)

  const data = assets;

  if (isLoading || delIsLoading) return <LoadingSpinner />;
  if (isError || delIsError) toast.error(`${error || delError}`);

  return (
    <div className="background container">
      <NavBar active="asset" section={section} />

      <div className="container--info">
        <HeaderBar title={titleText} />
        <Toaster position="bottom-center" reverseOrder={false} />
        <div className="container--info">
          <Button
            title="Add Asset"
            type="button"
            onClick={() => history.push(`${sectionUrl}asset`)}
            size="small"
            className="btn--purple br-xlg w-12"
          />
        </div>
        <div className="container--form">
          <Table
            columns={columns}
            data={data}
            viewHandler={viewHandler}
            updateHandler={updateHandler}
            removeHandler={removeHandler}
            actionsType="all"
          />
        </div>
      </div>
    </div>
  );
};

Manage.propTypes = defaultPropValidation;

export default Manage;
