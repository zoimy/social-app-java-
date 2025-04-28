import { Button, TextField } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { AppDispatch } from "../../redux/store";
import { loginUserAction } from "../../redux/slices/auth";
import { Link, useNavigate } from "react-router";

const initialValues = { email: "", password: "" };

const validationSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Required"),
  password: yup
    .string()
    .min(6, "password at least should be 6 symbols")
    .required("Required"),
});

const Login = () => {
  const [formValue, setFormvalue] =
    useState<typeof initialValues>(initialValues);
  const dispatch = useDispatch<AppDispatch>();
	const navigate  = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormvalue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      await dispatch(loginUserAction(values)).unwrap();
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="flex justify-center items-center !py-8">
      <Formik
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        initialValues={formValue}
        enableReinitialize
      >
        <Form className="space-y-5 w-full max-w-md ">
          <div className="space-y-5">
            <div>
              <Field
                as={TextField}
                name="email"
                placeholder="Email"
                type="email"
                variant="outlined"
                fullWidth
                value={formValue.email}
                onChange={handleChange}
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="!mt-4">
              <Field
                as={TextField}
                name="password"
                placeholder="Password"
                type="password"
                variant="outlined"
                fullWidth
                value={formValue.password}
                onChange={handleChange}
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500"
              />
            </div>
          </div>
          <Button
            className="!mt-4"
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
          >
            Login
          </Button>

          <Link
            className="text-blue-700 flex justify-center !mt-5"
            to={"/auth/register"}
          >
            Have not had already an account?
          </Link>
        </Form>
      </Formik>
    </div>
  );
};

export default Login;
