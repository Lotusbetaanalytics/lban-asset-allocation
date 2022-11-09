import { sp } from "@pnp/sp"

export const fetchAssetRequest = async (query = undefined) => {
  let assetRequests = await sp.web.lists.getByTitle("AssetRequest").items.get()
  if (query) {
    assetRequests = assetRequests.filter((i) => {
      assetRequests[Object.keys(query)[0]] === query[Object.keys(query)[0]]
      assetRequests[Object.keys(query)[1]] === query[Object.keys(query)[1]]
      assetRequests[Object.keys(query)[2]] === query[Object.keys(query)[2]]

      // for (let q of Object.keys(query)) {
      //   assetRequests[q] === query[q]
      // }
    })
  }
  return assetRequests
}