import Sidebar from "../components/Sidebar";
import Calendar from "../components/Calendar";
import NavBar from "../components/NavBar";
export default function CalendarPage() {
  return (
    <>
      {/* <NavBar /> */}
      <section className="calendar-page__container">
        <Sidebar />
        <Calendar />
      </section>
    </>
  );
}
