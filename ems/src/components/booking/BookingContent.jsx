import { HiOutlineTrash } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { removeFromBookings } from "../../store/actions";
import toast from "react-hot-toast";

export default function BookingContent({
  vendorId,
  vendorName,
  vendorImage,
  vendorDescription,
  vendorPrice,
  vendorEmail,
  vendorPhone,
  bookingId,
}) {
  const dispatch = useDispatch();

  function removeVendorFromBookings(bookingItems) {
    dispatch(removeFromBookings(bookingItems, toast));
  }
  return (
    <div className="grid md:grid-cols-5 grid-cols-4 md:text-md text-sm gap-4   items-center  border border-slate-200  rounded-md  lg:px-4  py-4 p-2">
      <div className="md:col-span-2 justify-self-start flex  flex-col gap-2 ">
        <div className="flex md:flex-row flex-col lg:gap-4 sm:gap-3 gap-0 items-start">
          <h3 className="lg:text-[17px] text-sm font-semibold text-slate-600">
            {vendorName}
          </h3>
        </div>

        <div className="md:w-36 sm:w-24 w-12">
          <img
            src={vendorImage}
            alt={vendorName}
            className="md:h-36 sm:h-24 h-12 w-full object-cover rounded-md"
          />

          <div className="flex items-start gap-5 mt-3">
            <button
              className="flex items-center font-semibold space-x-2 px-4 py-1 text-xs border border-rose-600 text-rose-600 rounded-md hover:bg-red-50 transition-colors duration-200"
              onClick={() =>
                removeVendorFromBookings({
                  vendorId,
                  vendorName,
                  vendorImage,
                  vendorDescription,
                  vendorPrice,
                  vendorEmail,
                  vendorPhone,
                })
              }
            >
              <HiOutlineTrash size={16} className="text-rose-600" />
              Remove
            </button>
          </div>
        </div>
      </div>

      <div className="justify-self-center lg:text-[17px] text-sm text-slate-600 font-semibold">
        {vendorPrice}
      </div>
    </div>
  );
}
