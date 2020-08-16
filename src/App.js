import React from "react";
import { useForm } from "react-hook-form";
import './App.css';

export default function App({ login }) {
  const { register, handleSubmit, errors, reset } = useForm(
    {
      mode: 'onChange'
    }
  );
  const onSubmit = async data => {
    await login(data.email, data.password);
    reset();
  };

  // console.log(errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <section>
        <h1>Login</h1>
        <label htmlFor="email">email</label>
        <input
          id="email"
          name="email"
          aria-invalid={errors.email ? "true" : "false"}
          ref={register({
            required: "required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Entered value does not match email format"
            }
          })}
          type="email"
          placeholder="example@mail.com"
        />
        {errors.email && <span role="alert">{errors.email.message}</span>}
        <label htmlFor="password">password</label>
        <input
          id="password"
          name="password"
          aria-invalid={errors.passward ? "true" : "false"}
          ref={register({
            required: "required",
            minLength: {
              value: 5,
              message: "min length is 5"
            }
          })}
          type="password"
          placeholder="password"
        />
        {errors.password && <span role="alert">{errors.password.message}</span>}
      </section>
      <button type="submit">SUBMIT</button>
    </form>
  );
}
