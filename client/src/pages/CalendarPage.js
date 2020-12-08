import Sidebar from "../components/Sidebar";
import Calendar from "../components/Calendar";
export default function CalendarPage() {
  return (
    <section className="calendar-page__container">
      <Sidebar/>
      <Calendar />
    </section>
  );
}
