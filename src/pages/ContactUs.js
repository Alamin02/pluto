import React from 'react';
import MessageForm from "../components/contact-us/MessageForm"
import MainHeader from "../components/main-header/MainHeader";
import GetInTouch from "../components/contact-us/GetInTouch"
function ContactUs() {
    return (
        <div>
            <MainHeader name="Get In Touch" sub="" />
            <GetInTouch />
            <MessageForm />
        </div>
    )
}
export default ContactUs;
