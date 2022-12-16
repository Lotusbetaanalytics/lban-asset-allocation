import { CircularProgress } from "@material-ui/core";
import * as React from "react";

const LoadingSpinner = () => {
  return (
    <div className="loading">
      <h2 className="loading__content">
        {/* <CircularProgress variant="determinate" value={progress} /> */}
        <CircularProgress />
      </h2>
    </div>
  );
};

export default LoadingSpinner;
