import * as React from 'react'
import * as PropTypes from "prop-types";
import {Textarea} from 'mtforms'

const DetailItem = ({heading, body, hasTextBox = false, textBoxOptions = undefined, className = ""}) => {
  return (
    <div className={'detail-item m-4 p-2' + className}>
      <h3>{heading}</h3>
      {hasTextBox 
        ? <Textarea
            // name={textBoxOptions["name"]}
            // label={textBoxOptions["label"]}
            value={textBoxOptions["value"]}
            onChange={textBoxOptions["onChange"]}
            // validationHandler={textBoxOptions["validationHandler"]}
            // error={textBoxOptions["error"]}
            className={textBoxOptions["className"]}
            required={textBoxOptions["required"]}
            size={textBoxOptions["size"] || "large"}
          /> 
        : <p>{body}</p>}
    </div>
  )
}

DetailItem.propTypes = {
  heading: PropTypes.string,
  body: PropTypes.string,
  hasTextBox: PropTypes.bool,
  textBoxOptions: PropTypes.object,
  className: PropTypes.string,
}

export default DetailItem