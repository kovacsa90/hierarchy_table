import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
  container: {
    width: "98%",
    margin: "auto",
  },
  header: {
    backgroundColor: "#cce6ff",
  },
  title: {
    fontWeight: 600,
  },
  collapseCell: {
    paddingBottom: 0,
    paddingTop: 0,
  },
});

export default useStyles;
