export const getProducts = async () => {
  const categoriesRes = await fetch(
    "https://dummyjson.com/products/categories"
  );
  const categories = await categoriesRes.json();

  const productsByCategory = await Promise.all(
    categories.map(async (category) => {
      const res = await fetch(
        `https://dummyjson.com/products/category/${category.slug}?limit=3`
      );
      const data = await res.json();

      return data.products;
    })
  );

  const allProducts = productsByCategory.flat();

  return allProducts;
};

export const singleProducts = async (id) => {
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  if (!res.ok) throw new Error("Network response was not ok");
  const data = await res.json();
  return data;
};

export const relatedProducts = async (relatedCategory) => {
  const res = await fetch(
    `https://dummyjson.com/products/category/${relatedCategory}`
  );
  if (!res.ok) throw new Error("Network response was not ok");
  const data = await res.json();
  return data.products;
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
