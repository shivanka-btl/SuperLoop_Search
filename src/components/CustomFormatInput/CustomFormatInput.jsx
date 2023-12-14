import React from 'react';
import MaskedInput from 'react-text-mask';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import customInputStyle from "assets/jss/material-dashboard-react/components/customInputStyle.jsx";
import classNames from "classnames";

function TextMaskCustom({ ...props }) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
      placeholderChar={'\u2000'}
      showMask
    />
  );
}

TextMaskCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
};

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            value: values.value,
          },
        });
      }}
      decimalSeparator=","
      thousandSeparator="."
      isNumericString={true}
      prefix="€ "
    />
  );
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

function FormattedInputs({ ...props }) {
  const {
    classes,
    labelText,
    textmask,
    numberformat,
    inputProps,
    formControlProps,
    readOnly,
    type,
    id,
    name,
    labelProps,
    error,
    success
  } = props;

  const NON_DIGIT = '/[^\d]/g';

  const labelClasses = classNames({
    [" " + classes.labelRootError]: error,
    [" " + classes.labelRootSuccess]: success && !error
  });
  const underlineClasses = classNames({
    [classes.underlineError]: error,
    [classes.underlineSuccess]: success && !error,
    [classes.underline]: true
  });
  const marginTop = classNames({
    [classes.marginTop]: labelText === undefined
  });

  const styles = {
    textField: {
      fontSize: 14
    }
  }
  const disableEdit = readOnly ? readOnly : false;

  return (
    <FormControl
      {...formControlProps}
      className={formControlProps.className + " " + classes.formControl + " " + props.className}
    >
      {type === "text" ?  /* this section only for formatting numbers with decimals, thousand seperator, currency symbol */
        <TextField
          classes={{
            root: marginTop,
          }}
          label={props.labelText}
          value={props.numberformat}
          id={id}
          name={name}
          InputProps={{
            readOnly: disableEdit,
            inputComponent: NumberFormatCustom,
          }}
          InputLabelProps={{
            classes: {
              root: classes.labelRoot + labelClasses
            },
          }}
          onChange={(e) => props.changeValue(e.target.value, name)}
        />
        : /* this section only for numbers not allowed for decimals */
        <TextField
          classes={{
            root: marginTop,
          }}
          type="number"
          label={props.labelText}
          value={props.numberformat}
          id={id}
          name={name}
          InputLabelProps={{
            classes: {
              root: classes.labelRoot + labelClasses
            },
          }}
          onChange={(e) => props.changeValue(parseInt(e.target.value.toString().replace(NON_DIGIT, '')), name)}
        />
      }
    </FormControl>
  );
}

FormattedInputs.propTypes = {
  classes: PropTypes.object.isRequired,
  labelText: PropTypes.node,
  textmask: PropTypes.node,
  numberformat: PropTypes.node,
  inputProps: PropTypes.object,
  formControlProps: PropTypes.object,

  labelProps: PropTypes.object,
  id: PropTypes.string,
};

export default withStyles(customInputStyle)(FormattedInputs);