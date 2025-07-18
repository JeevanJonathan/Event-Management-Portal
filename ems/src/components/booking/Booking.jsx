import { TbBrandBooking } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import BookingContent from "./BookingContent";
import BookingEmpty from "./BookingEmpty";
import { Link } from "react-router-dom";
import { MdArrowBack, MdShoppingCart } from "react-icons/md";

export default function Booking() {
  const dispatch = useDispatch();
  const { booking } = useSelector((state) => state.bookings);
  const newBooking = { ...booking };

  const totalPrice = booking.reduce((sum, vendor) => {
    return sum + Number(vendor.vendorPrice || 0);
  }, 0);

  if (!booking || booking.length === 0) return <BookingEmpty />;

  return (
    <div className="lg:px-14 sm:px-8 px-4 py-10">
      <div className="flex flex-col items-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
          <TbBrandBooking size={60} className="text-gray-700" />
          Your Bookings
        </h1>
        <p className="text-lg text-gray-900 mt-2">All your selected Vendors</p>
      </div>

      <div className="grid md:grid-cols-5 grid-cols-4 gap-4 pb-2 font-semibold items-center">
        <div className="md:col-span-2 justify-self-start text-lg text-slate-800 lg:ps-4">
          Vendors
        </div>

        <div className="justify-self-center text-lg text-slate-800">Price</div>
      </div>

      <div>
        {booking &&
          booking.length > 0 &&
          booking.map((item, i) => <BookingContent key={i} {...item} />)}
      </div>

      <div className="border-t-[1.5px] border-slate-200 py-4 flex sm:flex-row sm:px-0 px-2 flex-col sm:justify-between gap-4">
        <div></div>
        <div className="flex text-sm gap-1 flex-col">
          <div className="flex justify-between w-full md:text-lg text-sm font-semibold">
            <span>Total Price: {totalPrice} </span>
          </div>

          <Link className="w-full flex justify-end" to="/checkout">
            <button
              onClick={() => {}}
              className="font-semibold w-[300px] py-2 px-4 rounded-xs  text-white flex items-center justify-center gap-2 hover:text-gray-300 transition duration-500 bg-slate-900"
            >
              <MdShoppingCart size={20} />
              Book Vendors
            </button>
          </Link>

          <Link
            className="flex gap-2 items-center mt-2 text-slate-500"
            to="/vendors"
          >
            <MdArrowBack />
            <span>Continue Shopping</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
