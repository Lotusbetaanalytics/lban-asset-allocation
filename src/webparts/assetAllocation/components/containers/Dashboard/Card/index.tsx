import * as React from 'react'
import * as PropTypes from "prop-types";
// import {Textarea} from 'mtforms'

const DashboardCard = ({title, data, imageUrl = "", Icon, className = ""}) => {

  return (
    <div className={'card m-2 p-4 br-lg' + className}>
      <div className="">
        <p className='cart__title pr-2'>{title}</p>
        <div className='card__data'>{data}</div>
      </div>
      {imageUrl && <img src={imageUrl} alt={title} />}
      <div className="card__icon--container bg-yellow br-auto">
        <Icon />
      </div>
    </div>
  )
}

DashboardCard.propTypes = {
  title: PropTypes.string,
  data: PropTypes.number,
  imageUrl: PropTypes.string,
  className: PropTypes.string,
  // textBoxOptions: PropTypes.object,
  // name: PropTypes.string,
  // existingHandleChange: PropTypes.func,
  // formData: PropTypes.string,
  // setFormData: PropTypes.func,
}

export default DashboardCard