const api = {
  url:
    process.env.NODE_ENV === "development"
      ? process.env.REACT_APP_DEV_API || "http://localhost:8080/api/v1"
      : process.env.REACT_APP_PROD_API ||
        "https://already-been-done.herokuapp.com/api/v1",
};

export default api;
