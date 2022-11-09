// // @ts-nocheck
import * as  React from 'react'
import MaterialTable from "material-table";
import { useQuery } from 'react-query';
import { fetchAssetRequest } from '../../hooks/requestHooks';
import { displayIcon } from '../../hooks/icon';

const RequestTable = ({data = undefined, updateHandler = undefined, removeHandler = undefined, filter = {}, hasActions = true}) => {

  type IType =
    | "string"
    | "boolean"
    | "numeric"
    | "date"
    | "datetime"
    | "time"
    | "currency";
  const string: IType = "string";
  const [columns, setColumns] = React.useState([
    { title: "Name", field: "Employee", type: "string" as const },
    { title: "Email", field: "EmployeeEmail", type: "string" as const },
    { title: "Phone", field: "Phone", type: "string" as const },
    { title: "Department", field: "Department", type: "string" as const },
    { title: "Branch", field: "Branch", type: "string" as const },
    { title: "Asset", field: "Asset", type: "string" as const }, 
    // { title: "Title", field: "Title", type: "string" as const },
  ]);

  const placeholderData = [
    {
      Employee: "Test Employee 0",
      EmployeeEmail: "testemployee0@aa.com",
      Department: 'Test Department 0',
      Branch: "Lagos",
      Asset: "Test Asset 0"
    }
  ]

  if (!data) {
    const { isLoading, isFetching, data: rData, isError, error } = useQuery("asset-request", fetchAssetRequest, {placeholderData})
    data = rData
    console.log(data, isLoading, isFetching, isError)
  }

  return (
    <div>
      RequestTable
      <MaterialTable
        title=""
        columns={columns}
        // data={data}
        data={placeholderData}
        options={{
          // exportButton: true,
          // search: false,
          // actionsCellStyle: {
          //   backgroundColor: "none",
          //   color: "#FF00dd",
          // },
          actionsColumnIndex: -1,

          headerStyle: {
            backgroundColor: "#ccc",
            color: "black",
            fontSize: "12px",
          },
        }}
        style={{
          boxShadow: "none",
          width: "100%",
          background: "none",
          fontSize: "12px",
        }}
        // icons={{Add: () => 'Add Row'}}
        actions={[
          {
            icon: "visibility",
            iconProps: { style: { fontSize: "20px", color: "gold" } },
            tooltip: "Delete",
            // color: "mtn__red",

            onClick: (event, rowData) => {
              console.log("rowData: ", rowData);
              // removeHandler(rowData.__rowNum__);
              // removeHandler(rowData.tableData.id);
            },
          },
        ]}
        components={{
          Action: (props) => (
            <button
              onClick={(event) => props.action.onClick(event, props.data)}
              className={`mtn__btn__SMtable ${props.action.color}`}
            >
              See More
              {displayIcon(props.action.tooltip)}
            </button>
          ),
        }}
      />
    </div>
  )
}

export default RequestTable