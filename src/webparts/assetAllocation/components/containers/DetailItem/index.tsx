import * as React from 'react'
import * as PropTypes from "prop-types";

const DetailItem = ({heading, body, className = ""}) => {
  return (
    <div className={'detail-item m-4 p-2' + className}>
      <h3>{heading}</h3>
      <p>{body}</p>
    </div>
  )
}

DetailItem.propTypes = {
  heading: PropTypes.string,
  body: PropTypes.string,
  className: PropTypes.string,
}

export default DetailItem