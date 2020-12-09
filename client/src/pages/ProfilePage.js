import Sidebar from "../components/Sidebar";
import EditProfile from "../components/EditProfile";
export default function ProfilePage() {
  return (
    <section className="profile-page__container">  
      <Sidebar />
      <EditProfile />
    </section>
  );
}
