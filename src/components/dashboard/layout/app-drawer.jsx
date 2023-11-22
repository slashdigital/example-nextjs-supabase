"use client";
import * as React from "react";

import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

import Diversity3Icon from "@mui/icons-material/Diversity3";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import PeopleAltOutlined from "@mui/icons-material/PeopleAltOutlined";
import KeyboardCapslock from "@mui/icons-material/KeyboardCapslock";
import CasesIcon from "@mui/icons-material/CardTravelRounded";
import SupervisedUserCircleOutlined from "@mui/icons-material/SupervisedUserCircleOutlined";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import { useRouter } from "next/navigation";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const MenuTopListItemButton = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.text.primary,
  fontSize: "11px",
  ":hover": {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  "& .MuiListItemIcon-root": {
    color: theme.palette.primary.main,
  },
  "& .MuiTypography-root": {
    fontSize: "11px",
    fontWeight: 600,
    color: theme.palette.text.primary,
    textTransform: "uppercase",
  },
  "&:hover .MuiListItemIcon-root": {
    color: theme.palette.common.white,
  },
  "&:hover .MuiTypography-root": {
    color: theme.palette.common.white,
  },
}));

export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  minHeight: theme.spacing(8),
  padding: theme.spacing(0, 2),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

function Toggler({ defaultExpanded = true, renderToggle, children }) {
  const [collapse, setCollapse] = React.useState(defaultExpanded);
  return (
    <React.Fragment>
      {renderToggle({ collapse, setCollapse })}
      <Box
        sx={{
          display: "grid",
          gridTemplateRows: collapse ? "1fr" : "0fr",
          transition: "0.2s ease",
          "& > *": {
            overflow: "hidden",
          },
        }}
      >
        {children}
      </Box>
    </React.Fragment>
  );
}

export default function AppDrawer({ open }) {
  const router = useRouter();
  const menuItems = [
    {
      key: "dashboard",
      title: "Dashboard",
      icon: <PeopleAltOutlined />,
      items: [
        {
          title: "Home",
          to: "/dashboard",
          icon: <CasesIcon />,
        },
        
      ],
    },
    {
      key: "user",
      title: "System User",
      icon: <PeopleAltOutlined />,
      items: [
        {
          title: "Manage User",
          to: "/dashboard/users",
          icon: <SupervisedUserCircleOutlined />,
        },
      ],
    },
  ];
  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader />
      <List>
        {menuItems.map((menu) => (
          <ListItem
            key={menu.key}
            disablePadding
            sx={{ display: "block", fontSize: "12px", fontWeight: "bold" }}
          >
            <Toggler
              renderToggle={({ collapse, setCollapse }) => (
                <MenuTopListItemButton
                  onClick={() => setCollapse(!collapse)}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {menu.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={menu.title}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                  <ListItemSecondaryAction sx={{ opacity: open ? 1 : 0 }}>
                    <KeyboardArrowDownIcon
                      sx={{ transform: collapse ? "rotate(180deg)" : "none" }}
                    />
                  </ListItemSecondaryAction>
                </MenuTopListItemButton>
              )}
            >
              <List>
                {menu.items.map((item, index) => (
                  <ListItem
                    key={item.title}
                    disablePadding
                    sx={{ display: "block" }}
                  >
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                      }}
                      onClick={() => {
                        if (item.to) {
                          router.push(item.to);
                        }
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : "auto",
                          justifyContent: "center",
                        }}
                      >
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={item.title}
                        sx={{ opacity: open ? 1 : 0 }}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Toggler>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
