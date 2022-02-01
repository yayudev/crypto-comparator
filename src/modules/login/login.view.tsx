import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { User, UserContext } from "../shared/user.context";
import "./login.styles.css";

const PHONE_NUMBER_REGEX =
  /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

export function Login() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data: any) {
    setUser(data as User);
    navigate("/compare/BTC");
  }

  return (
    <div className="login">
      <h1 className="login-title">Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} data-testid="login-form">
        <div>
          <label>First Name</label>
          <input
            data-testid="first-name-input"
            type="text"
            {...register("firstName", { required: true })}
          />
          {errors.firstName?.type === "required" && (
            <p className="login-error">First name is required</p>
          )}
        </div>

        <div>
          <label>Last Name</label>
          <input
            type="text"
            data-testid="last-name-input"
            {...register("lastName", { required: true })}
          />
          {errors.lastName?.type === "required" && (
            <p className="login-error">Last name is required</p>
          )}
        </div>

        <div>
          <label>Email</label>
          <input
            type="email"
            data-testid="email-input"
            {...register("email", { required: true })}
          />
          {errors.email?.type === "required" && (
            <p className="login-error">Email is required</p>
          )}
          {errors.email?.type && errors.email?.type !== "required" && (
            <p className="login-error">Email must be valid</p>
          )}
        </div>

        <div>
          <label>Phone Number</label>
          <input
            type="tel"
            data-testid="phone-number-input"
            {...register("phoneNumber", {
              required: true,
              validate: {
                valid: (value) => PHONE_NUMBER_REGEX.test(value),
              },
            })}
          />
          {errors.phoneNumber?.type === "required" && (
            <p className="login-error">Phone is required</p>
          )}
          {errors.phoneNumber?.type && errors.phoneNumber?.type === "valid" && (
            <p className="login-error">Phone must be valid</p>
          )}
        </div>

        <div className="login-submit-button">
          <button type="submit" data-testid="submit-button">
            Log in
          </button>
        </div>
      </form>
    </div>
  );
}
