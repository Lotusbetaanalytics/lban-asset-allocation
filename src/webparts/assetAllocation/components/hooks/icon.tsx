import * as React from "react";
import { FaEdit, FaTrash, FaEye, FaPlus } from "react-icons/fa";

export const displayIcon = (tooltip) => {
  switch (tooltip) {
    case "Edit":
      return <FaEdit />;
    case "Delete":
      return <FaTrash />;
    case "View":
      return <FaEye />;
    case "Select":
      return <FaPlus />;
    default:
  }
};
