export const getProducts = async () => {
  const res = await fetch("https://dummyjson.com/products");
  if (!res.ok) throw new Error("Network response was not ok");
  const data = await res.json();
  return data.products;
};

export const singleProducts = async (id) => {
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  if (!res.ok) throw new Error("Network response was not ok");
  const data = await res.json();
  return data;
};

export const searchedProducts = async (searchedTerm) => {
  const res = await fetch(
    `https://dummyjson.com/products/search?q=${searchedTerm}`
  );
  if (!res.ok) throw new Error("Network response was not ok");
  const data = await res.json();
  return data.products;
};

export const sortProducts = async (title, type) => {
  const res = await fetch(
    `https://dummyjson.com/products?sortBy=${title}&order=${type}`
  );
  if (!res.ok) throw new Error("Network response was not ok");
  const data = await res.json();
  return data.products;
};

export const productsCategory = async (category) => {
  const res = await fetch(
    `https://dummyjson.com/products/category/${category}`
  );
  if (!res.ok) throw new Error("Network response was not ok");
  const data = await res.json();
  return data.products;
};
