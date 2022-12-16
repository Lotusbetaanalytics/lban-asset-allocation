import * as React from "react";
import * as PropTypes from "prop-types";
import MaterialTable from "material-table";
// import { useHistory } from "react-router-dom";
import { displayIcon } from "../../hooks/icon";

const RequestTable = ({
  title = "",
  columns = [],
  data = undefined,
  placeholderData = [],
  viewHandler = undefined,
  updateHandler = undefined,
  removeHandler = undefined,
  modal = undefined, // function that returns the modal
  filter = {},
  hasActions = true,
  actionsType = "view", // type of actions allowed. Can be: "view", "modify", "all"
}) => {
  if (!data || data.length < 1) data = placeholderData;

  const editDeleteAction = [
    {
      icon: "visibility",
      iconProps: { style: { fontSize: "20px", color: "gold" } },
      tooltip: "Edit",
      color: "bg-yellow",

      onClick: (event, rowData) => updateHandler(rowData.ID),
    },
    {
      icon: "visibility",
      iconProps: { style: { fontSize: "20px", color: "gold" } },
      tooltip: "Delete",
      color: "bg-light-grey border-grey",

      onClick: (event, rowData) => removeHandler(rowData.ID),
    },
  ];
  const viewAction = [
    {
      icon: "visibility",
      iconProps: { style: { fontSize: "20px", color: "gold" } },
      tooltip: "View",
      color: "bg-yellow",

      // onClick: (event, rowData) => history.push(`/`),
      onClick: (event, rowData) => viewHandler(rowData.ID),
    },
  ];
  const viewEditDeleteAction = [...viewAction, ...editDeleteAction];

  let relevantAction = undefined;
  if (hasActions && actionsType == "view") relevantAction = viewAction;
  if (hasActions && actionsType == "modify") relevantAction = editDeleteAction;
  if (hasActions && actionsType == "all") relevantAction = viewEditDeleteAction;

  return (
    <div>
      {/* RequestTable */}

      <MaterialTable
        title={title}
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
            // backgroundColor: "#FAF8F8",
            // color: "black",
            backgroundColor: "#EEE",
            fontSize: "16px",
          },
          rowStyle: (rowData) => ({
            backgroundColor:
              (rowData.tableData.id + 1) % 2 == 0 ? "#FAF8F8" : "#FFF",
          }),
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
          Action: (props) => (
            <button
              onClick={(event) => props.action.onClick(event, props.data)}
              className={`btn--form-action--yellow mx-2 mr-1 ${props.action.color}`}
            >
              {displayIcon(props.action.tooltip)}
            </button>
          ),
        }}
      />

      {/* Modal */}
    </div>
  );
};

RequestTable.propTypes = {
  title: PropTypes.string,
  columns: PropTypes.array,
  data: PropTypes.array,
  placeholderData: PropTypes.array,
  viewHandler: PropTypes.func,
  updateHandler: PropTypes.func,
  removeHandler: PropTypes.func,
  modal: PropTypes.func,
  filter: PropTypes.object,
  hasActions: PropTypes.bool,
  actionsType: PropTypes.string,
};

export default RequestTable;
