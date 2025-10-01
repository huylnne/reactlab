

const DUMMY_USER_ID = 1; 

export const cartService = {
  
  fetchCart: async () => {
    const res = await fetch(`https://dummyjson.com/carts/user/${DUMMY_USER_ID}`);
    if (!res.ok) throw new Error('Failed to fetch cart');
    const data = await res.json();
   
    return data.carts[0]?.products || [];
  },

  
  removeItem: async (itemId) => {
    const res = await fetch(`https://dummyjson.com/carts/1/items/${itemId}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to remove item');
    return await res.json();
  },

 
  updateItemQty: async (itemId, quantity) => {
    const res = await fetch(`https://dummyjson.com/carts/1/items/${itemId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quantity }),
    });
    if (!res.ok) throw new Error('Failed to update quantity');
    return await res.json();
  },
};