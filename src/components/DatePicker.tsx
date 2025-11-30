import React from "react";
import DatePicker from "react-datepicker";
import { useField } from "formik";
import "react-datepicker/dist/react-datepicker.css";
import { Box } from "@mui/material";

interface FormikDatePickerProps {
  label: string;
  name: string;
}

const FormikDatePicker: React.FC<FormikDatePickerProps> = ({
  label,
  ...props
}) => {
  const [field, meta, helpers] = useField(props);
  const { setValue } = helpers;

  return (
    <>
      <label>{label} : </label>
      <DatePicker
        {...field}
        {...props}
        selected={field.value ? new Date(field.value) : new Date()}
        onChange={(date) => setValue(date)}
        onBlur={() => field.onBlur(field.name)}
      />
      {meta.touched && meta.error ? (
        <Box className="error">{meta.error}</Box>
      ) : null}
    </>
  );
};

export default FormikDatePicker;
