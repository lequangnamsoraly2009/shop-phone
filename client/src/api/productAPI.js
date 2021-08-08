import API from "./axiosClient";

const ProductFilterAPI = {
  getAllProductsFilter: ({
    categoryFilter,
    sortFilter,
    searchFilter,
    pageFilter,
  }) => {
    return API.get(
      `/api/filter/products?limit=${
        pageFilter * 20
      }&${categoryFilter}&${sortFilter}&title[regex]=${searchFilter}`
    );
  },
  getAllProducts: () => {
    return API.get(`/api/products`);
  },
  deleteImageClound: (public_id, token) => {
    return API.post(
      "/api/admin/delete-image",
      { public_id: public_id },
      {
        headers: { Authorization: token },
      }
    );
  },
  editProduct: ({ paramID, product, token }) => {
    return API.put(
      `/api/admin/products/${paramID}`,
      { ...product },
      {
        headers: { Authorization: token },
      }
    );
  },
  createProduct: ({ product, token }) => {
    return API.post(
      "/api/admin/products",
      { ...product },
      {
        headers: { Authorization: token },
      }
    );
  },
};

export default ProductFilterAPI;
