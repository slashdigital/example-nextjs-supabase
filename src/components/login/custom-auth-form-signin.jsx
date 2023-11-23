"use client";

import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";

export default function CustomAuthFormSignin({ session }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const [formStatus, setFormStatus] = useState({ success: false, error: "" });

  const router = useRouter();

  const supabase = createClientComponentClient();

  const onSubmit = async (data) => {
    const result = await supabase.auth.signInWithPassword({
      email: data.username,
      password: data.password,
    });
    router.replace("/dashboard");
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };
  return (
    <>
      {session ? (
        <button onClick={handleSignOut}>Sign out</button>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Controller
                name="username"
                control={control}
                render={({ field }) => (
                  <TextField
                    required
                    variant="outlined"
                    id="username"
                    label="Username"
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
                render={({ field }) => {
                  return (
                    <TextField
                      variant="outlined"
                      type="password"
                      required
                      id="password"
                      label="Password"
                      value={""}
                      onChange={() => {}}
                      fullWidth
                      {...field}
                    />
                  );
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained">
                Sign in
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </>
  );
}
