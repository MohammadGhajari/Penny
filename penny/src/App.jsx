import { useState } from "react";
import "./styles/base.module.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Transaction from "./pages/Transaction";
import Cluster from "./pages/Cluster";
import PageNotFound from "./pages/PageNotFound";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ToastContainer, toast } from "react-toastify";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";

function App() {
  const [isLoading, setIsLoading] = useState(false);

  const theme = createTheme({
    typography: {
      fontFamily: `Vazir`,
      fontSize: 20,
    },
    palette: {
      primary: {
        main: "#ffd700",
        tint1: "rgb(249, 222, 70)",
        tint2: "rgb(255, 237, 136)",
        shade1: "rgb(206, 176, 7)",
        shade2: "rgb(181, 155, 4)",
      },
      secondary: {
        main: "#589cd9",
        tint1: "#70a6d5",
        tint2: "#8ab2d5",
        shade1: "#268be3",
        shade2: "#3f92db",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* <GlobalStyles
        styles={{
          ".MuiInputBase-root": {
            backgroundColor: `${isDarkMode ? "#4C4C4C" : "#f7f7f7"}`,
          },
        }}
      /> */}
      {!isLoading ? (
        <BrowserRouter>
          <Routes>
            <Route index element={<Login />} />
            <Route path="cluster" element={<Cluster />} />
            <Route path="transaction" element={<Transaction />} />
            <Route path="signup" element={<Signup />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      ) : (
        <h1>loading...</h1>
      )}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        limit={10}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss={true}
        draggable={true}
        pauseOnHover={true}
        theme={"light"}
        transition:Slide
      />
    </ThemeProvider>
  );
}

export default App;
