import { useHistory } from "react-router-dom";
import { getDataIdAndTitle } from "./listUtils";

export const goBack = () => {
  const history = useHistory()
  history.goBack()
}

// handle changes for select inputs, adding both the text value and id to formData
export const handleSelectChange = (name, value, list, formData, setFormData, query = undefined) => {
  const { data, instance } = getDataIdAndTitle(name, value, list, query);
  setFormData({ ...formData, ...data });
};