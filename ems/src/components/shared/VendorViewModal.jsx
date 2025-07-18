import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Divider } from "@mui/material";
import Status from "./Status";
import { MdClose, MdDone } from "react-icons/md";

export default function VendorViewModal({
  open,
  setOpen,
  vendor,
  isAvailable,
}) {
  const {
    vendorId,
    vendorName,
    vendorImage,
    vendorEmail,
    vendorPhone,
    vendorPrice,
    vendorDescription,
    city,
    state,
    availabilityStatus,
  } = vendor;

  function handleClickOpen() {
    setOpen(true);
  }

  return (
    <>
      <Dialog
        open={open}
        as="div"
        className="relative z-10 "
        onClose={close}
        __demoMode
      >
        <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all md:max-w-[620px] md:min-w-[620px] w-full"
            >
              {vendorImage && (
                <div className="flex justify-center aspect-[3/2]">
                  <img src={vendorImage} alt={vendorName}></img>
                </div>
              )}

              <div className="px-6 pt-10 pb-2">
                <DialogTitle
                  as="h1"
                  className="lg:text-3xl sm:text-2xl text-xl font-semibold leading-6 text-gray-800 mb-4"
                >
                  {vendorName}
                </DialogTitle>

                <div className="space-y-2 text-gray-700 pb-4">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="sm:text-xl font-semibold text-slate-700">
                        Rs {Number(vendorPrice).toFixed(2)}
                      </span>
                    </div>
                    {isAvailable ? (
                      <Status
                        text="Available"
                        icon={MdDone}
                        bg="bg-teal-200"
                        color="text-teal-900"
                      />
                    ) : (
                      <Status
                        text="Not available!"
                        icon={MdClose}
                        bg="bg-rose-200"
                        color="text-rose-700"
                      />
                    )}
                  </div>

                  <Divider />

                  <p>{vendorDescription}</p>

                  <Divider />

                  <div className="flex items-center gap-2 mt-3">
                    <span className="sm:text-xl font-semibold text-slate-700">
                      Phone : {vendorPhone}
                    </span>
                  </div>
                  <Divider />

                  <div className="flex items-center gap-2 mt-3">
                    <span className="sm:text-xl font-semibold text-slate-700">
                      Email : {vendorEmail}
                    </span>
                  </div>
                  <Divider />

                  <div className="flex items-center gap-2 mt-3">
                    <span className="sm:text-xl font-semibold text-slate-700">
                      City : {city}
                    </span>
                  </div>
                  <Divider />

                  <div className="flex items-center gap-2 mt-3">
                    <span className="sm:text-xl font-semibold text-slate-700">
                      State : {state}
                    </span>
                  </div>
                  <Divider />
                </div>
              </div>
              <div className="px-6 py-4 flex justify-end gap-4">
                <button
                  onClick={() => setOpen(false)}
                  type="button"
                  className="px-4 py-2 text-sm font-semibold text-slate-700 border border-slate-700 hover:text-slate-800 hover:border-slate-800 rounded-md "
                >
                  Close
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
