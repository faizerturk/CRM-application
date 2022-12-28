import React from "react";
import {Refine} from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

// import { PostIcon } from "icons";


// const CustomReadyPage = () => <div> Custom Ready Page </div>;

const App: React.FC = () => {
  return (
    <Refine
      routerProvider={routerProvider}
      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
      // ReadyPage={CustomReadyPage}
    />
  );
};

export default App;
