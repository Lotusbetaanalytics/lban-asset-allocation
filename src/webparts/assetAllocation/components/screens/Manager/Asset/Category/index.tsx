import * as React from "react";
import { HeaderBar, NavBar } from "../../../../containers";

const AssetCategory = () => {
  return (
    <div className="background container">
      <NavBar active="dashboard" />

      <div className="container--info">
        <HeaderBar title="Dashboard" />
      </div>
    </div>
  );
};

export default AssetCategory;
