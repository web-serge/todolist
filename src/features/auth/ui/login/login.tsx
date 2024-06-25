import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, TextField } from "@mui/material";
import s from "features/auth/ui/login/login.module.css";
import React from "react";
import { Navigate } from "react-router-dom";
import { useLogin } from "../../lib/useLogin";

export const Login = () => {
  const { formik, isLoggedIn } = useLogin();

  if (isLoggedIn) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className={s.login}>
      <div className={s.container}>
        <h1>
          WELCOME
        </h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab eaque enim est eum ipsa ipsam maxime recusandae, sequi? Dolore, illo.
        </p>
      </div>

      <form onSubmit={formik.handleSubmit}>
        <h3>Sign Into Your Account</h3>
        <FormControl>
          <FormLabel>
            <small>
              To log in get registered{" "}
              <a href={"https://social-network.samuraijs.com/"} target={"_blank"} rel="noreferrer">
                here
              </a>
            <br/>
            <>or use common test account credentials:</>
              <br/>
            <> <b>Email:</b> free@samuraijs.com</>
              <br/>
            <><b>Password:</b> free</>
            </small>
          </FormLabel>
          <FormGroup>
            <TextField label="Email" margin="normal" {...formik.getFieldProps("email")} />
            {formik.touched.email && formik.errors.email && <p className={s.error}>{formik.errors.email}</p>}
            <TextField type="password" label="Password" margin="normal" {...formik.getFieldProps("password")} />
            {formik.touched.password && formik.errors.password && <p className={s.error}>{formik.errors.password}</p>}
            <FormControlLabel
              label={"Remember me"}
              control={<Checkbox {...formik.getFieldProps("rememberMe")} checked={formik.values.rememberMe} />}
            />
            <Button
              type={"submit"}
              variant={"contained"}
              disabled={!(formik.isValid && formik.dirty)}
              sx={{backgroundColor: '#ed972c'}}
            >
              Login
            </Button>
          </FormGroup>
        </FormControl>
      </form>
    </div>
  );
};
