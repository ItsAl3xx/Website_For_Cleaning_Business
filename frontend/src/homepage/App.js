import React, { useState } from 'react';
import Calendar from 'react-calendar';
import DatePicker from 'react-datepicker';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import "react-datepicker/dist/react-datepicker.css";
import 'react-calendar/dist/Calendar.css';
import './App.css';

const BeforeAfterCard = ({ beforeImage, afterImage, title }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="card-container"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div className={`card ${isFlipped ? 'flipped' : ''}`}>
        <div className="card-face card-front">
          <img src={beforeImage} alt="Before Cleaning" />
          <div className="card-label">Before</div>
        </div>
        <div className="card-face card-back">
          <img src={afterImage} alt="After Cleaning" />
          <div className="card-label">After</div>
        </div>
      </div>
      <h3 className="card-title">{title}</h3>
    </div>
  );
};

const BookingSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string().required('Phone number is required'),
  address: Yup.string().required('Address is required'),
  serviceType: Yup.string().required('Please select a service type'),
  appointmentType: Yup.string().required('Please select appointment type'),
  message: Yup.string(),
});

const BookingSection = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  
  const unavailableDates = [
    new Date(2024, 9, 10),
    new Date(2024, 9, 15),
    new Date(2024, 9, 20),
  ];

  const fullyBookedDates = [
    new Date(2024, 9, 5),
    new Date(2024, 9, 12),
    new Date(2024, 9, 25),
  ];

  const isDateUnavailable = (date) => {
    return unavailableDates.some(unavailableDate =>
      date.getDate() === unavailableDate.getDate() &&
      date.getMonth() === unavailableDate.getMonth() &&
      date.getYear() === unavailableDate.getYear()
    );
  };

  const getTileClassName = ({ date, view }) => {
    if (view === 'month') {
      // Check if date is fully booked
      if (fullyBookedDates.some(bookedDate => 
        date.getDate() === bookedDate.getDate() &&
        date.getMonth() === bookedDate.getMonth() &&
        date.getYear() === bookedDate.getYear()
      )) {
        return 'fully-booked';
      }
      
      // Check if date is unavailable
      if (isDateUnavailable(date)) {
        return 'unavailable';
      }

      // Check if it's a weekend
      if (date.getDay() === 0 || date.getDay() === 6) {
        return 'weekend';
      }
    }
    return '';
  };

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    console.log({ ...values, selectedDate });
    setSubmitting(false);
    resetForm();
    setSelectedDate(null);
  };

  return (
    <section className="booking">
      <h2>Book a Cleaning Service</h2>
      <div className="booking-container">
        <Formik
          initialValues={{
            name: '',
            email: '',
            phone: '',
            address: '',
            serviceType: '',
            appointmentType: '',
            message: '',
          }}
          validationSchema={BookingSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className="booking-form">
              <div className="form-group">
                <Field
                  name="name"
                  placeholder="Full Name"
                  className={errors.name && touched.name ? 'error' : ''}
                />
                {errors.name && touched.name && <div className="error-message">{errors.name}</div>}
              </div>

              <div className="form-group">
                <Field
                  name="email"
                  type="email"
                  placeholder="Email"
                  className={errors.email && touched.email ? 'error' : ''}
                />
                {errors.email && touched.email && <div className="error-message">{errors.email}</div>}
              </div>

              <div className="form-group">
                <Field
                  name="phone"
                  placeholder="Phone Number"
                  className={errors.phone && touched.phone ? 'error' : ''}
                />
                {errors.phone && touched.phone && <div className="error-message">{errors.phone}</div>}
              </div>

              <div className="form-group">
                <Field
                  name="address"
                  placeholder="Address"
                  className={errors.address && touched.address ? 'error' : ''}
                />
                {errors.address && touched.address && <div className="error-message">{errors.address}</div>}
              </div>

              <div className="form-group">
                <Field as="select" name="serviceType" className="select-input">
                  <option value="">Select Service Type</option>
                  <option value="regular">Regular Cleaning</option>
                  <option value="deep">Deep Cleaning</option>
                  <option value="move">Move In/Out Cleaning</option>
                </Field>
                {errors.serviceType && touched.serviceType && <div className="error-message">{errors.serviceType}</div>}
              </div>

              <div className="form-group">
                <Field as="select" name="appointmentType" className="select-input">
                  <option value="">Select Appointment Type</option>
                  <option value="cleaning">Direct Booking</option>
                  <option value="quote">Request Quote</option>
                </Field>
                {errors.appointmentType && touched.appointmentType && <div className="error-message">{errors.appointmentType}</div>}
              </div>

              <div className="form-group">
                <DatePicker
                  selected={selectedDate}
                  onChange={date => setSelectedDate(date)}
                  filterDate={date => {
                    const day = date.getDay();
                    return day !== 0 && day !== 6 && !isDateUnavailable(date);
                  }}
                  minDate={new Date()}
                  placeholderText="Select Preferred Date"
                  className="date-picker"
                  dateFormat="MMMM d, yyyy"
                  required
                />
              </div>

              <div className="form-group">
                <Field
                  as="textarea"
                  name="message"
                  placeholder="Additional Notes or Special Requests"
                  className="textarea-input"
                />
              </div>

              <button type="submit" disabled={isSubmitting} className="submit-button">
                {isSubmitting ? 'Submitting...' : 'Book Appointment'}
              </button>
            </Form>
          )}
        </Formik>

        <div className="booking-sidebar">
          <div className="calendar-container">
            <h3>Availability Calendar</h3>
            <Calendar
              tileClassName={getTileClassName}
              minDate={new Date()}
              className="availability-calendar"
            />
            <div className="calendar-legend">
              <div className="legend-item">
                <span className="legend-color available"></span>
                <span>Available</span>
              </div>
              <div className="legend-item">
                <span className="legend-color fully-booked"></span>
                <span>Fully Booked</span>
              </div>
              <div className="legend-item">
                <span className="legend-color unavailable"></span>
                <span>Unavailable</span>
              </div>
              <div className="legend-item">
                <span className="legend-color weekend"></span>
                <span>Weekend</span>
              </div>
            </div>
          </div>

          <div className="info-card">
            <h3>Booking Information</h3>
            <ul>
              <li>Appointments available Monday-Friday</li>
              <li>Weekend appointments upon special request</li>
              <li>Minimum 24 hours notice required</li>
              <li>Free quotes available</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

