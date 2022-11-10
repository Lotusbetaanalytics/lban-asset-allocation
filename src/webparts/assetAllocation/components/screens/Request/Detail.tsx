import * as React from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import {
  // Input,
  // Select,
  Button,
  // Radio,
  // DateInput,
  // FormGroup,
  // Textarea,
} from "mtforms";
import "mtforms/dist/index.css";
import { HeaderBar, NavBar, DetailItem } from "../../containers";

const Detail = ({status = undefined, section = ""}) => {
  const { id } = useParams();
  const history = useHistory();

  // const goBack = () => history.goBack()


  return (
    <div className='background container'>
      <NavBar active='dashboard' />

      <div className='container--info'>
        <HeaderBar title='Request Detail' />

        <div className='container--form'>
          <Button
            title="Back"
            type="button"
            onClick={() => history.goBack()}
            // onClick={() => history.back()}  // goes to previous page
            size="small"
            className="btn br-xlg w-8 bg-light-grey2"
          />
          {/* <Link to="/requests">Back</Link>
          some request details */}
          <div className="container--details">
            <DetailItem heading="test heading" body="test" />
            <DetailItem heading="test heading" body="test" />
            <DetailItem heading="test heading" body="test" />
            <DetailItem heading="test heading" body="test" />
            <DetailItem heading="test heading" body="test" />
            <DetailItem heading="test heading" body="test" />
            <DetailItem heading="test heading" body="test" />
            <DetailItem heading="test heading" body="test" />
            <DetailItem heading="test heading" body="test" />
            <DetailItem heading="test heading" body="test" />
            <DetailItem heading="test heading" body="test" />
            <DetailItem heading="test heading" body="test" />
            <DetailItem heading="test heading" body="test" />
            <DetailItem heading="test heading" body="test" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
