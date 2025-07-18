import { FaUserPlus } from "react-icons/fa";
import InputField from "../shared/InputField";
import { useForm } from "react-hook-form";
import { MenuItem, Select } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerNewUser } from "../../store/actions";
import toast from "react-hot-toast";
import Spinner from "../shared/Spinner";

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loader, setLoader] = useState(false);
  const [role, setRole] = useState("");

  const roles = ["USER", "VENDOR", "ADMIN"];

  function handleChange(event) {
    setRole(event.target.value);
  }

  const registerHandler = async (data) => {
    dispatch(registerNewUser(data, toast, reset, navigate, setLoader));
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });
  return (
    <div className="min-h-[calc(100vh-64px)] flex justify-center items-center">
      <form
        onSubmit={handleSubmit(registerHandler)}
        className="sm:w-[450px] w-[360px] shadow-custom py-8 sm:px-8 px-4 rounded-md"
      >
        <div className="flex flex-col items-center justify-center space-y-4">
          <FaUserPlus className="text-slate-800 text-5xl" />
          <h1 className="text-slate-800 text-center font-montserrat lg:text-3xl text-2xl font-bold">
            Register Here
          </h1>
        </div>

        <hr className="mt-2 mb-5 text-black" />
        <div className="flex flex-col gap-3">
          <InputField
            label="UserName"
            required
            id="username"
            type="text"
            message="*UserName is required"
            placeholder="Enter your username"
            register={register}
            errors={errors}
          />

          <InputField
            label="Email"
            required
            id="email"
            type="email"
            message="*Email is required"
            placeholder="Enter your email"
            register={register}
            errors={errors}
          />

          <InputField
            label="Password"
            required
            id="password"
            min={6}
            type="password"
            message="*Password is required"
            placeholder="Enter your password"
            register={register}
            errors={errors}
          />

          <Select
            value={role}
            labelId="role-select-label"
            id="role-select"
            label="Role"
            onChange={handleChange}
          >
            {roles.map((item, i) => (
              <MenuItem key={i} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </div>

        <button
          disabled={loader}
          className="bg-button-gradient flex gap-2 items-center justify-center font-semibold text-white w-full py-2 hover:text-slate-400 transition-colors duration-100 rounded-xs my-3"
          type="submit"
        >
          {loader ? (
            <>
              {" "}
              <Spinner /> Loading...
            </>
          ) : (
            <>Register</>
          )}
        </button>

        <p className="text-center text-sm text-slate-700 mt-6">
          Already have an account?
          <Link
            className="font-semibold underline hover:text-black"
            to="/login"
          >
            <span> Login</span>
          </Link>
        </p>
      </form>
    </div>
  );
}
