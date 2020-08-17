import React, { useState } from "react";
import { useForm } from "react-hook-form";
import './App.css';

// used to inform users of server side validation errors that are not caught
// by client side validations; password and email may pass the test for
// 'form' in the client but fail in 'substance' on server. e.g. email not
// found or bad password. Best security practice suggest that you should
// not be informing which is which as that information can be used by bad
// actors.
const Alert = ({ klass, errors }) => {
  return (
    <div>
      <ul>
        {
          Object.keys(errors).map(
            (key, index) => <li key={index}>
              <span className={klass}>{errors[key]}</span>
            </li>
          )
        }     
      </ul>
    </div>
  );
};

export default function App({ login }) {
  const [remoteErrors, setRemoteErrors] = useState({});
  const { register, handleSubmit, errors, reset } = useForm(
    {
      mode: 'onChange',
      reset: false
    }
  );

  const onSubmit = async data => {
    try {
      await login(data.email, data.password);
      console.log("reseting...");
      setRemoteErrors({});
      await reset(["email", "password"]);
    } catch (e) {
      // In browser we are hitting this path, whereas in tests
      // we are not!
      console.log('server-validation-errors: ', e);
      setRemoteErrors(e);
      // throw new Error(e);
    }
  };

  // console.log(errors);
  let serverErrors = null;
  if (remoteErrors && Object.keys(remoteErrors).length) {
    serverErrors = <Alert klass="alert-danger" errors={remoteErrors} />;
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <section>
        <h1>Login</h1>
        {
          serverErrors
        }
        <label>
          Email
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
        </label>
        <label>
          Password
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
        </label>
      </section>
      <button type="submit">SUBMIT</button>
    </form>
  );
}
