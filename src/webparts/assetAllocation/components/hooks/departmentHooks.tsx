import { sp } from "@pnp/sp";

const listName = "Department";

export const fetchDepartments = async () => {
  const assetRequests = await sp.web.lists.getByTitle(listName).items.get();
  return assetRequests;
};

export const createDepartment = async (formData) => {
  const assetRequest = await sp.web.lists
    .getByTitle(listName)
    .items.add(formData);
  return assetRequest;
};

export const fetchDepartment = async (id) => {
  const assetRequest = await sp.web.lists
    .getByTitle(listName)
    .items.getById(id)();
  return assetRequest;
};

export const fetchDepartmentByTitle = async (title) => {
  let assetRequest = await sp.web.lists.getByTitle(listName).items.get();
  assetRequest = assetRequest.filter((i) => i?.Title === title)[0];
  return assetRequest;
};

export const updateDepartment = async (id, formData) => {
  const assetRequest = await sp.web.lists
    .getByTitle(listName)
    .items.getById(id)
    .update(formData);
  return assetRequest;
};

export const deleteDepartment = async (id) => {
  const assetRequest = await sp.web.lists
    .getByTitle(listName)
    .items.getById(id)
    .delete();
  return assetRequest;
};
