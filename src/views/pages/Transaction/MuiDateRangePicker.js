import React from "react";
import { DateRange, DateRangePicker } from "materialui-daterange-picker";
import DateRangeIcon from "@material-ui/icons/DateRange";
import * as fns from "date-fns";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { TextFieldProps } from "@material-ui/core/TextField";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import Backdrop from "@material-ui/core/Backdrop";

export type MuiDateRangePickerProps = {
  dateRange: DateRange;
  onDateRangeChange: (dateRange: DateRange) => void;
  fomat?: string;
  TextFieldProps?: TextFieldProps;
};

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
}));

export const MuiDateRangePicker = (props: MuiDateRangePickerProps) => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const format = props.fomat ?? "yyyy-MM-dd";

  const toggle = () => setOpen(!open);

  const getDisplayDateRange = (dateRange: DateRange): string => {
    const startDate = dateRange?.startDate
      ? fns.format(dateRange.startDate, format)
      : undefined;

    const endDate = dateRange?.endDate
      ? fns.format(dateRange.endDate, format)
      : undefined;

    return startDate || endDate ? `${startDate} - ${endDate}` : "";
  };

  return (
    <>
      <TextField
        {...props.TextFieldProps}
        value={getDisplayDateRange(props.dateRange)}
        onClick={toggle}
        InputProps={{
          ...props.TextFieldProps?.InputProps,
          readOnly: true,
          endAdornment: (
            <IconButton>
              <DateRangeIcon />
            </IconButton>
          )
        }}
      />
      <Modal
        className={classes.modal}
        open={open}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <div>
            <DateRangePicker
              open={true}
              toggle={toggle}
              onChange={(range) => {
                props.onDateRangeChange(range);
                toggle();
              }}
              initialDateRange={props.dateRange}
            />
          </div>
        </Fade>
      </Modal>
    </>
  );
};

export { DateRange, TextFieldProps };
