import { MdArrowBack, MdShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";

export default function BookingEmpty() {
  return (
    <div className="min-h-[800px] flex flex-col items-center justify-center">
      <div className="flex flex-col items-center">
        <MdShoppingCart size={80} className="mb-4 text-slate-500" />
        <div className="text-3xl font-bold text-slate-700">
          Your vendor list is empty!
        </div>
        <div className="text-lg text-slate-500 mt-2">
          Book Vendors for your event
        </div>
      </div>
      <div className="mt-6">
        <Link
          to="/vendors"
          className="flex gap-2 items-center text-blue-500 hover:text-blue-600 transition"
        >
          <MdArrowBack size={24} />
          <span className="font-medium">Start Booking</span>
        </Link>
      </div>
    </div>
  );
}
