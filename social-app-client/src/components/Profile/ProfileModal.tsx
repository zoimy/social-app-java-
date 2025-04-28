import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { updateProfileAction } from "../../redux/slices/auth";

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
};

const validationSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
});

export default function ProfileModal({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleSubmit = (values: any) => {
    if (user?.id) {
      dispatch(updateProfileAction(values));
    }
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography color="textPrimary" variant="h6" mb={2}>
          Edit Profile
        </Typography>

        <Formik
          initialValues={{
            firstName: user?.firstName || "",
            lastName: user?.lastName || "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ errors, touched }) => (
            <Form className="flex flex-col gap-4">
              <Field
                as={TextField}
                label="First Name"
                name="firstName"
                fullWidth
                error={touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
              />
              <Field
                as={TextField}
                label="Last Name"
                name="lastName"
                fullWidth
                error={touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
              />
              <Button type="submit" variant="contained" color="primary">
                Save Changes
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
}
