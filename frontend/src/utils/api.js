const inventory = {
  create: async (name) => {
    return { success: true, message: 'test', data: { id: 0 } };
  },
  delete: async (id) => {
    return { success: true, message: 'test' };
  },
  getList: async () => {
    return {
      success: true,
      message: null,
      data: [
        {
          id: 0,
          label: 'test',
        },
      ],
    };
  },
};

const items = {
  getList: async (inventoryId) => {
    return {
      success: true,
      message: null,
      data: [],
    };
  },
  addItem: async (inventoryId, itemName, itemQuantity) => {
    return {
      success: true,
      message: null,
      data: [],
    };
  },
  removeItem: async (inventoryId, itemId) => {
    return {
      success: true,
      message: null,
      data: [],
    };
  },
  modifyQuantity: async (inventoryId, itemId) => {
    return {
      success: true,
      message: null,
      data: [],
    };
  },
};

const ai = {
  analyzeImage: async (base64) => {
    return {
      success: true,
      message: null,
      data: [],
    };
  },
};

export default { inventory, items, ai };
