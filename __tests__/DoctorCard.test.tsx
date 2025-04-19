import Doctor from "@/components/Doctor";
import { Doctor as IDoctor } from "@/types";
import { render, screen, fireEvent } from "@testing-library/react";

const mockDoctor: IDoctor = {
  id: 1, // id يجب أن يكون عدد صحيح
  name: "Dr. Noor",
  photo: "doctor.jpg", // صورة للطبيب (تأكد أن هذا صحيح)
  specialty: "Cardiology", // اختر التخصص من SPECIALTIES
  availability: ["Monday", "Wednesday", "Friday"], // مثال على التواريخ المتاحة
  location: "Cairo", // اختر موقع من LOCATIONS
  rating: 4.5, // مثال على تقييم الطبيب
  experience: 10, // مثال على خبرة الطبيب بالسنوات
};

describe("DoctorCard Component", () => {
  it("renders doctor info correctly", () => {
    render(<Doctor doctor={mockDoctor} />);
    expect(screen.getByText("Dr. Noor")).toBeInTheDocument();
    expect(screen.getByText("Cardiology")).toBeInTheDocument();
    expect(screen.getByText(/Available/i)).toBeInTheDocument();
    expect(screen.getByText(/Cairo/i)).toBeInTheDocument();
  });

  it("calls onBook when clicking Book button", () => {
    const onBookMock = jest.fn();
    render(<Doctor doctor={mockDoctor} />);
    fireEvent.click(screen.getByRole("button", { name: /Book/i }));
    expect(onBookMock).toHaveBeenCalledTimes(1);
  });
});
