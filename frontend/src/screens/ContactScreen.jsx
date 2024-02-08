import React from 'react'
import Footer from '../components/Footer'
import {Row, Col} from 'react-bootstrap'
import emailjs from 'emailjs-com';



export default function ContactScreen() {
    function sendEmail(e){
        e.preventDefault();

    emailjs.sendForm('service_xkupax9', 'template_hjw799c', e.target, '1PF5cx2fUFEjivNRX')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
      e.target.reset()

    }

    return (
        <div>
            <Row>
                <Col xl={6}>
                <form onSubmit={sendEmail}>
  <div class="mb-3">
    <label class="form-label">Name</label>
    <input type="text" class="form-control" placeholder='Name' name='name' />
  </div>
  <div class="mb-3">
    <label class="form-label" required>Email Address</label>
    <input type="text" class="form-control" placeholder='@gmail.com' name='email' />
  </div>
  <div class="mb-3">
    <label class="form-label">Subject</label>
    <input type="text" class="form-control" placeholder='Subject' name='subject' />
  </div>
  <div class="mb-3">
    <label class="form-label">Message</label>
    <input type="text" class="form-control" placeholder='Type your message' name='message' />
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
                </Col>
            </Row>
            <h1>testiting testing</h1>
            <Footer/>
        </div>
    )

}