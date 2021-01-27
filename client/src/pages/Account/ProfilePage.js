import Sidebar from "../../components/Navigation/Sidebar";
import Profile from "../../components/Profile/Profile";
import NavBar from "../../components/Navigation/NavBar";
import image from "../../assets/Icons/close.svg"
export default function ProfilePage() {
  return (
    <>
      <NavBar />
      <section className="profile-page__container">
        <Sidebar />
        <Profile />
      </section>
    </>
  );
}
