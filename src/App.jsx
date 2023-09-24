import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Home from "./pages/Home";
import ErrorBoundary from "./components/ErrorBoundary";
import Dashboard from "./pages/Dashboard";
import Page404 from "./ui/Page404";
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
    <Route errorElement={<ErrorBoundary />}>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Home />} />,
        <Route path="/dashboard" element={<Dashboard />} />,
      </Route>
      <Route path="*" element={<Page404 />} />
    </Route>,
  ),
);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

// function App() {
//   return (<WagmiConfig config={config}>
//     <RouterProvider router={router}></RouterProvider>
//   </WagmiConfig>);
// }

export default App;
