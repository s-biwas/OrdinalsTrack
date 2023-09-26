import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Outlet,
} from "react-router-dom";
import { Suspense, lazy } from "react";

import AppLayout from "./layouts/AppLayout";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
const ErrorBoundary = lazy(() => import("./components/ErrorBoundary"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Asset = lazy(() => import("./pages/Asset"));
const Page404 = lazy(() => import("./ui/Page404"));
const Detail = lazy(() => import("./pages/Detail"));
const Explore = lazy(() => import("./pages/Explore"));

const SuspenseLayout = () => (
  <Suspense fallback={<b>Loading...</b>}>
    <Outlet />
  </Suspense>
);

// import { WagmiConfig, configureChains, createConfig, mainnet } from 'wagmi'
// import { publicProvider } from 'wagmi/providers/public'
// import { InjectedConnector } from 'wagmi/connectors/injected'
// import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'

// const { chains, publicClient, webSocketPublicClient } = configureChains(
//   [mainnet],
//   [publicProvider()],
// )

// const config = createConfig({
//   autoConnect: true,
//   publicClient,
//   connectors: [
//     new InjectedConnector({ chains }),
//     new WalletConnectConnector({
//       chains,
//       options: {
//         projectId: import.meta.env.VITE_PROJECT_ID,
//       },
//     }),
//   ],
//   webSocketPublicClient,
// })

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<SuspenseLayout />}>
      <Route exact errorElement={<ErrorBoundary />}>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />,
          <Route exact path="/explore" element={<Explore />} />,
          <Route exact path="/dashboard" element={<Dashboard />} />,
          <Route exact path="/asset" element={<Asset />} />,
          <Route exact path="/detail/:id" element={<Detail />} />,
        </Route>
        <Route exact path="*" element={<Page404 />} />
      </Route>
      ,
    </Route>,
  ),
);

function App() {
  return (
    <>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "gray",
            color: "white",
          },
        }}
      />
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

// function App() {
//   return (<WagmiConfig config={config}>
//     <RouterProvider router={router}></RouterProvider>
//   </WagmiConfig>);
// }

export default App;
