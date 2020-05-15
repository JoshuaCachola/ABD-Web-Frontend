const api = {
  url:
    process.env.NODE_DEV === "development"
      ? process.env.DEV_API
      : process.env.PROD_API,
};

export default api;