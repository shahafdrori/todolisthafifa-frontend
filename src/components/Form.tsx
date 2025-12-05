import { useEffect } from "react";
import { useAtom, useAtomValue } from "jotai";
import {
  Button,
  Box,
  TextField,
  Dialog,
  DialogActions,
  MenuItem,
} from "@mui/material";
import {
  openFormAtom,
  tasksAtom,
  editModeAtom,
  intialDataAtom,
  setCoordinatesAtom,
} from "../atoms/atoms";
import { Field, Form, Formik } from "formik";
import { number, object, string } from "yup";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import FormikDatePicker from "./DatePicker";
import { sendData } from "../api/post";
import { useQueryClient } from "@tanstack/react-query";
import { editData } from "../api/editData";
import MapComponent from "./Map/MapComponent";
import { Task } from "../atoms/atoms";

interface FormProps {
  onClose: () => void;
}

const initalValues = {
  name: "",
  priority: "",
  subject: "",
  date: "",
  coordinates: {
    longitude: "",
    latitude: "",
  },
};

const FormComponent: React.FC<FormProps> = ({ onClose }) => {
  const [editMode, setEditMode] = useAtom(editModeAtom);
  const [formOpen, setFormOpen] = useAtom(openFormAtom);
  const tasks = useAtomValue(tasksAtom);
  const initialData = useAtomValue(intialDataAtom);
  const coordinates = useAtomValue(setCoordinatesAtom);
  const queryClient = useQueryClient();

  const handleCloseForm = () => {
    setFormOpen(false);
    enqueueSnackbar("Form closed", { variant: "info" });
  };

  const handleSubmit = async (values: Task) => {
    console.log("Form values:", values);
    try {
      if (editMode) {
        editData({ values });
        enqueueSnackbar("Task Edited", { variant: "success" });
        setEditMode(false);
      } else if (
        tasks.some(
          (task) => task.name.toLowerCase() === values.name.toLowerCase()
        )
      ) {
        enqueueSnackbar("Task name must be unique", { variant: "error" });
        return;
      } else {
        await sendData({ values });
        enqueueSnackbar("Task Added", { variant: "success" });
      }

      setFormOpen(false);
    } catch (error) {
      enqueueSnackbar("Operation failed", { variant: "error" });
      console.error(error);
    }
    queryClient.invalidateQueries(["Tasks"]);
  };

  return (
    <Box>
      <SnackbarProvider maxSnack={3} />
      <Dialog open={formOpen} onClose={onClose}>
        <Formik
          initialValues={editMode ? initialData : initalValues}
          enableReinitialize={true}
          validationSchema={object({
            name: string().required("Please enter a name"),
            priority: number()
              .required("Enter a priority level")
              .min(1, "Minimum is 1")
              .max(5, "Maximum is 5"),
            subject: string().required("Please choose a subject"),
            coordinates: object({
              longitude: number().required("Longitude required"),
              latitude: number().required("Latitude required"),
            }),
          })}
          onSubmit={handleSubmit}
        >
          {({ errors, isValid, touched, dirty, setFieldValue }) => {
            useEffect(() => {
              if (coordinates.length === 2) {
                setFieldValue("coordinates.longitude", coordinates[0]);
                setFieldValue("coordinates.latitude", coordinates[1]);
              }
            }, [coordinates, setFieldValue]);

            return (
              <Form style={{ padding: "20px", overflowY: "hidden" }}>
                <Field
                  name="name"
                  type="text"
                  as={TextField}
                  variant="outlined"
                  color="primary"
                  label="Task Name"
                  fullWidth
                  size="small"
                  error={Boolean(errors.name) && Boolean(touched.name)}
                  placeholder={Boolean(touched.name) && errors.name}
                />
                <Box height={16} />
                <Field
                  name="priority"
                  type="number"
                  min="1"
                  max="5"
                  as={TextField}
                  variant="outlined"
                  color="primary"
                  label="Priority Level"
                  size="small"
                  fullWidth
                  error={Boolean(errors.priority) && Boolean(touched.priority)}
                  placeholder={Boolean(touched.priority) && errors.priority}
                />
                <Box height={16} />
                <Field
                  name="subject"
                  as={TextField}
                  select
                  variant="outlined"
                  color="primary"
                  label="Subject"
                  size="small"
                  fullWidth
                  error={Boolean(errors.subject) && Boolean(touched.subject)}
                  placeholder={Boolean(touched.subject) && errors.subject}
                >
                  <MenuItem value="SRP">SRP</MenuItem>
                  <MenuItem value="OCP">OCP</MenuItem>
                  <MenuItem value="LSP">LSP</MenuItem>
                  <MenuItem value="ISP">ISP</MenuItem>
                  <MenuItem value="DIP">DIP</MenuItem>
                </Field>
                <Box height={16} />
                <FormikDatePicker name="date" label="Due Date" />
                <Box height={16} />
                <Field
                  name="coordinates.longitude"
                  type="text"
                  as={TextField}
                  variant="outlined"
                  color="primary"
                  label="Lng"
                  size="small"
                  inputProps={{ "data-test": "lng-input" }}
                  error={
                    Boolean(errors.coordinates?.longitude) &&
                    Boolean(touched.coordinates?.longitude)
                  }
                  placeholder={errors.coordinates?.longitude}
                />
                <Field
                  name="coordinates.latitude"
                  type="text"
                  as={TextField}
                  variant="outlined"
                  color="primary"
                  label="Lat"
                  size="small"
                  inputProps={{ "data-test": "lat-input" }}
                  error={
                    Boolean(errors.coordinates?.latitude) &&
                    Boolean(touched.coordinates?.latitude)
                  }
                  placeholder={errors.coordinates?.latitude}
                />
                <Box height={16} />
                You can click on the map to set coordinates
                <MapComponent formMode={true} />
                <Box height={16} />
                <DialogActions>
                  <Button
                    variant="contained"
                    type="submit"
                    sx={{ color: "white" }}
                    disabled={!(isValid && dirty)}
                  >
                    Submit
                  </Button>
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: "red", color: "white" }}
                    onClick={handleCloseForm}
                    data-test="cancel-button"
                  >
                    Cancel
                  </Button>
                </DialogActions>
              </Form>
            );
          }}
        </Formik>
      </Dialog>
    </Box>
  );
};

export default FormComponent;
