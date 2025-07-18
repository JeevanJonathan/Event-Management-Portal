import { useState } from "react";
import VendorViewModal from "./VendorViewModal";
import { useDispatch } from "react-redux";
import { addToBooking } from "../../store/actions";
import toast from "react-hot-toast";

export default function VendorCard({
  vendorId,
  vendorName,
  vendorImage,
  vendorEmail,
  vendorPhone,
  vendorPrice,
  vendorDescription,
  city,
  state,
  serviceQuantity,
  about = false,
}) {
  const [openVendorViewModal, setOpenVendorViewModal] = useState(false);
  const buttonLoader = false;
  const [selectedViewVendor, setSelectedViewVendor] = useState("");
  const dispatch = useDispatch();
  const isAvailable = serviceQuantity && Number(serviceQuantity) > 0;

  function handleVendorView(vendor) {
    if (!about) {
      setSelectedViewVendor(vendor);
      setOpenVendorViewModal(true);
    }
  }

  function addToBookingHandler(bookingItems) {
    dispatch(addToBooking(bookingItems, 1, toast));
  }

  return (
    <div className="border rounded-lg shadow-xl overflow-hidden transition-shadow duration-300">
      <div
        className="w-full overflow-hidden aspect-[3/2]"
        onClick={() => {
          handleVendorView({
            id: vendorId,
            vendorName,
            vendorImage,
            vendorDescription,
            vendorPrice,
            vendorEmail,
            vendorPhone,
            city,
            state,
            serviceQuantity,
          });
        }}
      >
        <img
          className="w-full h-full cursor-pointer transition-transform duration-300 transform hover:scale-105"
          src={vendorImage}
          alt={vendorName}
        />
      </div>

      <div className="p-4">
        <h2
          className="text-lg font-semibold mb-2 cursor-pointer"
          onClick={() => {
            handleVendorView({
              id: vendorId,
              vendorName,
              vendorImage,
              vendorDescription,
              vendorPrice,
              vendorEmail,
              vendorPhone,
              city,
              state,
              serviceQuantity,
            });
          }}
        >
          {vendorName}
        </h2>

        <div className="min-h-20 max-h-20 ">
          <p className="text-gray-600 text-sm">{vendorDescription}</p>
        </div>

        <div className="min-h-20 max-h-20 text-black">
          <h1 className="font-bold text-black text-3xl">Rs {vendorPrice}</h1>
        </div>

        <div className="flex items-center justify-end">
          <button
            disabled={!isAvailable || buttonLoader}
            onClick={() =>
              addToBookingHandler({
                vendorId,
                vendorName,
                vendorImage,
                vendorDescription,
                vendorPrice,
                vendorEmail,
                vendorPhone,
                serviceQuantity,
              })
            }
            className={`bg-blue-500 ${
              isAvailable ? "opacity-100 hover:bg-blue-600" : "opacity-70"
            } text-white py-2 px-3 rounded-lg items-center transition-colors duration-300 w-36 flex justify-center`}
          >
            Book
          </button>
        </div>
      </div>
      <VendorViewModal
        open={openVendorViewModal}
        setOpen={setOpenVendorViewModal}
        vendor={selectedViewVendor}
        isAvailable={isAvailable}
      />
    </div>
  );
}
