import FriendList from "../components/FriendList";
import SideBar from "../components/Sidebar";
import NavBar from "../components/NavBar";

export default function FriendsPage() {
  return (
    <>
    {/* <NavBar/> */}
    <section className="friends-page-container">
      <SideBar />
      <FriendList />
    </section>
    </>
  );
}
