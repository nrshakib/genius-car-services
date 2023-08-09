import React from "react";
import { useRef } from "react";
import { Button, Form } from "react-bootstrap";
import {
  useSendPasswordResetEmail,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import auth from "../../firebase.init";
import Loading from "../Shared/Loading/Loading";
import SocialLogIn from "./SocialLogIn/SocialLogIn";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PageTitle from "../Shared/PageTitle/PageTitle";

const Login = () => {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const navigate = useNavigate();

  const location = useLocation();

  let from = location.state?.from?.pathname || "/";

  let errorElement;

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const [sendPasswordResetEmail, sending] = useSendPasswordResetEmail(auth);

  if (loading || sending) {
    return <Loading></Loading>;
  }

  if (error) {
    errorElement = <p className="text-danger">Error: {error?.message}</p>;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    signInWithEmailAndPassword(email, password);
  };
  const navigateRegister = (event) => {
    navigate("/register");
  };

  if (user) {
    navigate(from, { replace: true });
  }
  const resetPassword = async () => {
    const email = emailRef.current.value;
    if (email) {
      await sendPasswordResetEmail(email);
      toast("Sent email");
    } else {
      toast("Please Enter Valid Email");
    }
  };

  return (
    <div className="container w-50 mx-auto">
      <PageTitle title="LogIn"></PageTitle>
      <h2 className="text-primary text-center mt-2">Please Log In</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            ref={emailRef}
            type="email"
            placeholder="Enter email"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            ref={passwordRef}
            type="password"
            placeholder="Password"
            required
          />
        </Form.Group>

        <Button variant="primary w-50 mx-auto d-block mb-2" type="submit">
          Log In
        </Button>

        {errorElement}

        <p>
          New Here?{" "}
          <Link
            to="/register"
            className="text-primary pe-auto text-decoration-none"
            onClick={navigateRegister}
          >
            Please Register
          </Link>
        </p>
        <p>
          Forgot Password?{" "}
          <button
            className="btn btn-link text-primary pe-auto text-decoration-none"
            onClick={resetPassword}
          >
            Reset Password
          </button>
        </p>
        <SocialLogIn></SocialLogIn>
      </Form>
    </div>
  );
};

export default Login;
