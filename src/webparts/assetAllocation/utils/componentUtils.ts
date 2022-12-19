import * as PropTypes from "prop-types";

export const defaultPropValidation = {
  status: PropTypes.string,
  section: PropTypes.string,
};

export const sectionPropValidation = {
  section: PropTypes.string,
};

export const navPropValidation = {
  active: PropTypes.string,
  section: PropTypes.string,
};
