import * as React from "react";
import { HeaderBar, NavBar } from "../../../containers";
import RequestTable from "../../../containers/RequestTable";

const Manage = () => {
  const [data, setData] = React.useState([])

  return (
    <div className='background container'>
      <NavBar active='dashboard' />

      <div className='container--info'>
        <HeaderBar title='Manage Requests' />

        <div className='container--form'>
          <RequestTable />
        </div>
      </div>
    </div>
  );
};

export default Manage;
