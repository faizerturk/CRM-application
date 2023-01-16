import {Refine} from "@pankod/refine-core";
import {
  ErrorComponent,
  ReadyPage,
  DarkTheme,
  Layout,
  CssBaseline,
  GlobalStyles,
  RefineSnackbarProvider,
  notificationProvider, AppBar, Stack, Box, IconButton,
} from "@pankod/refine-mui";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";
import {ColorModeContextProvider, ColorModeContext} from "./contexts"

import {PostList, PostShow, PostEdit, PostCreate} from "./pages";
import {useContext} from "react";
import {DarkModeOutlined, LightModeOutlined} from "@mui/icons-material";
import {Header} from "./components"

const App: React.FC = () => {
  return (
      <ColorModeContextProvider>
        <CssBaseline/>
        <GlobalStyles styles={{html: {WebkitFontSmoothing: "auto"}}}/>
        <RefineSnackbarProvider>
          <Refine
              dataProvider={dataProvider("https://api.fake-rest.refine.dev",)}
              notificationProvider={notificationProvider}
              Layout={Layout}
              ReadyPage={ReadyPage}
              catchAll={<ErrorComponent/>}
              routerProvider={routerProvider}
              Header={Header}
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
      </ColorModeContextProvider>
  );
};

export default App;
