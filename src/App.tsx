import DoctorList from "./components/DoctorList";
import { ToastContainer } from "react-toastify";
import SheetCustom from "./components/SheetCustom";
import { Button } from "./components/ui/button";
import { AppointmentsList } from "./components/AppointmentList";
import MaxWidthWrapper from "./components/MaxWidthWrapper";

function App() {
  return (
    <main className=" bg-gray-100">
      <MaxWidthWrapper>
        <SheetCustom
          side="right"
          content={<AppointmentsList />}
          btn={<Button> My Book Appointments</Button>}
          header="My Appointment"
        />
        <DoctorList /> <ToastContainer />
      </MaxWidthWrapper>
    </main>
  );
}

export default App;
