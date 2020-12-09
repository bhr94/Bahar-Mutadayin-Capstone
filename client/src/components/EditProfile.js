import React from "react";
import { Input } from "reactstrap";
class EditProfile extends React.Component {
  render() {
    return (
      <section className="profile-container scrollable">
        <header className="profile-container__header">
          <nav className="header__nav">
            <input type="text" className="input-element" placeholder="Search" />
          </nav>
          <div className="header__text">
            <h1 className="profile-container__header-title">Hello Bahar</h1>
            <p className="profile-container__header-text">
              This is your profile page. You can see the progress you've made
              with your work and manage your projects or assigned tasks
            </p>
          </div>
        </header>
        {/* main section of the profile */}
        <main className="main-section">
          {/* all forms container */}
          <div className="main-section__form">
            <div className="main-section__form-header">
              <h2 className="main-section__form-title">My account</h2>
              <button className="main-section__form-button">Save</button>
            </div>

            {/* First form  */}
            <div className="frm">
              <form className="main-section__form-first padding-btm border-btm margin-btm mrg-top mrg-right">
                <h3 className="form-title">User information</h3>
                <label for="username">Username</label>
                <input
                  type="text"
                  placeholder="Username..."
                  className="input-element"
                />
                <label for="email address">Email address</label>
                <input
                  type="text"
                  placeholder="Email..."
                  className="input-element"
                />
                <label for="firt-name">First name</label>
                <input placeholder="First name" className="input-element" />
                <label>Last name</label>
                <input placeholder="last name" className="input-element" />
              </form>

              {/* Second form */}
              <form className="main-section__form-first padding-btm border-btm">
                <h3 className="form-title">Contact information</h3>
                <label for="username">Adress</label>
                <input
                  type="text"
                  placeholder="Adress..."
                  className="input-element"
                />
                <label>City</label>
                <input
                  type="text"
                  placeholder="City..."
                  className="input-element"
                />
                <label>Country</label>
                <input placeholder="Country" className="input-element" />
                <label>Postal code</label>
                <input placeholder="Postal code" className="input-element" />
              </form>
            </div>

            <textarea
              placeholder="Write a large text here ..."
              type="textarea"
              className="input-element txtarea"
            />
          </div>
        </main>
      </section>
    );
  }
}

export default EditProfile;
