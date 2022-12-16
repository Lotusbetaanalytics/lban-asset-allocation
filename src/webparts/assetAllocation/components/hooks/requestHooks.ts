import { sp } from "@pnp/sp";

const listName = "AssetRequest";

export const fetchAssetRequests = async (query = undefined) => {
  let assetRequests = await sp.web.lists.getByTitle(listName).items.get();
  console.log(assetRequests);
  // if (query) {
  //   // TODO: confirm this works
  //   // query only works for >=3 key values
  //   assetRequests = assetRequests.filter((i) => {
  //     return (i[Object.keys(query)[0]] === query[Object.keys(query)[0]] &&
  //     i[Object.keys(query)[1]] === query[Object.keys(query)[1]] &&
  //     i[Object.keys(query)[2]] === query[Object.keys(query)[2]])

  //     // for (let q of Object.keys(query)) {
  //     //   i[q] === query[q]
  //     // }
  //   })
  // }
  return assetRequests;
};

export const createAssetRequest = async (formData) => {
  //   {
  //     Firstname: formData["firstname"],
  //     Middlename: formData["middlename"],
  //     Lastname: formData["lastname"],
  //     Batch: formData["batch"],
  //     Email: formData["email"],
  //     PhoneNumber: formData["phone"],
  //     Sex: formData["sex"],
  //     MaritalStatus: formData["maritalStatus"],
  //     YearsOfExperience: formData["experience"],
  //     DateOfBirth: formData["dob"],
  //     Passport: formData["passport"],
  //     Passcode: formData["passcode"],
  //   }
  const assetRequest = await sp.web.lists
    .getByTitle(listName)
    .items.add(formData);
  return assetRequest;
};

export const fetchAssetRequest = async (id) => {
  const assetRequest = await sp.web.lists
    .getByTitle(listName)
    .items.getById(id)();
  return assetRequest;
};

export const updateAssetRequest = async (id, formData) => {
  const assetRequest = await sp.web.lists
    .getByTitle(listName)
    .items.getById(id)
    .update(formData);
  return assetRequest;
};

export const deleteAssetRequest = async (id) => {
  const assetRequest = await sp.web.lists
    .getByTitle(listName)
    .items.getById(id)
    .delete();
  return assetRequest;
};
