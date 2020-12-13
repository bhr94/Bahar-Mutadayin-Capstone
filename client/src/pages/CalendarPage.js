import Sidebar from "../components/Sidebar";
import Calendar from "../components/Calendar";
import SampleCalendar from "../components/SampleCalendar";
export default function CalendarPage() {
  return (
    <section className="calendar-page__container">
      <Sidebar/>
      <SampleCalendar />
      {/* <Calendar/> */}
    </section>
  );
}
