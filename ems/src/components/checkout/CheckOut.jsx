import { useState } from "react";
import { Step, StepLabel, Stepper } from "@mui/material";
import EventInfo from "./EventInfo";

export default function CheckOut() {
  const [activeStep, setActiveStep] = useState(0);
  const steps = [
    "Register Event",
    "Payment Method",
    "Booking Summary",
    "Payment",
  ];
  return (
    <div className="py-14 min-h-[calc(100vh-100px)]">
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <div className="mt-5">{activeStep === 0 && <EventInfo />}</div>
    </div>
  );
}
