import { useDispatch, useSelector } from "react-redux";
import HeroBanner from "./HeroBanner";
import VendorCard from "../shared/VendorCard";

export default function Home() {
  const dispatch = useDispatch();
  const { vendors } = useSelector((state) => state.vendors);
  const { isLoading, errorMessage } = useSelector((state) => state.errors);
  return (
    <div className="lg:px-14 sm:px-8 px-4">
      <div className="py-6">
        <HeroBanner />
      </div>

      <div className="py-5">
        <div className="flex flex-col justify-center items-center space-y-2">
          <h1 className="text-slate-800 text-4xl font-bold">
            <span>Discover Vendors</span>
          </h1>
        </div>

        <div className="pb-6 pt-14 grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-y-6 gap-x-6">
          {vendors &&
            vendors
              ?.slice(0, 8)
              .map((item, i) => <VendorCard key={i} {...item} />)}
        </div>
      </div>
    </div>
  );
}
