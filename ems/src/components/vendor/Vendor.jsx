import { useDispatch, useSelector } from "react-redux";
import VendorCard from "../shared/VendorCard";
import useVendorFilter from "../../hooks/useVendorFilter";
import { useEffect } from "react";
import { fetchCategories } from "../../store/actions";
import Filter from "./Filter";
import Loader from "../shared/Loader";
import Paginations from "../shared/Paginations";
import { FaExclamationTriangle } from "react-icons/fa";

export default function Vendor() {
  const { vendors, categories, pagination } = useSelector(
    (state) => state.vendors
  );

  const { isLoading, errorMessage } = useSelector((state) => state.errors);

  const dispatch = useDispatch();
  useVendorFilter();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className="lg:px-4 sm:px-8 px-4 py-4 2xl:w-[90%] 2xl:mx-auto">
      <Filter categories={categories ? categories : []} />
      {isLoading ? (
        <Loader />
      ) : errorMessage ? (
        <div className="flex justify-center items-center h-[200px]">
          <FaExclamationTriangle className="text-slate-800 text-3xl mr-2" />
          <span className="text-slate-800 text-lg font-medium">
            {errorMessage}
          </span>
        </div>
      ) : (
        <div className="min-h-[700px]">
          <div className="pb-6 pt-14 grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-y-6 gap-x-6">
            {vendors &&
              vendors.map((item, i) => <VendorCard key={i} {...item} />)}
          </div>
          <div className="flex justify-center pt-10">
            <Paginations
              numberOfPage={pagination?.totalPages}
              totalVendors={pagination?.totalElements}
            />
          </div>
        </div>
      )}
    </div>
  );
}
