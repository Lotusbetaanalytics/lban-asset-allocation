import * as React from "react";
import * as PropTypes from "prop-types";
import { Link } from "react-router-dom";
// import {Textarea} from 'mtforms'

const DashboardCard = ({
  title,
  data,
  imageUrl = "",
  Icon,
  url = undefined,
  className = "",
  titleClassName = "",
}) => {
  return (
    <Link className={"card m-2 p-4 br-lg" + " " + className} to={url}>
      <div className="">
        <p className={"cart__title pr-2" + " " + titleClassName}>{title}</p>
        <div className="card__data">{data}</div>
      </div>
      {imageUrl && <img src={imageUrl} alt={title} />}
      <div className="card__icon--container bg-yellow br-auto">
        <Icon />
      </div>
    </Link>
  );
};

DashboardCard.propTypes = {
  title: PropTypes.string,
  data: PropTypes.number,
  imageUrl: PropTypes.string,
  Icon: PropTypes.any,
  url: PropTypes.string,
  className: PropTypes.string,
  titleClassName: PropTypes.string,
  // textBoxOptions: PropTypes.object,
  // name: PropTypes.string,
  // existingHandleChange: PropTypes.func,
  // formData: PropTypes.string,
  // setFormData: PropTypes.func,
};

export default DashboardCard;
