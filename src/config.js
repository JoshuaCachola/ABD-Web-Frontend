const api = {
  url:
    process.env.NODE_ENV === "development"
      ? process.env.REACT_APP_DEV_API || "http ://localhost:8008/api/v1"
      : process.env.REACT_APP_PROD_API || "https://already-been-done.herokuapp.com",
};

export default api;