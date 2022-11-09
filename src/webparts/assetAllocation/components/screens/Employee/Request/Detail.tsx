import * as React from "react";
import { HeaderBar, NavBar } from "../../../containers";

const Detail = () => {
  return (
    <div className='background container'>
      <NavBar active='dashboard' />

      <div className='container--info'>
        <HeaderBar title='Request Detail' />


        <div className='container--form'>
          some request details
        </div>
      </div>
    </div>
  );
};

export default Detail;
