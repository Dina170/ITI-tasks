import React from "react";
import { Controller, useForm } from "react-hook-form";

function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const onsubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="contact">
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit(onsubmit)}>
        <div className="form-group">
          <label htmlFor="email">Email</label>

          <Controller
            name="email"
            control={control}
            rules={{ required: true }}
            render={({ field }) => <input {...field} type="email" />}
          />
          {errors.email && <p className="error">email is required</p>}
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>

          <textarea
            id="message"
            rows="4"
            {...register("message", {
              required: true,
              minLength: { value: 5, message: "min len is 5" },
            })}
          ></textarea>

          {errors.message?.type == "required" && (
            <p className="error">message is required</p>
          )}
          {errors.message?.type == "minLength" && (
            <p className="error">{errors.message.message}</p>
          )}
        </div>
        <button type="submit" className="btn">
          Send
        </button>
      </form>
    </div>
  );
}

export default Contact;
