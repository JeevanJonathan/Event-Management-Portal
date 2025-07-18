import api from "../../api/api";

export const fetchVendors = (queryString) => async (dispatch) => {
  try {
    dispatch({ type: "IS_FETCHING" });
    const { data } = await api.get(`/public/vendors?${queryString}`);
    dispatch({
      type: "FETCH_VENDORS",
      payload: data.vendors,
      pageNumber: data.pageNumber,
      pageSize: data.pageSize,
      totalElements: data.totalElements,
      totalPages: data.totalPages,
      lastPage: data.lastPage,
    });
    dispatch({ type: "IS_SUCCESS" });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "IS_ERROR",
      payload: error?.response?.data?.message || "Failed to fetch vendors",
    });
  }
};

export const fetchCategories = () => async (dispatch) => {
  try {
    dispatch({ type: "CATEGORY_LOADER" });
    const { data } = await api.get(`/public/categories`);
    dispatch({
      type: "FETCH_CATEGORIES",
      payload: data.categories,
      pageNumber: data.pageNumber,
      pageSize: data.pageSize,
      totalElements: data.totalElements,
      totalPages: data.totalPages,
      lastPage: data.lastPage,
    });
    dispatch({ type: "CATEGORY_SUCCESS" });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "IS_ERROR",
      payload: error?.response?.data?.message || "Failed to fetch categories!",
    });
  }
};

export const addToBooking =
  (data, quantity = 1, toast) =>
  (dispatch, getState) => {
    // find vendor
    const { vendors } = getState().vendors;
    const getVendor = vendors.find((item) => item.vendorId === data.vendorId);

    const isQuantityExist = getVendor.serviceQuantity >= quantity;

    if (isQuantityExist) {
      dispatch({
        type: "ADD_BOOKING",
        payload: { ...data, serviceQuantity: quantity },
      });
      toast.success(`${data.vendorName} added to your bookings`);
      localStorage.setItem(
        "bookingItems",
        JSON.stringify(getState().bookings.booking)
      );
    } else {
      toast.error("Vendor is not able to provide service at this moment!");
    }
  };

export const removeFromBookings = (data, toast) => (dispatch, getState) => {
  dispatch({
    type: "REMOVE_BOOKING",
    payload: data,
  });

  dispatch({
    type: "UPDATE_VENDOR_STATUS",
    payload: {
      vendorId: data.vendorId,
      availabilityStatus: "Available",
    },
  });
  toast.success(`${data.vendorName} removed from bookings`);
  localStorage.setItem(
    "bookingItems",
    JSON.stringify(getState().bookings.booking)
  );
};

export const authenticateLoginUser =
  (sendData, toast, reset, navigate, setLoader) => async (dispatch) => {
    try {
      setLoader(true);
      const { data } = await api.post("/auth/login", sendData);
      dispatch({
        type: "LOGIN_USER",
        payload: data,
      });
      localStorage.setItem("auth", JSON.stringify(data));
      reset();
      toast.success("Login Successful");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Internal server error!");
    } finally {
      setLoader(false);
    }
  };

export const registerNewUser =
  (sendData, toast, reset, navigate, setLoader) => async (dispatch) => {
    try {
      setLoader(true);
      const { data } = await api.post("/auth/signup", sendData);
      reset();
      toast.success(data?.message || "User Registered Successfully...");
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message ||
          error?.response?.data?.password ||
          "Internal server error!"
      );
    } finally {
      setLoader(false);
    }
  };

export const logOutUser = (navigate) => (dispatch) => {
  dispatch({
    type: "LOG_OUT",
  });
  localStorage.removeItem("auth");
  navigate("/login");
};

export const registerUserEvent =
  (sendData, toast, eventId, setOpenEventModal) =>
  async (dispatch, getState) => {
    dispatch({ type: "BUTTON_LOADER" });
    try {
      const { data } = await api.post("/events", sendData);
      toast.success("Event details saved successfully");
      dispatch({ type: "IS_SUCCESS" });
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Internal Server Error");
      dispatch({ type: "IS_ERROR", payload: null });
    } finally {
      setOpenEventModal(false);
    }
  };
