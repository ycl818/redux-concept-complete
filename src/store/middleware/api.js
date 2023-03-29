import axios from "axios";

const api =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    if (action.type !== "apiRequest") {
      return next(action);
    }

    const { url, method, data, onSuccess, onError } = action.payload;

    try {
      const response = await axios.request({
        baseURL: "http://localhost:5000/api",
        url,
        method,
        data,
      });
      dispatch({ type: onSuccess, payload: response.data });
    } catch (error) {
      dispatch({ type: onError, payload: { error: error.message } });
    }
  };

export default api;
