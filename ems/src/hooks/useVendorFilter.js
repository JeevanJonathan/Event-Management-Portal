import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { fetchVendors } from "../store/actions";

export default function useVendorFilter() {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URLSearchParams();

    const currentPage = searchParams.get("page")
      ? Number(searchParams.get("page"))
      : 1;

    params.set("pageNumber", currentPage - 1);

    const sortOrder = searchParams.get("sortby") || "asc";
    const category = searchParams.get("category") || null;
    const keyword = searchParams.get("keyword") || null;

    params.set("sortby", "vendorPrice");
    params.set("sortOrder", sortOrder);

    if (category) {
      params.set("category", category);
    }

    if (keyword) {
      params.set("keyword", keyword);
    }

    const queryString = params.toString();
    console.log(queryString);

    dispatch(fetchVendors(queryString));
  }, [dispatch, searchParams]);
}
