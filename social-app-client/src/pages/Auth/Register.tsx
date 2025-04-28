import {
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { ErrorMessage, Field, FieldProps, Form, Formik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { AppDispatch } from "../../redux/store";
import { registerUserAction } from "../../redux/slices/auth";
import { Link, useNavigate } from "react-router";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  gender: "",
};

const validationSchema = yup.object().shape({
  firstName: yup
    .string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  lastName: yup
    .string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: yup.string().email("Invalid email").required("Required"),
  password: yup
    .string()
    .min(6, "password at least should be 6 symbols")
    .required("Required"),
  gender: yup.string().required("Gender is required"),
});

const Register = () => {
  const [formValue, setFormvalue] =
    useState<typeof initialValues>(initialValues);
	const dispatch = useDispatch<AppDispatch>()
	const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormvalue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (values: typeof initialValues) => {
		try {
			await dispatch(registerUserAction(values)).unwrap()
			navigate("/auth/login")
		} catch (error) {
			console.error("Registration failed:", error);
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
        <Form className="space-y-5 w-full max-w-md">
          <div className="space-y-5">
            <div className="!mt-4">
              <Field
                as={TextField}
                name="firstName"
                placeholder="firstName"
                type="text"
                variant="outlined"
                fullWidth
                value={formValue.firstName}
                onChange={handleChange}
              />
              <ErrorMessage
                name="firstName"
                component={"div"}
                className="text-red-500"
              />
            </div>
            <div className="!mt-4">
              <Field
                as={TextField}
                name="lastName"
                placeholder="lastName"
                type="text"
                variant="outlined"
                fullWidth
                value={formValue.lastName}
                onChange={handleChange}
              />
              <ErrorMessage
                name="lastName"
                component={"div"}
                className="text-red-500"
              />
            </div>
            <div className="!mt-4">
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
                component={"div"}
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
                component={"div"}
                className="text-red-500"
              />
            </div>

            <div className="!mt-4">
              <Field name="gender">
                {({ field }: FieldProps) => (
                  <FormControl>
                    <RadioGroup row {...field}>
                      <FormControlLabel
                        value="female"
                        control={<Radio />}
                        label="Female"
                      />
                      <FormControlLabel
                        value="male"
                        control={<Radio />}
                        label="Male"
                      />
                    </RadioGroup>
                  </FormControl>
                )}
              </Field>
              <ErrorMessage
                name="gender"
                component={"div"}
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
            Register
          </Button>

					<Link className="text-blue-700 flex justify-center !mt-5" to={"/auth/login"}>
					Have already an account?
					</Link>
        </Form>
      </Formik>
    </div>
  );
};

export default Register;
