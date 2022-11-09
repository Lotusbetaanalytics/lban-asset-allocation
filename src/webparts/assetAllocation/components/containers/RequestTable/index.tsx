// @ts-nocheck
import * as React from "react";
import MaterialTable from "material-table";
import { useHistory } from "react-router-dom";
import { displayIcon } from "../../hooks/icon";

const RequestTable = ({
  data = undefined,
  updateHandler = undefined,
  removeHandler = undefined,
  filter = {},
  hasActions = true,
  actionsType = "view",
}) => {
  
  type IType = "string" | "boolean" | "numeric" | "date" | "datetime" | "time" | "currency";
  const string: IType = "string";
  const [columns, setColumns] = React.useState([
    { title: "Name", field: "Employee", type: "string" as const },
    { title: "Email", field: "EmployeeEmail", type: "string" as const },
    { title: "Phone", field: "Phone", type: "string" as const },
    { title: "Department", field: "Department", type: "string" as const },
    { title: "Branch", field: "Branch", type: "string" as const },
    { title: "Asset", field: "Asset", type: "string" as const },
  ]);

  const history = useHistory();

  if (!data || data.length < 1) {
    const placeholderData = [
      {
        Employee: "Test Employee 0",
        EmployeeEmail: "testemployee0@aa.com",
        Department: "Test Department 0",
        Branch: "Lagos",
        Asset: "Test Asset 0",
      },
    ];
    data = placeholderData;
  }

  const editDeleteAction = [
    {
      icon: "visibility",
      iconProps: { style: { fontSize: "20px", color: "gold" } },
      tooltip: "Edit",
      color: "bg-yellow",

      onClick: (event, rowData) => {
        // setID(rowData.ID);
      },
    },
    {
      icon: "visibility",
      iconProps: { style: { fontSize: "20px", color: "gold" } },
      tooltip: "Delete",
      color: "bg-light-grey border-grey",

      onClick: (event, rowData) => {
        removeHandler(rowData.ID);
      },
    },
  ];
  const viewAction = [
    {
      icon: "visibility",
      iconProps: { style: { fontSize: "20px", color: "gold" } },
      tooltip: "View",
      color: "bg-yellow",

      onClick: (event, rowData) => history.push(`/`),
    },
  ];

  const relevantAction = undefined;
  if (hasActions && actionsType == "view") relevantAction = viewAction;
  if (hasActions && actionsType == "modify") relevantAction = editDeleteAction;

  return (
    <div>
      {/* RequestTable */}

      <MaterialTable
        title=''
        columns={columns}
        data={data}
        options={{
          exportButton: true,
          actionsCellStyle: {
            backgroundColor: "none",
            color: "#FF00dd",
          },
          actionsColumnIndex: -1,

          headerStyle: {
            backgroundColor: "#FAF8F8",
            // color: "black",
            fontSize: "16px",
          },
        }}
        style={{
          boxShadow: "none",
          width: "100%",
          background: "none",
          fontSize: "14px",
        }}
        // icons={{Add: () => 'Add Row'}}
        actions={relevantAction}
        components={{
          Action: props => (
            <button
              onClick={event => props.action.onClick(event, props.data)}
              className={`btn--form-action--yellow mx-2 mr-1 ${props.action.color}`}
            >
              {displayIcon(props.action.tooltip)}
            </button>
          ),
        }}
      />
    </div>
  );
};

export default RequestTable;
