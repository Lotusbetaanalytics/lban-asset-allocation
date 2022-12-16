import { sp } from "@pnp/sp";

// Generic function for interacting with sp lists using react query
const splist = (listName) => {
  return {
    fetchItems: async () => {
      const items = await sp.web.lists.getByTitle(listName).items.get();
      return items;
    },
    createItem: async (formData) => {
      const item = await sp.web.lists.getByTitle(listName).items.add(formData);
      return item;
    },
    fetchItem: async (id) => {
      // if (!id) throw new Error("Id not provided")
      if (!id) return;
      const item = await sp.web.lists.getByTitle(listName).items.getById(id)();
      return item;
    },
    fetchItemByTitle: async (title) => {
      // if (!title) throw new Error("Title not provided")
      if (!title) return;
      let item = await sp.web.lists.getByTitle(listName).items.get();
      item = item.filter((i) => i?.Title === title)[0];
      return item;
    },
    updateItem: async (id, formData) => {
      // if (!id) throw new Error("Id not provided")
      if (!id) return;
      // console.log({update: true, id, formData})
      const item = await sp.web.lists
        .getByTitle(listName)
        .items.getById(id)
        .update(formData);
      return item;
    },
    deleteItem: async (id) => {
      // if (!id) throw new Error("Id not provided")
      if (!id) return;
      const item = await sp.web.lists
        .getByTitle(listName)
        .items.getById(id)
        .delete();
      return item;
    },
  };
};

export default splist;
