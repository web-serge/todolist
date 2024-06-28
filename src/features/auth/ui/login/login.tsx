import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, TextField } from "@mui/material";
import s from "features/auth/ui/login/login.module.css";
import React from "react";
import { Navigate } from "react-router-dom";
import { useLogin } from "../../lib/useLogin";
import { copyTextToClipboard } from "common/utils/copyTextToClipboard";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

export const Login = () => {
  const { formik, isLoggedIn } = useLogin();

  if (isLoggedIn) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className={s.login}>
      <div className={s.container}>
        <h1>
          WELCOME TO TODOLIST
        </h1>
        <p>
          Task management application. Allows you to add, edit, mark tasks, as well as sort and prioritize them.
        </p>
      </div>

      <form onSubmit={formik.handleSubmit}>
        <h3>Sign Into Your Account</h3>
        <FormControl>
          <FormLabel>
            <small>
              Test account
              <br />
              <b>Email:</b> <span onClick={() => copyTextToClipboard('free@samuraijs.com')}
                                  style={{ cursor: "copy" }}>free@samuraijs.com <ContentCopyIcon fontSize={'inherit'}/></span>
              <br />
              <b>Password:</b> <span onClick={() => copyTextToClipboard('free')}
                                     style={{ cursor: "copy" }}>free <ContentCopyIcon fontSize={'inherit'}/></span>
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
              sx={{ backgroundColor: "#ed972c" }}
            >
              Login
            </Button>
          </FormGroup>
        </FormControl>
      </form>
    </div>
  );
};
