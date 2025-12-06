import environment from './environment';

async function apiWrap(fn) {
  try {
    const data = await fn();
    return { success: true, data, message: null };
  } catch (err) {
    return { success: false, data: null, message: err?.message || String(err) };
  }
}

const baseHeaders = {
  Authorization: `Bearer ${localStorage.getItem('bearer_token')}`,
};

const inventory = {
  create: async (inventory_name) =>
    apiWrap(async () => {
      const res = await fetch(`${environment.API_BASEURL}/inventory/new`, {
        method: 'POST',
        headers: { ...baseHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify({ inventory_name }),
      });
      if (!res.ok) throw new Error(await res.text());
      return res.json();
    }),
  delete: async (id) =>
    apiWrap(async () => {
      const res = await fetch(`${environment.API_BASEURL}/inventory/${id}`, {
        headers: { ...baseHeaders },
        method: 'DELETE',
      });
      if (!res.ok) throw new Error(await res.text());
      return res.text();
    }),
  getList: async () =>
    apiWrap(async () => {
      const res = await fetch(`${environment.API_BASEURL}/inventory/list`, {
        headers: { ...baseHeaders },
      });
      if (!res.ok) throw new Error(await res.text());
      return res.json();
    }),
  update: async (id, updates) => {
    apiWrap(async () => {
      const res = await fetch(`${environment.API_BASEURL}/inventory/${id}`, {
        method: 'POST',
        headers: { ...baseHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      if (!res.ok) throw new Error(await res.text());
      return res.json();
    });
  },
};

const items = {
  getList: async (inventoryId) =>
    apiWrap(async () => {
      const res = await fetch(
        `${environment.API_BASEURL}/inventory/${inventoryId}/items`,
        { headers: { ...baseHeaders } }
      );
      if (!res.ok) throw new Error(await res.text());
      return res.json();
    }),
  addItem: async (inventoryId, item_text, quantity) =>
    apiWrap(async () => {
      const res = await fetch(
        `${environment.API_BASEURL}/inventory/${inventoryId}/items`,
        {
          method: 'POST',
          headers: { ...baseHeaders, 'Content-Type': 'application/json' },
          body: JSON.stringify({ item_text, quantity }),
        }
      );
      if (!res.ok) throw new Error(await res.text());
      return res.json();
    }),
  removeItem: async (inventoryId, itemId) =>
    apiWrap(async () => {
      const res = await fetch(
        `${environment.API_BASEURL}/inventory/${inventoryId}/items/${itemId}`,
        {
          headers: { ...baseHeaders },
          method: 'DELETE',
        }
      );
      if (!res.ok) throw new Error(await res.text());
      return res.text();
    }),
  modifyQuantity: async (inventoryId, itemId, itemQuantity) =>
    apiWrap(async () => {
      const res = await fetch(
        `${environment.API_BASEURL}/inventory/${inventoryId}/items/${itemId}`,
        {
          method: 'PATCH',
          headers: { ...baseHeaders, 'Content-Type': 'application/json' },
          body: JSON.stringify({ quantity: itemQuantity }),
        }
      );
      if (!res.ok) throw new Error(await res.text());
      return res.json();
    }),
};

const ai = {
  analyzeImage: async (base64, inventoryId = undefined) =>
    apiWrap(async () => {
      const res = await fetch(`${environment.API_BASEURL}/ai/imageAnalysis`, {
        method: 'POST',
        headers: { ...baseHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify({ base64, inventoryId }),
      });
      if (!res.ok) throw new Error(await res.text());
      return res.json();
    }),
};

export default { inventory, items, ai };
