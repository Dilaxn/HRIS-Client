import React from "react";
import { makeStyles, useTheme } from "@material-ui/styles";
import classnames from "classnames";

// styles
var useStyles = makeStyles(theme => ({
  dotBase: {
    width: 20,
    height: 1,
    backgroundColor: theme.palette.text.hint,
    borderRadius: "0%",
    transition: theme.transitions.create("background-color"),
  },
  dotSmall: {
    width: 5,
    height: 5
  },
  dotLarge: {
    width: 11,
    height: 11,
  },
}));

export default function Dot({ size, color }) {
  var classes = useStyles();
  var theme = useTheme();

  return (
    <div
      className={classnames(classes.dotBase, {
        [classes.dotLarge]: size === "large",
        [classes.dotSmall]: size === "small",
      })}
      style={{
        backgroundColor:
          color && theme.palette[color] && theme.palette[color].main,
      }}
    />
  );
}
