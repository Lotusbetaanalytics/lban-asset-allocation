import * as React from 'react'
import * as PropTypes from "prop-types";
// import {Textarea} from 'mtforms'

const DetailItem = ({heading, body, hasTextBox = false, className = ""}) => {

  return (
    <div className={'detail__item m-2 p-1' + className}>
      <h3>{heading}</h3>
      {hasTextBox 
        ? "" 
        : <p>{body}</p>}
    </div>
  )
}

DetailItem.propTypes = {
  heading: PropTypes.string,
  body: PropTypes.string,
  hasTextBox: PropTypes.bool,
  className: PropTypes.string,
  // textBoxOptions: PropTypes.object,
  // name: PropTypes.string,
  // existingHandleChange: PropTypes.func,
  // formData: PropTypes.string,
  // setFormData: PropTypes.func,
}

export default DetailItem