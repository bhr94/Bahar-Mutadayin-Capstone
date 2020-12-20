import Sidebar from "../components/Sidebar";
import Profile from "../components/Profile";
import NavBar from "../components/NavBar";
export default function ProfilePage() {
  console.log("profile mounted");
  return (
    <>
      {/* <NavBar /> */}
      <section className="profile-page__container">
        <Sidebar />
        <Profile />
      </section>
    </>
  );
}
