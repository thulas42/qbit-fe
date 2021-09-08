import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';

const validationSchema = yup.object({
  amount: yup
    .number('Amount must be a number')
    .required('Amount is required'),
  currency: yup
    .string('Select currency')
    .required('Currency is required'),
});

const App = () => {
  const formik = useFormik({
    initialValues: {
      amount: 3343,
      currency: 'ZAR',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="amount"
          name="amount"
          label="amount"
          value={formik.values.amount}
          onChange={formik.handleChange}
          error={formik.touched.amount && Boolean(formik.errors.amount)}
          helperText={formik.touched.amount && formik.errors.amount}
        />
        <FormControl error={formik.errors.currency ? true : false} >
          <InputLabel id="demo-simple-select-helper-label">Currency</InputLabel>
          <Select
            fullWidth
            id="currency"
            name="currency"
            label="currency"
            type="currency"
            value={formik.values.currency}
            onChange={formik.handleChange}
            error={formik.touched.currency && Boolean(formik.errors.currency)}
          >
            <MenuItem value="">
              <i>None</i>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
          <FormHelperText>{formik.touched.currency && formik.errors.currency}</FormHelperText>
        </FormControl>
        <Button color="primary" variant="contained" fullWidth type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default App