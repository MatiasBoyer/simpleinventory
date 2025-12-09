import environment from './environment';

function _autocastValue(value) {
  if (value === null || value === undefined) return null;
  if (typeof value !== 'string') return value;
  const v = value.trim();
  if (v === '') return value;
  const lower = v.toLowerCase();
  if (lower === 'true') return true;
  if (lower === 'false') return false;
  if (lower === 'null') return null;
  // integer or float
  if (/^-?\d+$/.test(v)) return Number(v);
  if (/^-?\d+\.\d+$/.test(v)) return Number(v);
  return value;
}

function _autocastDeep(obj) {
  if (obj === null || obj === undefined) return obj;
  if (Array.isArray(obj)) return obj.map(_autocastDeep);
  if (typeof obj === 'object') {
    const out = {};
    for (const k of Object.keys(obj)) {
      out[k] = _autocastDeep(obj[k]);
    }
    return out;
  }
  return _autocastValue(obj);
}

async function apiWrap(fn) {
  try {
    const data = await fn();
    return { success: true, data: _autocastDeep(data), message: null };
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
      return await res.json();
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
      return await res.json();
    }),
  getInventory: async (id) =>
    apiWrap(async () => {
      const res = await fetch(`${environment.API_BASEURL}/inventory/${id}`, {
        headers: { ...baseHeaders },
      });
      if (!res.ok) throw new Error(await res.text());
      return await res.json();
    }),
  updateItems: async (id, items) => {
    return apiWrap(async () => {
      const res = await fetch(`${environment.API_BASEURL}/inventory/${id}`, {
        method: 'PATCH',
        headers: { ...baseHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map((m) => {
            const obj = {
              item_text: m.item_text,
              quantity: m.quantity,
              id: m.id,
            };

            return Object.fromEntries(
              Object.entries(obj).filter(([_, v]) => v != null)
            );
          }),
        }),
      });
      if (!res.ok) throw new Error(await res.text());
      return await res.json();
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
      return await res.json();
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
      return await res.json();
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
      return await res.json();
    }),
};

const ai = {
  analyzeImage: async (imageBase64, inventoryId) => {
    const res = await fetch(`${environment.API_BASEURL}/ai/imageAnalysis`, {
      method: 'POST',
      headers: { ...baseHeaders, 'Content-Type': 'application/json' },
      body: JSON.stringify({ imageBase64, inventoryId }),
    });
    if (!res.ok) throw new Error(await res.text());

    const json = await res.json();

    console.info('json', json);

    return json;
  },
};

export default { inventory, items, ai };
