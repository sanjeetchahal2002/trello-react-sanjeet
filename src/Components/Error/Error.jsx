import { Typography } from "@mui/material";
function ErrorHandle(props) {
  let { msg } = props;
  return (
    <Typography variant="h5" color={"error"} sx={{ textAlign: "center" }}>
      {msg}
    </Typography>
  );
}

export default ErrorHandle;
