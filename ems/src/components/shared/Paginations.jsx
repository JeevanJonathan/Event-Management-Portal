import { Pagination } from "@mui/material";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

export default function Paginations({ numberOfPage }) {
  const [searchParams] = useSearchParams();
  const pathname = useLocation().pathname;
  const params = new URLSearchParams(searchParams);
  const navigate = useNavigate();

  const paramValue = searchParams.get("page")
    ? Number(searchParams.get("page"))
    : 1;

  function onChangeHandler(event, value) {
    params.set("page", value.toString());
    navigate(`${pathname}?${params}`);
  }
  return (
    <Pagination
      count={numberOfPage}
      page={paramValue}
      variant="outlined"
      shape="rounded"
      onChange={onChangeHandler}
    />
  );
}
