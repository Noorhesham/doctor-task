import { CalendarIcon, LocationEdit } from "lucide-react";
import { Button } from "./ui/button";
import MeetingForm from "./MeetingForm";
import ModalCustom from "./ModalCustom";
import Container from "./Container";
import { Doctor as IDoctor } from "@/types";

const Doctor = ({ doctor }: { doctor: IDoctor }) => {
  return (
    <Container>
      <div
        className={` flex flex-col sm:flex-row justify-between  gap-5 md:flex-nowrap flex-wrap items-start md:items-center sm:justify-between`}
      >
        <div className="flex items-center gap-4">
          <div className=" w-20 rounded-xl overflow-hidden h-20 aspect-square  relative">
            <img src={doctor.photo} alt={doctor.name} className=" object-cover absolute w-full h-full inset-0" />
          </div>
          <div className="flex flex-col items-start ">
            <h2 className=" text-black font-semibold text-lg">{doctor.name}</h2>
            <p className=" text-muted-foreground  font-normal">{doctor.specialty}</p>
            <div className="flex items-center gap-1">
              <LocationEdit className=" w-4 text-blue-700 h-4" />
              <p className=" text-muted-foreground  font-normal">{doctor.location}</p>
            </div>
          </div>
        </div>
        <div className=" flex items-center gap-3">
          <ModalCustom
            btn={
              <Button size="lg" className={` `}>
                SCHEDULE MEETING
                <CalendarIcon />
              </Button>
            }
            content={<MeetingForm doctor={doctor} />}
          />
        </div>
      </div>
    </Container>
  );
};

export default Doctor;
