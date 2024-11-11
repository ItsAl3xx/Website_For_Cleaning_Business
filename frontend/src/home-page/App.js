import React, { useState } from 'react';
import Calendar from 'react-calendar';
import DatePicker from 'react-datepicker';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import "react-datepicker/dist/react-datepicker.css";
import 'react-calendar/dist/Calendar.css';
import './App.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { FaStar, FaSync } from 'react-icons/fa';
import { MapContainer, TileLayer, Circle, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Routes, Route, Link } from 'react-router-dom';
import ServicesPage from '../services-page/service-page';
import AboutPage from '../about-page/about-page';
import ContactPage from '../contact-page/contact-page';

const BeforeAfterCard = ({ beforeImage, afterImage, title, location }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="card-container">
      <div 
        className={`card ${isFlipped ? 'flipped' : ''}`}
        onMouseEnter={() => setIsFlipped(true)}
        onMouseLeave={() => setIsFlipped(false)}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div className="card-face card-front">
          <img src={beforeImage} alt="Before Cleaning" />
          <div className="card-label">Before</div>
          <div className="flip-instruction">
            <FaSync /> View After
          </div>
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
    <section id="booking" className="booking">
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

const testimonials = [
  {
    name: "Client 1",
    location: "Seattle, WA",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
    rating: 5
  },
  {
    name: "Client 2",
    location: "Portland, OR",
    text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
    rating: 5
  },
  {
    name: "Client 3",
    location: "Vancouver, BC",
    text: "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.",
    rating: 5
  },
  {
    name: "Client 4",
    location: "Bellevue, WA",
    text: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    rating: 5
  },
  {
    name: "Client 5",
    location: "Kirkland, WA",
    text: "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt.",
    rating: 5
  }
];

// Add new component after the testimonials section and before BookingSection
const TrustIndicators = () => (
  <section className="trust-indicators">
    <h2>Why Choose Me</h2>
    <div className="trust-grid">
      <div className="trust-item">
        <div className="trust-icon">⭐</div>
        <h3>Corporate Experience</h3>
        <p>Trusted by tech giants including Google, IMAX, and Snapchat for their office cleaning needs</p>
      </div>
      <div className="trust-item">
        <div className="trust-icon">🏆</div>
        <h3>10+ Years Experience</h3>
        <p>A decade of professional cleaning expertise in both corporate offices and residential spaces</p>
      </div>
      <div className="trust-item">
        <div className="trust-icon">✨</div>
        <h3>Flexible Solutions</h3>
        <p>Choice between my professional-grade supplies or your preferred cleaning products</p>
      </div>
      <div className="trust-item">
        <div className="trust-icon">🤝</div>
        <h3>Personalized Service</h3>
        <p>Dedicated one-on-one attention with consistent quality from the same trusted cleaner</p>
      </div>
    </div>
  </section>
);

const ServiceArea = () => {
  // Center coordinates for South Bay and Los Angeles areas
  const southBayCenter = [33.8853, -118.4054];
  const losAngelesCenter = [34.0522, -118.2437];
  
  return (
    <section className="service-area">
      <h2>Service Areas</h2>
      <div className="area-content">
        <div className="area-text">
          <h3>Areas Served</h3>
          <div className="area-regions">
            <div className="region">
              <h4>South Bay</h4>
              <ul className="area-list">
                <li>Manhattan Beach</li>
                <li>Hermosa Beach</li>
                <li>Redondo Beach</li>
                <li>Torrance</li>
                <li>Rancho Palos Verdes</li>
                <li>Palos Verdes Estates</li>
              </ul>
            </div>
            <div className="region">
              <h4>Los Angeles Area</h4>
              <ul className="area-list">
                <li>Playa Vista</li>
                <li>Marina del Rey</li>
                <li>El Segundo</li>
                <li>Westchester</li>
                <li>Culver City</li>
                <li>Downtown LA</li>
              </ul>
            </div>
          </div>
          <p className="area-note">* Travel fee may apply depending on location</p>
        </div>
        <div className="area-map">
          <MapContainer 
            center={[33.9800, -118.3200]} // Centered between both service areas
            zoom={10} 
            style={{ height: '400px', width: '100%', borderRadius: '12px' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {/* South Bay service area circle */}
            <Circle
              center={southBayCenter}
              pathOptions={{ color: '#4299e1', fillColor: '#4299e1', fillOpacity: 0.2 }}
              radius={10000} // 10km radius
            >
              <Popup>South Bay Service Area</Popup>
            </Circle>
            {/* Los Angeles service area circle */}
            <Circle
              center={losAngelesCenter}
              pathOptions={{ color: '#4299e1', fillColor: '#4299e1', fillOpacity: 0.2 }}
              radius={10000} // 10km radius
            >
              <Popup>Los Angeles Service Area</Popup>
            </Circle>
          </MapContainer>
          <div className="map-legend">
            <div className="legend-item">
              <span className="legend-color primary"></span>
              <span>Service Areas</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ProcessSection = () => (
  <section className="process-section">
    <h2>How It Works</h2>
    <div className="process-steps">
      <div className="process-step">
        <div className="step-number">1</div>
        <h3>Book Online</h3>
        <p>Schedule your cleaning service or request a quote through our easy online form</p>
      </div>
      <div className="process-step">
        <div className="step-number">2</div>
        <h3>Confirmation</h3>
        <p>Receive booking confirmation and pre-cleaning checklist via email</p>
      </div>
      <div className="process-step">
        <div className="step-number">3</div>
        <h3>Professional Service</h3>
        <p>Experience thorough, professional cleaning of your space</p>
      </div>
      <div className="process-step">
        <div className="step-number">4</div>
        <h3>Satisfaction Check</h3>
        <p>Provide feedback and book your next appointment</p>
      </div>
    </div>
  </section>
);

const FAQ = () => (
  <section className="faq-section">
    <h2>Frequently Asked Questions</h2>
    <div className="faq-grid">
      <details className="faq-item">
        <summary>How long does a typical cleaning take?</summary>
        <p>A standard cleaning typically takes 2-4 hours, depending on the size and condition of your space.</p>
      </details>
      <details className="faq-item">
        <summary>Do I need to provide cleaning supplies?</summary>
        <p>No, I bring all necessary professional-grade cleaning supplies and equipment.</p>
      </details>
      <details className="faq-item">
        <summary>What is your cancellation policy?</summary>
        <p>Cancellations made 24 hours or more in advance receive a full refund.</p>
      </details>
      <details className="faq-item">
        <summary>Are you pet friendly?</summary>
        <p>Yes! I love pets and am comfortable working in homes with animals.</p>
      </details>
    </div>
  </section>
);

const PricingGuide = () => (
  <section className="pricing-guide">
    <h2>Pricing Guide</h2>
    <div className="pricing-disclaimer">
      <p>Starting prices for reference. Final quote may vary based on specific requirements.</p>
    </div>
    <div className="pricing-grid">
      <div className="pricing-item">
        <h3>Studio/1 Bedroom</h3>
        <p className="price">From $120</p>
        <span className="duration">2-3 hours</span>
      </div>
      <div className="pricing-item">
        <h3>2-3 Bedrooms</h3>
        <p className="price">From $160</p>
        <span className="duration">3-4 hours</span>
      </div>
      <div className="pricing-item">
        <h3>Deep Cleaning</h3>
        <p className="price">From $200</p>
        <span className="duration">4-6 hours</span>
      </div>
      <div className="pricing-item">
        <h3>Move In/Out</h3>
        <p className="price">From $250</p>
        <span className="duration">5-7 hours</span>
      </div>
    </div>
  </section>
);

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="App">
      <header className="header">
        <div className="logo">Business Name</div>
        <button 
          className="mobile-menu-button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className="hamburger"></span>
        </button>
        <nav className={`nav ${isMobileMenuOpen ? 'nav-open' : ''}`}>
          <Link to="/">Home</Link>
          <Link to="/services">Services</Link>
          <Link to="/about">About</Link>
          <a href="#gallery">Gallery</a>
          <Link to="/contact">Contact</Link>
        </nav>
        <button className="book-now">Book Now</button>
      </header>

      <Routes>
        <Route path="/" element={
          // Move all your existing homepage content into this element
          <main>
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
            <PricingGuide />
            <TrustIndicators />
            <BookingSection />
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
            <ProcessSection />
            <ServiceArea />
            <section className="testimonials">
              <h2>What My Clients Say</h2>
              <Swiper
                modules={[Autoplay, Pagination]}
                spaceBetween={30}
                slidesPerView={1}
                breakpoints={{
                  640: { slidesPerView: 2 },
                  1024: { slidesPerView: 3 }
                }}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                pagination={{ clickable: true }}
                className="testimonial-slider"
              >
                {testimonials.map((testimonial, index) => (
                  <SwiperSlide key={index}>
                    <div className="testimonial-card">
                      <div className="testimonial-rating">
                        {[...Array(5)].map((_, i) => (
                          <FaStar 
                            key={i} 
                            className={i < testimonial.rating ? 'star-filled' : 'star-empty'} 
                          />
                        ))}
                      </div>
                      <p className="testimonial-text">{testimonial.text}</p>
                      <div className="testimonial-author">
                        <div className="testimonial-info">
                          <span className="testimonial-name">{testimonial.name}</span>
                          <span className="testimonial-location">{testimonial.location}</span>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </section>
            <FAQ />
          </main>
        } />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>

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
