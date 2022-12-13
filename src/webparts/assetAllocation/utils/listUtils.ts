import { sp } from "@pnp/sp"


export const getUserData = async () =>  await sp.web.currentUser.get()
export const getUserGroups = async () => await sp.web.currentUser.groups.get()
export const getUserProfile = async () =>  await  sp.profiles.myProperties.get()


export const validateUserRole = async (section) => {
  let validated = true
  if (section == "employee") return validated

  let groups = await getUserGroups()
  groups = groups.filter(g => g.Title.toLowerCase().indexOf(section) !== -1)
  if (groups.length < 1) validated = false

  return validated
}

export const checkUserHasPermissions = async () => {
  const user  = await getUserProfile()
  // TODO: figure out how to check user permissions
  return true
}

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