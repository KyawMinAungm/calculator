import { Button, Container, Grid, Paper, styled } from "@mui/material";
import React, { useState } from "react";
import GridOperationButton from "./GridOperationButton";
import GridDigitButton from "./GridDigitButton";
import BackspaceIcon from "@mui/icons-material/Backspace";

const OutputContainer = styled("div")(({ theme }) => ({
  width: "100%",
  textAlign: "right",
  fontSize: "3em",
  height: "2em",
  overflow: "hidden",
  padding: theme.spacing(2),
}));

const CalculatorBase = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginTop: theme.spacing(8),
  borderRadius: 10,
}));

const App = () => {
  const [currentValue, setCurrentValue] = useState("0");
  const [operation, setOperation] = useState("");
  const [override, setOverride] = useState(true);
  const [previousValue, setPreviousValue] = useState("");

  const selectOperation = (operation: string) => {
    setOverride(true);
    setOperation(operation);
    setPreviousValue(currentValue);
    setCurrentValue("0")
  };
  const calculate = () => {
    if (!previousValue || !operation) return currentValue;
    const pv = parseFloat(previousValue);
    const cv = parseFloat(currentValue);
    let result;
    switch (operation) {
      case "+":
        result = pv + cv;
        break;
      case "-":
        result = pv - cv;
        break;
      case "*":
        result = pv * cv;
        break;
      case "÷":
        result = pv / cv;
        break;
    }
    return result;
  };

  const equal = ( ) => {
    const val = calculate()
    setCurrentValue(`${val}`)
    setOperation("")
  }
  const clear = () => {
    setCurrentValue("0");
    setPreviousValue("");
    setOverride(true);
    setOperation("");
  };
  const del = () => {
    if (currentValue.length ===1) setCurrentValue("0")
    else {
    setCurrentValue(currentValue.slice(0, -1));
    setOverride(true);
    }
  };
  const percent = () => {
    const currentValueNumber = parseFloat(currentValue);
    setCurrentValue((currentValueNumber / 100).toString());
    
  };
  const setDigit = (digit: string) => {
    if (currentValue[0] === "0" && digit === "0") return;
    if (currentValue.includes(".") && digit === ".") return;
    if (override && digit !== "0") {
      setCurrentValue(digit);
    } else {
      setCurrentValue(`${currentValue}${digit}`);
    }
    setOverride(false);
  };
  return (
    <>
      <Container maxWidth="sm">
        <CalculatorBase elevation={10}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <OutputContainer>{currentValue}</OutputContainer>
            </Grid>
            <Grid item container columnSpacing={1}>
              <GridOperationButton
                operation="AC"
                selectOperation={clear}
                selectedOperation={operation}
              />
              <GridOperationButton
                operation="Del"
                selectOperation={del}
                selectedOperation={operation}
              />
              <GridOperationButton
                operation="%"
                selectOperation={percent}
                selectedOperation={operation}
              />
              <GridOperationButton
                operation="÷"
                selectOperation={selectOperation}
                selectedOperation={operation}
              />
            </Grid>

            <Grid item container columnSpacing={1}>
              <GridDigitButton digit="7" enterDigit={setDigit} />
              <GridDigitButton digit="8" enterDigit={setDigit} />
              <GridDigitButton digit="9" enterDigit={setDigit} />
              <GridOperationButton
                operation="*"
                selectOperation={selectOperation}
                selectedOperation={operation}
              />
            </Grid>
            <Grid item container columnSpacing={1}>
              <GridDigitButton digit="4" enterDigit={setDigit} />
              <GridDigitButton digit="5" enterDigit={setDigit} />
              <GridDigitButton digit="6" enterDigit={setDigit} />
              <GridOperationButton
                operation="-"
                selectOperation={selectOperation}
                selectedOperation={operation}
              />
            </Grid>
            <Grid item container columnSpacing={1}>
              <GridDigitButton digit="1" enterDigit={setDigit} />
              <GridDigitButton digit="2" enterDigit={setDigit} />
              <GridDigitButton digit="3" enterDigit={setDigit} />
              <GridOperationButton
                operation="+"
                selectOperation={selectOperation}
                selectedOperation={operation}
              />
            </Grid>
            <Grid item container columnSpacing={1}>
              <GridDigitButton digit="0" enterDigit={setDigit} xs={6} />
              <GridDigitButton digit="." enterDigit={setDigit} />
              <Grid item xs={3}>
                <Button fullWidth variant="contained" onClick={equal} >
                  =
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </CalculatorBase>
      </Container>
    </>
  );
};

export default App;
