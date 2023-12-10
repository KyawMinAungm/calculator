import { Button, Grid } from "@mui/material";
import React from "react";
interface Props {
  digit: string;
  xs?: number;
  enterDigit: (digit: string) => void;
}
const GridDigitButton: React.FC<Props> = ({ digit, xs = 3, enterDigit }) => {
  return (
    <Grid item xs={xs}>
        <Button fullWidth variant="outlined" onClick={() => enterDigit(digit) } >
            {digit}
        </Button>
    </Grid>
  );
};

export default GridDigitButton;
