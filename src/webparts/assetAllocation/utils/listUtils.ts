export const findDataById = (id, list, property) => {
  const data = list.find((instance) => instance.ID == id)
  const response = property ? data[property] : data
  return response
}

export const findDataByTitle = (title, list, property = undefined) => {
  const data = list.find((instance) => instance.Title == title)
  const response = property ? data[property] : data
  return response
}

export const getDataIdAndTitle = (inputName, dataTitle, dataList) => {
  // create entries for both the title and id in the form data
  const instance = findDataByTitle(dataTitle, dataList)
  const data = {
    [`${inputName}Id`]: instance['ID'],
    [inputName] : instance['Title'],
  }
  return {data, instance}
}