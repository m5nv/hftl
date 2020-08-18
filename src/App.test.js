import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import App from "./App";

describe("App", () => {
  const renderForm = (toFail) => {
    let mock = null;
    if (toFail) {
      mock = jest.fn((email, password) => {
        return new Promise(( _, reject) => {
          setTimeout(() => {
            reject({credentials: 'email or password is invalid' });
          }, 500);
        });
      });
    } else {
      mock = jest.fn((email, password) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({ email, password });
          }, 500);
        });
      });      
    }
    const result = render(<App login={mock} />);
    return {result, mock};
  }

  // returns the elements of interest
  const subjectsUnderTest = () => {
    const email = screen.getByRole("textbox", { name: /email/i });
    const password = screen.getByLabelText(/password/i);
    const submit = screen.getByRole("button");
    return { email, password, submit };
  }

  it("should display required error when value is invalid", async () => {
    const { mock } = renderForm(false);
    fireEvent.submit(screen.getByRole("button"));

    expect(await screen.findAllByRole("alert")).toHaveLength(2);
    expect(mock).not.toBeCalled();
  });

  it("should display matching error when email is invalid", async () => {
    const { mock } = renderForm(false);
    const {email, password, submit} = subjectsUnderTest();

    userEvent.type(email, "test");
    userEvent.type(password, "password");

    userEvent.click(submit);

    expect(await screen.findAllByRole("alert")).toHaveLength(1);
    expect(mock).not.toBeCalled();

    // NOTE: 
    // .toHaveAttribute('value') will fail with RHF but passes with Formik!
    // expect(email).toHaveAttribute('value');
  
    expect(email.value).toBe("test");
    expect(password.value).toBe("password");
  });

  it("should display min length error when password is invalid", async () => {
    const { mock } = renderForm(false);
    const {email, password, submit} = subjectsUnderTest();

    userEvent.type(email, "test@mail.com");
    userEvent.type(password, "pass");

    userEvent.click(submit);

    expect(await screen.findAllByRole("alert")).toHaveLength(1);
    expect(mock).not.toBeCalled();

    expect(email.value).toBe("test@mail.com");
    expect(password.value).toBe("pass");
  });

  it("should display no errors AND reset when accepted by server", async () => {
    const { mock } = renderForm(false);
    const {email, password, submit} = subjectsUnderTest();

    userEvent.type(email, "test@mail.com");
    userEvent.type(password, "password");

    userEvent.click(submit);

    await waitFor(() => {
      expect(mock).toBeCalledWith("test@mail.com", "password");
      expect(screen.queryAllByRole("alert")).toHaveLength(0);
      expect(email.value).toBe("");
      expect(password.value).toBe("");
    });

  });

  it("should NOT reset AND display server validation errors", async () => {
    const { mock } = renderForm(true);
    const {email, password, submit} = subjectsUnderTest();

    userEvent.type(email, "fake-tester@mail.com");
    userEvent.type(password, "password-maybe");

    userEvent.click(submit);

    await waitFor(() => {
      expect(mock).toBeCalledWith("fake-tester@mail.com", "password-maybe");
      expect(screen.queryAllByRole("alert")).toHaveLength(0);
      expect(email.value).toBe("fake-tester@mail.com");
      expect(password.value).toBe("password-maybe");

      const serverError = screen.getByText(/email or password is invalid/i);
      expect(serverError).toBeInTheDocument();
    });
  });
});
