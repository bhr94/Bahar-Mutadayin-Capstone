import FriendList from "../components/FriendList";
import SideBar from "../components/Sidebar";
export default function FriendsPage() {
  return (
    <section className="friends-page-container">
      <SideBar />
      <FriendList />
    </section>
  );
}
