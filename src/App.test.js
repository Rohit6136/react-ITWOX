import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";
import { Provider } from "react-redux";
import store from "store";
import configureStore from "redux-mock-store";
import "@testing-library/jest-dom";

// mock useDispatch
const mockDispatch = jest.fn();

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch.mockReturnValueOnce(true),
}));

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

beforeEach(() => {
  const localStorageMock = {};
  Object.defineProperty(window, 'localStorage', {
    value: {
      getItem: jest.fn((key) => localStorageMock[key]),
      setItem: jest.fn((key, value) => (localStorageMock[key] = value)),
      removeItem: jest.fn((key) => delete localStorageMock[key]),
    },
    writable: true,
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

const mockStore = configureStore();

describe("Tests for HomePage", () => {
  it("should have a top navigation bar", () => {
    window.history.pushState({}, "", "/");
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const headerElement = screen.queryByTestId("navigation-component");

    expect(headerElement).toBeInTheDocument();
  });

  it("renders Sign In button when not signed in", () => {
    const initialState = {
      auth: {
        userData: { email: null },
      },
    };
    const mockedStore = mockStore(initialState);
    render(
      <Provider store={mockedStore}>
        <App />
      </Provider>
    );

    const signInButton = screen.queryByText("Sign in");
    expect(signInButton).toBeInTheDocument();
  });

  it("When user is signed in, user should have a top navigation bar with a 'dashboard' & a 'sign out' button", () => {
    const initialState = {
      auth: {
        userData: { email: "katiyarkartik0@gmail.com" },
      },
    };
    const mockedStore = mockStore(initialState);
    render(
      <Provider store={mockedStore}>
        <App />
      </Provider>
    );
    const signOutButton = screen.queryByText("Sign Out");
    expect(signOutButton).toBeInTheDocument();
    const dashboardButton = screen.queryByText("Dashboard");
    expect(dashboardButton).toBeInTheDocument();
  });
});

describe("Tests for dashboard", () => {
  it("should have a top navigation bar", () => {
    const initialState = {
      auth: {
        userData: { email: "katiyarkartik0@gmail.com" },
      },
    };
    const mockedStore = mockStore(initialState);

    window.history.pushState({}, "", "/dashboard");

    render(
      <Provider store={mockedStore}>
        <App />
      </Provider>
    );
    const headerElement = screen.queryByTestId("navigation-component");

    expect(headerElement).toBeInTheDocument();
  });

  it("should have a title Dashboard", () => {
    const initialState = {
      auth: {
        userData: { email: "katiyarkartik0@gmail.com" },
      },
    };
    const mockedStore = mockStore(initialState);

    window.history.pushState({}, "", "/dashboard");

    render(
      <Provider store={mockedStore}>
        <App />
      </Provider>
    );
    const dashboardTitleElement = screen.queryByTestId("dashboard-title");
    expect(dashboardTitleElement).toBeInTheDocument();
  });

  it("should only be accessible if a user is signed in", () => {
    const initialState = {
      auth: {
        userData: { email: null },
      },
    };
    const mockedStore = mockStore(initialState);

    window.history.pushState({}, "", "/dashboard");

    render(
      <Provider store={mockedStore}>
        <App />
      </Provider>
    );
    const dashboardTitleElement = screen.queryByTestId("dashboard-title");
    expect(dashboardTitleElement).not.toBeInTheDocument();
  });
});

describe("Tests for Sign-in Page", () => {
  it("should NOT have a top navigation bar", () => {
    window.history.pushState({}, "", "/sign-in");
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const headerElement = screen.queryByTestId("navigation-component");

    expect(headerElement).not.toBeInTheDocument();
  });

  it("user can signin if username is valid", async () => {
    const { getByLabelText, getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const emailInput = getByLabelText("Email");
    const passwordInput = getByPlaceholderText("Password");
    const submitButton = getByText("Submit");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "testpassword" } });

    fireEvent.click(submitButton);

    expect(localStorage.setItem).toHaveBeenCalled();
    expect(mockedUsedNavigate).toHaveBeenCalledTimes(1);
  });

});
