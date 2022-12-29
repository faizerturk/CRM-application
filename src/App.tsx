import { Refine } from "@pankod/refine-core";
import {
  Layout,
  ErrorComponent,
  ReadyPage,
  LightTheme,
  DarkTheme,
  CssBaseline,
  ThemeProvider,
  GlobalStyles,
  RefineSnackbarProvider,
  notificationProvider,
} from "@pankod/refine-mui";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

import { PostList, PostShow, PostEdit, PostCreate } from "./pages";

const overridedLightTheme = {
  ...DarkTheme,
  palette: {
    ...DarkTheme.palette,
    primary: {
      main: "#97DECE",
    },
    secondary: {
      main: "#6668ac",
    },
  },
};

const App: React.FC = () => {
  return (
      <ThemeProvider theme={overridedLightTheme}>
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
              resources={[
                {
                  name: "posts",
                  list: PostList,
                  edit: PostEdit,
                  show: PostShow,
                  create: PostCreate,
                  //canDelete: true,
                },
              ]}
          />
        </RefineSnackbarProvider>
      </ThemeProvider>
  );
};

export default App;
