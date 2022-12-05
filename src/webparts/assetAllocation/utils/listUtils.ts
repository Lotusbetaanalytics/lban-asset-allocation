import { sp } from "@pnp/sp"

export const getStaffById = async (id = undefined) => {
  if (!id) return "Unavailable" 
  const staff = await sp.web.getUserById(id)()
  return staff
}

export const findDataById = (id, list, property = undefined) => {
  const data = list.find((instance) => instance.ID == id)
  const response = property ? data[property] : data
  return response
}

export const findDataByTitle = (title, list, property = undefined) => {
  const data = list.find((instance) => instance.Title == title)
  const response = property ? data[property] : data
  return response
}

export const getDataIdAndTitle = (inputName, dataTitle, dataList, query = undefined) => {
  // create entries for both the title and id in the form data
  const instance = findDataByTitle(dataTitle, dataList)
  const data = {
    [`${inputName}IdId`]: instance['ID'],
    [inputName] : instance['Title'],
  }
  if (query) data[Object.keys(query)[0]] = instance[query[Object.keys(query)[0]]]
  return {data, instance}
}