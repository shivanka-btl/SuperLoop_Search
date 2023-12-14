import {
  drawerWidth,
  drawerWidthHidden,
  transition,
  container
} from "assets/jss/material-dashboard-react.jsx";

const appStyle = theme => ({
  wrapper: {
    position: "relative",
    top: "0",
    height: "100vh"
  },
  mainPanel: {
    width: `calc(100% - ${drawerWidth}px)`,
    overflow: "auto",
    position: "relative",
    float: "right",
    ...transition,
    maxHeight: "100%",
    overflowScrolling: "touch"
  },
  mainPanel2: {
    width: `calc(100% - ${drawerWidthHidden}px)`,
    overflow: "auto",
    position: "relative",
    float: "right",
    ...transition,
    maxHeight: "100%",
    overflowScrolling: "touch"
  },
  content: {
    marginTop: "70px",
    padding: "30px 15px",
    minHeight: "calc(100vh - 123px)"
  },
  container,
  map: {
    marginTop: "70px"
  },
  expandButton: {
    border: "2px solid black",
    borderRadius: "50%",
    position: "fixed",
    zIndex: 2,
    left: "40px",
    top: "90px",
    background: "#eee",
    minWidth: 0,
    padding: 0,
    width: "30px",
    height: "30px",
    transition: "all 0.5s ease-out",

  },
  collapseButton: {
    border: "2px solid black",
    borderRadius: "50%",
    position: "fixed",
    zIndex: 2,
    // left: "245px",
    left: "40px",
    top: "90px",
    background: "#eee",
    minWidth: 0,
    padding: 0,
    width: "30px",
    height: "30px",
    transition: "all 0.5s ease-out",
    transform: "translateX(205px) rotate(180deg)",

  }
});

export default appStyle;
