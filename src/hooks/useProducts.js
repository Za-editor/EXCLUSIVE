import { useQuery } from "@tanstack/react-query";
import {
  getProducts,
  productsCategory,
  relatedProducts,
  singleProducts,
} from "../services/api/apiCalls";

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
  });
};

export const useProduct = (id) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => singleProducts(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
  });
};
export const useRelatedProduct = (relatedCategory) => {
  return useQuery({
    queryKey: ["product", relatedCategory],
    queryFn: () => relatedProducts(relatedCategory),
    enabled: !!relatedCategory,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
  });
};

export const useCategory = (category) => {
  return useQuery({
    queryKey: ["products", category],
    queryFn: () => productsCategory(category),
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
  });
};
