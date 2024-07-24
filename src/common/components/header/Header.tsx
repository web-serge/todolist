import React from "react";
import s from "./header.module.css";
import { useSelector } from "react-redux";
import { authThunks, selectIsLoggedIn } from "features/auth/model/auth.slice";
import logo from "./logo.png";
import { selectAppStatus } from "app/app.slice";
import { Button, LinearProgress } from "@mui/material";
import { useActions } from "common/hooks";
import LogoutSharpIcon from "@mui/icons-material/LogoutSharp";

export const Header = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const status = useSelector(selectAppStatus);
  const { logout } = useActions(authThunks);
  const logoutHandler = () => logout();

  return (
    <header className={s.header}>
      <div className={s.container}>
        <img src={logo} alt="logo" />
        {isLoggedIn ? (
          <Button color={'inherit'} variant={'outlined'} onClick={logoutHandler} endIcon={<LogoutSharpIcon />}>
            Logout
          </Button>
        ) : <h3 style={{color: 'white'}}>hello, guest</h3>}
      </div>
      {status === 'loading' && < LinearProgress color={"primary"} className={s.loading}/>}
    </header>
  );
}