import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Calendar from "./../Components/mini-components/Calendar";
import "./ClientForm.css";

const SERVICE_OPTIONS = [
  { label: "Wedding Photography", value: "Wedding" },
  { label: "Engagement Shoot", value: "Engagement" },
  { label: "Portraits", value: "Portraits" },
  { label: "Event Photography", value: "Event" },
  { label: "Pre-wedding Shoot", value: "Pre-wedding" },
  { label: "Other", value: "Other" },
];

function ServiceTypeSelect({ value, hasError, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);
  const selectedOption = SERVICE_OPTIONS.find((option) => option.value === value);

  useEffect(() => {
    const closeOnOutsideClick = (event) => {
      if (!selectRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", closeOnOutsideClick);

    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
    };
  }, []);

  return (
    <div className="service-select" ref={selectRef}>
      <button
        type="button"
        className={`service-select__trigger ${hasError ? "error" : ""}`}
        onClick={() => setIsOpen((currentState) => !currentState)}
      >
        <span>{selectedOption?.label || "Select a service"}</span>
        <span className="service-select__arrow">v</span>
      </button>

      {isOpen && (
        <div className="service-select__menu">
          {SERVICE_OPTIONS.map((option) => (
            <button
              type="button"
              className={`service-select__item ${
                option.value === value ? "is-selected" : ""
              }`}
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

const ClientForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    serviceType: "",
    eventDate: null,
    message: "",
  });

  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: "",
      });
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(form.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Phone number must be 10 digits";
    }

    if (!form.serviceType) {
      newErrors.serviceType = "Service type is required";
    }

   

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validate();

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      setStatus({
        type: "loading",
        message: "Sending enquiry...",
      });

      const payload = {
        ...form,
        eventDate: form.eventDate
          ? form.eventDate.toISOString()
          : null,
      };

      await axios.post(
        "http://localhost:5000/api/enquiry",
        payload
      );

      setStatus({
        type: "success",
        message:
          "Enquiry sent successfully! We will contact you soon.",
      });

      setForm({
        name: "",
        email: "",
        phone: "",
        serviceType: "",
        eventDate: null,
        message: "",
      });

      setErrors({});
    } catch (error) {
      console.error(error);

      setStatus({
        type: "error",
        message: "Failed to send enquiry.",
      });
    }
  };

  return (
    <div>
      <div className="enquiryformcontainer">
        <h2>Book your shoot</h2>

        <form
          onSubmit={handleSubmit}
          className="enquiry-form"
        >
          {/* Name */}
          <div className="form-group">
            <label>Name *</label>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className={errors.name ? "error" : ""}
            />

            {errors.name && (
              <span className="error-text">
                {errors.name}
              </span>
            )}
          </div>

          {/* Email */}
          <div className="form-group">
            <label>Email *</label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className={errors.email ? "error" : ""}
            />

            {errors.email && (
              <span className="error-text">
                {errors.email}
              </span>
            )}
          </div>

          {/* Phone */}
          <div className="form-group">
            <label>Phone *</label>

            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className={errors.phone ? "error" : ""}
              placeholder="10-digit phone number"
            />

            {errors.phone && (
              <span className="error-text">
                {errors.phone}
              </span>
            )}
          </div>

          {/* Service Type */}
          <div className="form-group">
            <label>Service Type *</label>

            <ServiceTypeSelect
              value={form.serviceType}
              hasError={Boolean(errors.serviceType)}
              onChange={(serviceType) => {
                setForm({
                  ...form,
                  serviceType,
                });

                if (errors.serviceType) {
                  setErrors({
                    ...errors,
                    serviceType: "",
                  });
                }
              }}
            />

            {errors.serviceType && (
              <span className="error-text">
                {errors.serviceType}
              </span>
            )}
          </div>

          {/* Event Date */}
          <div className="form-group">
            <label>Event Date</label>

            <Calendar
              selectedDate={form.eventDate}
              onDateChange={(date) =>
                setForm({
                  ...form,
                  eventDate: date,
                })
              }
            />
          </div>

          {/* Message */}
          <div className="form-group">
            <label>Message</label>

            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows="5"
              className={errors.message ? "error" : ""}
              placeholder="Tell me about your photography needs..."
            />

            {errors.message && (
              <span className="error-text">
                {errors.message}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={status.type === "loading"}
          >
            {status.type === "loading"
              ? "Sending..."
              : "Send Enquiry"}
          </button>

          {/* Status Message */}
          {status.message && (
            <div
              className={`status-message ${status.type}`}
            >
              {status.message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ClientForm;
