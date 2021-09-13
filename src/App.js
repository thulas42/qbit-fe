import React , {useEffect, useState}from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import './App.scss';


const validationSchema = yup.object({
  amount: yup
    .number('Amount must be a number')
    .required('Amount is required'),
  currency: yup
    .string('Select currency')
    .required('Currency is required'),
});




const App = () => {

  const [rates, setRates] = useState([]);
  const [rate, setRate] = useState([]);
  const [base, setBase] = useState('');

  const getCurrencies = async () =>{
    let response = await fetch('http://localhost:4000/currencies');
    let data = await response.json();
    // console.log("data", data);
    // let base = Object.keys(data).at(data.base);
    // console.log("base", base);
    // setBase(base);
    let result = Object.keys(data.rates).map((key) => [key, data.rates[key]]);
    return result;
  
  
  }

  useEffect(()=>{
    setRates(getCurrencies());
  },[])

  const formik = useFormik({
    initialValues: {
      amount: 3343,
      currency: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });


  



  return (
    <div className="App">
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
          <InputLabel>Currency</InputLabel>
          <Select
            fullWidth
            id="currency"
            name="currency"
            label="currency"
            type="currency"
            value={formik.values.currency}
            onChange={e => setRate(e.target.value)}
            error={formik.touched.currency && Boolean(formik.errors.currency)}
          >
          {
              rates.rates && rates.map( item => (
               <MenuItem value={item[0  ]}>{item[0]}</MenuItem>
              ))
                 
        
            }
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