import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import { calcZar } from './calc';

const converstionSchema = Yup.object().shape({
  amount: Yup.number().required('Amount is required'),
  currency: Yup.string().required('Currency is required')
})

const App = () => {

  const [ratesList, setRates] = useState(0);
  const [amount, setAmount] = useState('');
  const [zar, setZar] = useState('');

  const fetchMyApi = async () => {
    try {
      let response = await fetch('http://localhost:4000/currencies');
      let res = await response.json();
      let ratesArr = await Object.keys(res.rates).map((key) => [key, res.rates[key]]);
      let currentZar = ratesArr.find(item => item[0] == 'ZAR')
      setZar(currentZar[1])
      setRates(ratesArr);
    } catch (error) { throw error.message };
  }

  useEffect(() => {
    fetchMyApi();
  }, [])

  return (
    <div className="App">
      <Formik
        initialValues={{
          amount: '',
          currency: ''
        }}
        validationSchema={converstionSchema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            setSubmitting(false);
            let zarTotal = calcZar(values.currency, parseInt(values.amount), zar)
            setAmount(zarTotal);
          }, 400);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleSubmit,
        }) => (
          <>
            <div className="App--zar">R{amount ? amount : 0.00}</div>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                id="amount"
                name="amount"
                label="Enter amount"
                value={values.amount}
                onChange={handleChange}
                error={errors.amount && Boolean(errors.amount)}
                helperText={touched.amount && errors.amount}
              />
              <FormControl error={errors.currency ? true : false} fullWidth>
                <InputLabel
                  style={{ disableAnimation: false }}
                  disableAnimation={false}
                >
                  Select currency
                </InputLabel>                
                <Select
                  fullWidth
                  id="currency"
                  name="currency"
                  label="currency"
                  type="currency"
                  onChange={handleChange}
                  error={Boolean(errors.currency)}
                  helperText={touched.currency && Boolean(errors.currency)}
                >

                  <MenuItem selected disabled value="">
                    <em>None</em>
                  </MenuItem>
                  {ratesList.length > 0 && ratesList.map(key => (
                    <MenuItem key={key} value={key[1]}>{key[0]}</MenuItem>))}
                </Select>
                <FormHelperText>{touched.currency && errors.currency}</FormHelperText>
              </FormControl>
              <Button color="primary" variant="contained" type="submit">
                Convert
              </Button>
            </form>
          </>

        )}
      </Formik>

    </div>
  );
};

export default App