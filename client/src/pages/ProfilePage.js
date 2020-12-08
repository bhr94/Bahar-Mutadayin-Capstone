import Sidebar from "../components/Sidebar";
import Profile from "../components/Profile";
export default function ProfilePage() {
  return (
    <section className="profile-page__container">  
      <Sidebar />
      <Profile />
    </section>
  );
}
