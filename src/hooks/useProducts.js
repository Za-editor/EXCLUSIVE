import { useQuery } from "@tanstack/react-query";
import {
  getProducts,
  productsCategory,
  searchedProducts,
  singleProducts,
  sortProducts,
} from "../services/api/apiCalls";

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    staleTime: 1000 * 60 * 5,
  });
};

export const useProduct = (id) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => singleProducts(id),
    enabled: !!id,
  });
};

export const useSearch = (searchedTerm) => {
  return useQuery({
    queryKey: ["product", searchedTerm],
    queryFn: () => searchedProducts(searchedTerm),
    enabled: !!searchedTerm,
  });
};

export const useSort = (title, type) => {
  return useQuery({
    queryKey: ["product", title, type],
    queryFn: () => sortProducts(title, type),
    enabled: !!title,
    type,
  });
};

export const useCategory = (category) => {
  return useQuery({
    queryKey: ["products", category],
    queryFn: () => productsCategory(category),
    enabled: !!category,
  });
};
