import * as React from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { HeaderBar, NavBar } from "../../containers";

const Detail = ({status = undefined, section = ""}) => {
  const {id} = useParams();
  const history = useHistory();

  // const goBack = () => history.goBack()


  return (
    <div className='background container'>
      <NavBar active='dashboard' />

      <div className='container--info'>
        <HeaderBar title='Request Detail' />

        <div className='container--form'>
          <Link to="/requests">Back</Link>
          some request details
        </div>
      </div>
    </div>
  );
};

export default Detail;
