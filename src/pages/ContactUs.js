import React from "react";
import MessageForm from "../components/contact-us/MessageForm";
import MainHeader from "../components/main-header/MainHeader";
import GetInTouch from "../components/contact-us/GetInTouch";
import HeaderSection from "../components/styled-components/HeaderSection";

const container = {
  maxWidth: "1200px",
  margin: "0 auto",
  marginTop: "1rem",
  padding: "0 1rem",
};

const getInTouchContainer = {
  padding: "10px 100px",
};

function ContactUs() {
  return (
    <div style={container}>
      {/* <MainHeader name="Get In Touch" sub="" /> */}
      <HeaderSection headerText="get in touch" />
      <div style={getInTouchContainer}>
        <GetInTouch />
      </div>
      <br />
      <MessageForm />
    </div>
  );
}
export default ContactUs;
