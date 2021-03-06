import React from "react";
import MessageForm from "../components/contact-us/MessageForm";
import GetInTouch from "../components/contact-us/GetInTouch";
import HeaderSection from "../components/styled-components/HeaderSection";
import appStyles from "../App.module.css";

const container = {
  marginTop: "1rem",
};

const getInTouchContainer = {
  padding: "10px 25px",
};

function ContactUs() {
  return (
    <div className={appStyles.containerMain}>
      <div style={container}>
        <HeaderSection headerText="get in touch" />
        <div style={getInTouchContainer}>
          <GetInTouch />
        </div>
        <br />
        <MessageForm />
      </div>
    </div>
  );
}
export default ContactUs;
