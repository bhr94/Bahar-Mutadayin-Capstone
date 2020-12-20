import Sidebar from "../../components/Navigation/Sidebar";
import Calendar from "../../components/Calendar/Calendar";
import NavBar from "../../components/Navigation/NavBar";
export default function CalendarPage() {
  return (
    <>
      <NavBar />
      <section className="calendar-page__container">
        <Sidebar />
        <Calendar />
      </section>
    </>
  );
}
