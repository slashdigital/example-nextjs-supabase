import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Box, Card, Container, Grid, Paper, Typography } from "@mui/material";
import CustomAuthFormSignin from "@/components/login/custom-auth-form-signin";

import { useTranslation } from "@/app/i18n";

export default async function Login() {
  const supabase = createServerComponentClient({ cookies });
  const { t } = await useTranslation('en');

  const {
    data: { session },
  } = await supabase.auth.getSession();
  return (
    <Container maxWidth="sm">
      <Paper elevation={3}>
        <Card>
          <Box
            sx={{
              p: 2,
              borderRadius: 2,
              bgcolor: "background.default",
              display: "grid",
              gap: 2,
            }}
          >
            <div className="row">
              <div className="col-6"></div>
              <div className="col-6 auth-widget">
                {/* <AuthFormSignin /> */}
                <Typography variant="subtitle1" sx={{mb: '24px'}}>
                  {t('login.title') }
                </Typography>
                
                <CustomAuthFormSignin session={session} />
              </div>
            </div>
          </Box>
        </Card>
      </Paper>  
    </Container>
  );
}
