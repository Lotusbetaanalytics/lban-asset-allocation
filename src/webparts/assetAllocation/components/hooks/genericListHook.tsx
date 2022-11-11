import { sp } from "@pnp/sp"

export const fetchItems = async (listName, ) => {
  const items = await sp.web.lists.getByTitle(listName).items.get()
  return items
}

export const createItem = async (listName, formData) => {
  const item = await sp.web.lists.getByTitle(listName).items.add(formData)
  return item
}

export const fetchItem = async (listName, id) => {
  const item = await sp.web.lists.getByTitle(listName).items.getById(id)()
  return item
}

export const fetchItemByTitle = async (listName, title) => {
  let item = await sp.web.lists.getByTitle(listName).items.get()
  item = item.filter((i) => i?.Title === title)[0]
  return item
}

export const updateItem = async (listName, id, formData) => {
  const item = await sp.web.lists.getByTitle(listName).items.getById(id).update(formData)
  return item
}

export const deleteItem = async (listName, id) => {
  const item = await sp.web.lists.getByTitle(listName).items.getById(id).delete()
  return item
}