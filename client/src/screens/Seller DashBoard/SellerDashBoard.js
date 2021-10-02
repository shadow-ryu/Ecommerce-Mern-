import React, { useEffect } from "react";
import { useHistory } from "react-router";
import PropTypes from "prop-types";
import {
  createTheme,
  ThemeProvider,
  withStyles,
} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Hidden from "@material-ui/core/Hidden";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import SideNav from "../../components/AdminDashboard/SideNav";
import Header from "../../components/AdminDashboard/Header";
import Content from "../../components/AdminDashboard/Content";
import { useDispatch } from "react-redux";
import { fetchsellerProducts } from "../../Redux/Actions/productActions";
import UpdateProduct from "../../components/AdminDashboard/UpdateProduct";
import { useParams } from "react-router-dom";
import SellerOrderList from "../../components/AdminDashboard/SellerOrderList";

import Welcome from "../../components/AdminDashboard/Welcome";
import AllsellerDetails from "../../components/AdminDashboard/AllsellerDetails";
import { MyProfile } from "../../components/Myprofile/MyProfile";
function Copyright() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchsellerProducts());
  }, [dispatch]);
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit">Dragon-Mern-Ecommerce</Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

let theme = createTheme({
  palette: {
    primary: {
      light: "#63ccff",
      main: "#009be5",
      dark: "#006db3",
    },
  },
  typography: {
    h5: {
      fontWeight: 500,
      fontSize: 26,
      letterSpacing: 0.5,
    },
  },
  shape: {
    borderRadius: 8,
  },
  props: {
    MuiTab: {
      disableRipple: true,
    },
  },
  mixins: {
    toolbar: {
      minHeight: 48,
    },
  },
});

theme = {
  ...theme,
  overrides: {
    MuiDrawer: {
      paper: {
        backgroundColor: "#18202c",
      },
    },
    MuiButton: {
      label: {
        textTransform: "none",
      },
      contained: {
        boxShadow: "none",
        "&:active": {
          boxShadow: "none",
        },
      },
    },
    MuiTabs: {
      root: {
        marginLeft: theme.spacing(1),
      },
      indicator: {
        height: 3,
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
        backgroundColor: theme.palette.common.white,
      },
    },
    MuiTab: {
      root: {
        textTransform: "none",
        margin: "0 16px",
        minWidth: 0,
        padding: 0,
        [theme.breakpoints.up("md")]: {
          padding: 0,
          minWidth: 0,
        },
      },
    },
    MuiIconButton: {
      root: {
        padding: theme.spacing(1),
      },
    },
    MuiTooltip: {
      tooltip: {
        borderRadius: 4,
      },
    },
    MuiDivider: {
      root: {
        backgroundColor: "#404854",
      },
    },

    MuiListItemIcon: {
      root: {
        color: "inherit",
        marginRight: 0,
        "& svg": {
          fontSize: 20,
        },
      },
    },
    MuiAvatar: {
      root: {
        width: 32,
        height: 32,
      },
    },
  },
};

const drawerWidth = 256;

const styles = {
  root: {
    display: "flex",
    minHeight: "100vh",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  app: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  main: {
    flex: 1,
    padding: theme.spacing(6, 4),
    background: "#eaeff1",
  },
  footer: {
    padding: theme.spacing(2),
    background: "#eaeff1",
  },
};

function AdminDashboard(props) {
  const {
    classes,
    sellerProducts,
    sellerProfile,
    SellerOrder,
    Update,
    allSellers,
    allUser,
  } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchsellerProducts());
  }, [dispatch]);
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem("profile"));
  if (user?.user.role === "user" || user === null) {
    history.push("/");
  }
  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <nav className={classes.drawer}>
          <Hidden smUp implementation="js">
            <SideNav
              PaperProps={{ style: { width: drawerWidth } }}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
            />
          </Hidden>
          <Hidden xsDown implementation="css">
            <SideNav PaperProps={{ style: { width: drawerWidth } }} />
          </Hidden>
        </nav>
        <div className={classes.app}>
          <Header onDrawerToggle={handleDrawerToggle} />
          <main className={classes.main}>
            {sellerProducts ||
            SellerOrder ||
            allSellers ||
            allUser ||
            Update ? (
              ""
            ) : (
              <Welcome />
            )}
            {Update ? <UpdateProduct id={id} /> : ""}
            {sellerProducts ? <Content /> : ""}
            {allSellers ? <AllsellerDetails allSellers /> : ""}
            {allUser ? <AllsellerDetails allUser /> : ""}
            {SellerOrder ? <SellerOrderList /> : ""}
            {/* {sellerProfile ? <MyProfile /> : ""} */}
          </main>
          <footer className={classes.footer}>
            <Copyright />
          </footer>
        </div>
      </div>
    </ThemeProvider>
  );
}

AdminDashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdminDashboard);
