"use client";

import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useCallback, useEffect, useState } from "react";

import SaveIcon from "@mui/icons-material/Save";
import RemoveIcon from "@mui/icons-material/Remove";

import ContentDrawer from "@/components/dashboard/content/content-drawer";
import {
  Alert,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
} from "@mui/material";

export default function UserDataDrawer({ editingStatus, onSaved }) {
  const supabase = useSupabaseClient();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: "",
      full_name: "",
      email: "",
      platform_role: "viewer",
    },
  });

  const [toastMessage, setToastMessage] = useState({
    severity: "success",
    hasMessage: false,
    message: "",
  });
  const [formStatus, setFormStatus] = useState({ success: false, error: "" });

  const onSubmit = async (data) => {
    console.log(data);
    if (editingStatus == "create") {
      const { data: newUser, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.full_name,
            platform_role: data.platform_role,
            email: data.email,
          },
        },
      });
      console.log(error);
      if (error) {
        setToastMessage({
          severity: "error",
          message: error.message,
          hasMessage: true,
        });
      } else {
        setToastMessage({
          severity: "success",
          message: "User added. Please, ask the user to verify the email",
          hasMessage: true,
        });

        if (onSaved) {
          onSaved(editingStatus, newUser, error);
        }
      }
    }
  };

  return (
    <>
      <ContentDrawer
        title={"Add User"}
        open={["create", "edit"].includes(editingStatus)}
        onCloseClick={() => onSaved(editingStatus, null, null)}
        actions={
          <>
            <Button
              variant="outlined"
              size="small"
              color="primary"
              onClick={handleSubmit(onSubmit)}
            >
              <SaveIcon /> Save
            </Button>
            <Button variant="outlined" size="small" color="error" disabled>
              <RemoveIcon /> Remove
            </Button>
          </>
        }
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Controller
                name="full_name"
                control={control}
                render={({ field }) => (
                  <TextField
                    required
                    variant="outlined"
                    id="full_name"
                    label="Full Name"
                    fullWidth
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    required
                    type="email"
                    variant="outlined"
                    id="email"
                    label="Email"
                    fullWidth
                    {...field}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <TextField
                    required
                    type="password"
                    variant="outlined"
                    id="password"
                    label="Password"
                    fullWidth
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="platform_role"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel id="platform_role">Platform Role</InputLabel>
                    <Select
                      labelId="platform_role"
                      id="platform_role"
                      label="Platform Role"
                      {...field}
                    >
                      <MenuItem value={"superadmin"}>Super Admin</MenuItem>
                      <MenuItem value={"admin"}>Admin</MenuItem>
                      <MenuItem value={"viewer"}>Viewer</MenuItem>
                    </Select>
                  </FormControl>
                )}
              />
            </Grid>
            {/* <Grid item xs={12}>
            <Button type="submit" variant="contained">
              Save
            </Button>
          </Grid> */}
          </Grid>
        </form>
      </ContentDrawer>

      <Snackbar
        open={toastMessage.hasMessage}
        autoHideDuration={6000}
        onClose={() => setToastMessage({ ...toastMessage, hasMessage: false })}
      >
        <Alert
          onClose={() =>
            setToastMessage({ ...toastMessage, hasMessage: false })
          }
          severity={toastMessage.severity}
          sx={{ width: "100%" }}
        >
          {toastMessage.message}
        </Alert>
      </Snackbar>
    </>
  );
}
