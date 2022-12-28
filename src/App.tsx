import { Refine } from "@pankod/refine-core";
import {
  Layout,
  ErrorComponent,
  ReadyPage,
  LightTheme,
  CssBaseline,
  ThemeProvider,
  GlobalStyles,
  RefineSnackbarProvider,
  notificationProvider,
} from "@pankod/refine-mui";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

const App: React.FC = () => {
  return (
      <ThemeProvider theme={LightTheme}>
        <CssBaseline />
        <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
        <RefineSnackbarProvider>
          <Refine
              routerProvider={routerProvider}
              dataProvider={dataProvider(
                  "https://api.fake-rest.refine.dev",
              )}
              notificationProvider={notificationProvider}
              Layout={Layout}
              ReadyPage={ReadyPage}
              catchAll={<ErrorComponent />}
              resources={[{ name: "posts" }]}
          />
        </RefineSnackbarProvider>
      </ThemeProvider>
  );
};

export default App;