function App() {
  return (
    <div className="App">
      <header className="header">
        <div className="logo">Buisness Name</div>
        <nav className="nav">
          <a href="#home">Home</a>
          <a href="#services">Services</a>
          <a href="#about">About</a>
          <a href="#gallery">Gallery</a>
          <a href="#contact">Contact</a>
        </nav>
        <button className="book-now">Book Now</button>
      </header>

      <section className="hero">
        <h1>Professional Cleaning </h1>
        <p>Bringing sparkle to your space, one room at a time</p>
        <button className="get-quote">Get a Quote</button>
      </section>

      <section className="services">
        <h2>My Services</h2>
        <div className="service-cards">
          <div className="service-card">
            <div className="icon">🏠</div>
            <h3>Residential Cleaning</h3>
            <p>Thorough home cleaning tailored to your needs</p>
            <button>Learn More</button>
          </div>
          <div className="service-card">
            <div className="icon">✨</div>
            <h3>Deep Cleaning</h3>
            <p>Intensive cleaning for those hard-to-reach areas</p>
            <button>Learn More</button>
          </div>
          <div className="service-card">
            <div className="icon">🔄</div>
            <h3>Move-in/Move-out Cleaning</h3>
            <p>Ensure your new or old space is spotless</p>
            <button>Learn More</button>
          </div>
        </div>
      </section>

      <section className="before-after">
        <h2>Transformation Gallery</h2>
        <div className="before-after-grid">
          <BeforeAfterCard 
            beforeImage="/path-to-before-image1.jpg"
            afterImage="/path-to-after-image1.jpg"
            title="Kitchen Deep Clean"
          />
          <BeforeAfterCard 
            beforeImage="/path-to-before-image2.jpg"
            afterImage="/path-to-after-image2.jpg"
            title="Living Room Transformation"
          />
          <BeforeAfterCard 
            beforeImage="/path-to-before-image3.jpg"
            afterImage="/path-to-after-image3.jpg"
            title="Bathroom Makeover"
          />
        </div>
      </section>

      <section className="testimonials">
        <h2>What My Clients Say</h2>
        <div className="testimonial-cards">
          <div className="testimonial-card">
            <p>"Sarah's attention to detail is amazing. My home has never looked better!"</p>
            <span>Emily R.</span>
          </div>
          <div className="testimonial-card">
            <p>"Reliable, thorough, and friendly. I highly recommend Sarah's services."</p>
            <span>Michael T.</span>
          </div>
          <div className="testimonial-card">
            <p>"The deep cleaning service was exactly what my home needed. Thank you, Sarah!"</p>
            <span>Laura S.</span>
          </div>
        </div>
      </section>

      <BookingSection />

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Contact Us</h4>
            <div className="contact-info">
              <div className="contact-item">
                <i className="fas fa-map-marker-alt"></i>
                <span>123 Clean Street, City, State 12345</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-phone"></i>
                <span>(123) 456-7890</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-envelope"></i>
                <span>contact@cleaningservice.com</span>
              </div>
            </div>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#services">Our Services</a></li>
              <li><a href="#booking">Book Now</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#testimonials">Testimonials</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Business Hours</h4>
            <ul className="business-hours">
              <li>
                <span className="day">Monday - Friday:</span>
                <span className="hours">8:00 AM - 6:00 PM</span>
              </li>
              <li>
                <span className="day">Saturday:</span>
                <span className="hours">By Appointment</span>
              </li>
              <li>
                <span className="day">Sunday:</span>
                <span className="hours">Closed</span>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Connect With Us</h4>
            <div className="social-links">
              <a href="#facebook" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#instagram" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#twitter" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#linkedin" aria-label="LinkedIn">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>&copy; 2024 Cleaning Service. All rights reserved.</p>
            <div className="footer-bottom-links">
              <a href="#privacy">Privacy Policy</a>
              <a href="#terms">Terms of Service</a>
              <a href="#sitemap">Sitemap</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
