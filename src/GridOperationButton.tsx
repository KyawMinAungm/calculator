import { Button, Grid, styled } from "@mui/material";
import React from "react";
interface Props {
  operation: string;
  selectOperation: (operation: string) => void;
  selectedOperation: string;
}
const StyledButton = styled(Button)<{ selected: boolean }>((props) => ({
  backgroundColor: "rgb(6, 190, 225,0.1)",
  borderColor: props.selected ? "#fff" : "rgb(10, 190, 225,0.5)",
}));
const GridOperationButton: React.FC<Props> = ({
  operation,
  selectOperation,
  selectedOperation,
}) => {
  return (
    <Grid item xs={3}>
      <StyledButton
        selected={selectedOperation === operation}
        fullWidth
        variant="outlined"
        onClick={() => selectOperation(operation)}
      >
        {operation}
      </StyledButton>
    </Grid>
  );
};

export default GridOperationButton;
