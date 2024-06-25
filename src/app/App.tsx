import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { ErrorSnackbar } from "common/components";
import { useActions } from "common/hooks";
import { authThunks } from "features/auth/model/auth.slice";
import { selectIsInitialized } from "app/app.slice";
import { Header } from "common/components/header/Header";

function App() {
  const isInitialized = useSelector(selectIsInitialized);
  const { initializeApp } = useActions(authThunks);

  useEffect(() => {
    initializeApp();
  }, [initializeApp]);

  if (!isInitialized) {
    return (
      <div style={{ position: "fixed", top: "30%", textAlign: "center", width: "100%" }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="App" style={{ backgroundColor: "#eef1f6", position: "relative", height: "100vh" }}>
      <ErrorSnackbar />
      <Header />
      <div style={{paddingTop: '64px', maxWidth:'1200px', margin: '0 auto'}}>
        <Outlet />
      </div>
    </div>
  );
}

export default App;
