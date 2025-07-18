import { FaAddressCard } from "react-icons/fa";
import InputField from "../shared/InputField";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import Spinner from "../shared/Spinner";
import { registerUserEvent } from "../../store/actions";
import toast from "react-hot-toast";

export default function AddEventForm({ event, setOpenEventModal }) {
  const buttonLoader = useSelector((state) => state.errors.buttonLoader);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const onSaveEventHandler = async (data) => {
    dispatch(registerUserEvent(data, toast, event?.eventId, setOpenEventModal));
  };
  return (
    <div className="">
      <form onSubmit={handleSubmit(onSaveEventHandler)} className="">
        <div className="flex justify-center items-center mb-4 font-semibold text-2xl text-slate-800 py-2 px-4">
          <FaAddressCard className="mr-2 text-2xl" />
          Add Event Details
        </div>

        <div className="flex flex-col gap-4">
          <InputField
            label="Event Name"
            required
            id="eventName"
            type="text"
            message="*Event Name is required"
            placeholder="Enter Event Name"
            register={register}
            errors={errors}
          />

          <InputField
            label="Event Type"
            required
            id="eventType"
            type="text"
            message="*Event Type is required"
            placeholder="Enter Type"
            register={register}
            errors={errors}
          />

          <InputField
            label="Event Date"
            required
            id="eventDate"
            type="text"
            message="*Event Date is required"
            placeholder="YYYY-MM-DD"
            register={register}
            errors={errors}
          />

          <InputField
            label="Event Location
            required"
            id="eventLocation"
            type="text"
            message="*Event location is required"
            placeholder="Enter Event Location"
            register={register}
            errors={errors}
          />
          <InputField
            label="Event City"
            required
            id="eventCity"
            type="text"
            message="*City is required"
            placeholder="Enter City"
            register={register}
            errors={errors}
          />

          <InputField
            label="State"
            required
            id="eventState"
            type="text"
            message="*State is required"
            placeholder="Enter State"
            register={register}
            errors={errors}
          />
        </div>

        <button
          disabled={buttonLoader}
          type="submit"
          className="text-white bg-blue-800 px-4 py-2 rounded-md mt-4"
        >
          {buttonLoader ? (
            <>
              {" "}
              <Spinner /> Loading...
            </>
          ) : (
            <>Save</>
          )}
        </button>
      </form>
    </div>
  );
}
