import React, {useEffect} from 'react';
import { InputGroup } from "reactstrap";
import { Field } from "formik";
//Import material time picker
import moment from 'moment';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { orange } from "@material-ui/core/colors";
import Stack from '@mui/material/Stack';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const defaultMaterialTheme = createTheme({
	components: {
		// Name of the component
		MuiIconButton: {
			styleOverrides: {
				// Name of the slot
				root: {
					// Some CSS
					fontSize: '1rem',
				},
			},
		}
	}
});

const TimePickerComponent = ({errors, touched, setFieldValue, ...props}) => {
	const [value, setValue] = React.useState(moment(`2020-01-01 00:00:00`));
	const [aux, setAux] = React.useState(0)
	useEffect(() => {
		if(aux === 0) {
			if(props.values && props.values[props.name])
				setValue(moment(`2020-01-01 ${props.values[props.name]}`))
		}
	}, [props.values])
  return (
	  <LocalizationProvider dateAdapter={AdapterMoment}>
			  <Field
				  className="form-control"
				  name={props.name}
				  label="Time"
				  ampm={true}
				  openTo="hours"
				  views={['hours', 'minutes']}
				  format="HH:mm"
			  >
				  {({
					field,
					form: {touched, errors},
					meta
				  }) => (
		  			<ThemeProvider theme={defaultMaterialTheme}>
					  <TimePicker
						  components={{
							  OpenPickerIcon: (props) => (
								  <AccessTimeIcon {...props} sx={{ color: 'orange' }} />
							  ),
						  }}
						  renderInput={(params) => <TextField {...params} />}
						  value={value}
						  label={props.label || "Tiempo"}
						  onChange={(newValue) => {
							  console.log('props.name: ', props.name);
							  setFieldValue(props.name, newValue.format('HH:mm:ss'))
							  if(aux === 0) setAux(1)
							  setValue(newValue)
						  }}
						  // minTime={moment('2018-01-01T08:00')}
						  // maxTime={moment('2018-01-01T18:45')}
					  />
		 			 </ThemeProvider>
				  )}

			  </Field>
	  </LocalizationProvider>
  )
}

export default TimePickerComponent
