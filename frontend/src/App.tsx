import Router from "./routes";
import { MantineProvider } from "@mantine/core";
import theme from "./utils/theme";
import "./App.css";
import { ErrorBoundary } from "react-error-boundary";
import { FallbackUi } from "./pages";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";
import { Notifications } from "@mantine/notifications";
import { BrowserRouter } from "react-router-dom";
import { RouteTypeContextProvider } from "./context/RouteTypeContext";
const App = () => {
  return (
    <ErrorBoundary
      FallbackComponent={FallbackUi}
      onError={(error: Error) => {
        console.error(error);
      }}
    >
      <MantineProvider theme={theme}>
        <Notifications />
        <BrowserRouter>
          <RouteTypeContextProvider>
            <Router />
          </RouteTypeContextProvider>
        </BrowserRouter>
      </MantineProvider>
    </ErrorBoundary>
  );
};

export default App;
