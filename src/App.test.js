import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import App from "./App";

const mockLogin = jest.fn((email, password) => {
  return Promise.resolve({ email, password });
});

describe("App", () => {
  beforeEach(() => {
    render(<App login={mockLogin} />);
  });

  it("should display required error when value is invalid", async () => {
    fireEvent.submit(screen.getByRole("button"));

    expect(await screen.findAllByRole("alert")).toHaveLength(2);
    expect(mockLogin).not.toBeCalled();
  });

  xit("should display matching error when email is invalid", async () => {
    const textBox = screen.getByRole("textbox", { name: /email/i });
    const password = screen.getByLabelText("password");
    const submit = screen.getByRole("button");

    screen.debug(textBox);
    userEvent.type(textBox, "test");
    userEvent.type(password, "password");

    screen.debug(textBox);
    userEvent.click(submit);

    expect(await screen.findAllByRole("alert")).toHaveLength(1);
    expect(mockLogin).not.toBeCalled();
    expect(screen.getByRole("textbox", { name: /email/i }).value).toBe("test");
    expect(screen.getByLabelText("password").value).toBe("password");
  });

  it("should display matching error when email is invalid", async () => {
    const textBox = screen.getByRole("textbox", { name: /email/i });
    const password = screen.getByLabelText("password");
    const submit = screen.getByRole("button");

    console.log('>before "typing" in {mode: "onChange"}');
    screen.debug(textBox);
    screen.debug(password);
    fireEvent.input(textBox, { target: { value: "test" } });
    fireEvent.input(password, { target: { value: "password" } });
    
    console.log('> after "typing", before "clicking in {mode: "onChange"}');
    screen.debug(textBox);
    screen.debug(password);
    fireEvent.submit(submit);

    console.log('> after "typing", after "clicking in {mode: "onChange"}');
    screen.debug(textBox);
    screen.debug(password);

    expect(await screen.findAllByRole("alert")).toHaveLength(1);
    expect(mockLogin).not.toBeCalled();

    // This test will fail with RHF but passes with Formik!
    // expect(textBox).toHaveAttribute('value');

    expect(textBox.value).toBe("test");
    expect(password.value).toBe("password");
  });

  xit("should display matching error when email is invalid", async () => {
    fireEvent.input(screen.getByRole("textbox", { name: /email/i }), {
      target: {
        value: "test"
      }
    });

    fireEvent.input(screen.getByLabelText("password"), {
      target: {
        value: "password"
      }
    });

    fireEvent.submit(screen.getByRole("button"));

    expect(await screen.findAllByRole("alert")).toHaveLength(1);
    expect(mockLogin).not.toBeCalled();
    expect(screen.getByRole("textbox", { name: /email/i }).value).toBe("test");
    expect(screen.getByLabelText("password").value).toBe("password");
  });

  it("should display min length error when password is invalid", async () => {
    fireEvent.input(screen.getByRole("textbox", { name: /email/i }), {
      target: {
        value: "test@mail.com"
      }
    });

    fireEvent.input(screen.getByLabelText("password"), {
      target: {
        value: "pass"
      }
    });

    fireEvent.submit(screen.getByRole("button"));

    expect(await screen.findAllByRole("alert")).toHaveLength(1);
    expect(mockLogin).not.toBeCalled();
    expect(screen.getByRole("textbox", { name: /email/i }).value).toBe(
      "test@mail.com"
    );
    expect(screen.getByLabelText("password").value).toBe("pass");
  });

  it("should not display error when value is valid", async () => {
    fireEvent.input(screen.getByRole("textbox", { name: /email/i }), {
      target: {
        value: "test@mail.com"
      }
    });

    fireEvent.input(screen.getByLabelText("password"), {
      target: {
        value: "password"
      }
    });

    fireEvent.submit(screen.getByRole("button"));

    await waitFor(() => expect(screen.queryAllByRole("alert")).toHaveLength(0));
    expect(mockLogin).toBeCalledWith("test@mail.com", "password");
    expect(screen.getByRole("textbox", { name: /email/i }).value).toBe("");
    expect(screen.getByLabelText("password").value).toBe("");
  });
});
