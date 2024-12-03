import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import DatePicker from 'react-datepicker';
import Calendar from 'react-calendar';
import "react-datepicker/dist/react-datepicker.css";
import './assessment-page.css';

const BookingSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  phone: Yup.string().required('Phone number is required'),
  address: Yup.string().required('Address is required'),
  serviceType: Yup.string().required('Please select a service type'),
});

const AssessmentPage = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleSubmit = (values, { setSubmitting }) => {
    // Add your form submission logic here
    console.log('Form submitted:', values, selectedDate);
    setSubmitting(false);
  };

  const isDateUnavailable = (date) => {
    // Add your date availability logic here
    return false;
  };

  const getTileClassName = ({ date }) => {
    const day = date.getDay();
    if (day === 0 || day === 6) return 'weekend';
    if (isDateUnavailable(date)) return 'fully-booked';
    return '';
  };

  return (
    <section className="booking assessment-page">
      <h2>Schedule Your Free Assessment</h2>
      <p className="booking-subtitle">Request an in-home evaluation to get your personalized cleaning quote</p>
      
      <div className="booking-container">
        <Formik
          initialValues={{
            name: '',
            phone: '',
            address: '',
            serviceType: '',
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
                <DatePicker
                  selected={selectedDate}
                  onChange={date => setSelectedDate(date)}
                  filterDate={date => {
                    const day = date.getDay();
                    return day !== 0 && day !== 6 && !isDateUnavailable(date);
                  }}
                  minDate={new Date()}
                  placeholderText="Preferred Assessment Date"
                  className="date-picker"
                  dateFormat="MMMM d, yyyy"
                  required
                />
              </div>

              <div className="form-group">
                <Field
                  as="textarea"
                  name="message"
                  placeholder="Tell us about your cleaning needs (Optional)"
                  className="textarea-input"
                />
              </div>

              <button type="submit" disabled={isSubmitting} className="submit-button">
                {isSubmitting ? 'Submitting...' : 'Schedule Free Assessment'}
              </button>
            </Form>
          )}
        </Formik>

        <div className="booking-sidebar">
          <div className="calendar-container">
            <h3>Available Assessment Times</h3>
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
            <h3>Assessment Information</h3>
            <ul>
              <li>Free in-home evaluation</li>
              <li>Personalized quote based on your needs</li>
              <li>Available Monday-Friday</li>
              <li>Weekend appointments upon request</li>
              <li>No obligation quote</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AssessmentPage;
