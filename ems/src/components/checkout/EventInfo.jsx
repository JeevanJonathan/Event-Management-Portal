import { useState } from "react";
import EventInfoModal from "./EventInfoModal";
import AddEventForm from "./AddEventForm";

export default function EventInfo() {
  const [openEventModal, setOpenEventModal] = useState(false);
  const [newEvent, setNewEvent] = useState("");

  const isLoading = false;

  function addEventHandler() {
    setOpenEventModal(true);
  }
  return (
    <div className="pt-4">
      <div className="p-6 rounded-lg max-w-md mx-auto flex flex-col items-center justify-center">
        <h1 className="mb-2 mt-2 text-slate-900 text-center font-semibold text-2xl">
          Please Add Event Details
        </h1>
        <button
          onClick={addEventHandler}
          className="px-4 py-2 mt-6 bg-blue-600 text-white font-medium rounded-sm hover:bg-blue-700 transition-all"
        >
          Add Event
        </button>
      </div>

      <EventInfoModal open={openEventModal} setOpen={setOpenEventModal}>
        <AddEventForm event={newEvent} setOpenEventModal={setOpenEventModal} />
      </EventInfoModal>
    </div>
  );
}
