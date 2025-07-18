const initialState = {
  booking: [],
  priceAgreed: 0,
  bookingId: null,
};

// configuring redux for bookings

export const bookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_BOOKING":
      const vendorToAdd = action.payload;
      const existingVendor = state.booking.find(
        (item) => item.vendorId === vendorToAdd.vendorId
      );

      if (existingVendor) {
        return state;
      }

      return {
        ...state,
        booking: [...state.booking, vendorToAdd],
      };

    case "REMOVE_BOOKING":
      return {
        ...state,
        booking: state.booking.filter(
          (item) => item.vendorId !== action.payload.vendorId
        ),
      };

    default:
      return state;
  }
};
