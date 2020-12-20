import FriendList from "../../components/Friend/FriendList";
import SideBar from "../../components/Navigation/Sidebar";
import NavBar from "../../components/Navigation/NavBar";

export default function FriendsPage() {
  return (
    <>
      <NavBar />
      <section className="friends-page-container">
        <SideBar />
        <FriendList />
      </section>
    </>
  );
}
