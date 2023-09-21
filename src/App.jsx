import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Home from "./pages/Home";
import ConnectWallet from "./pages/ConnectWallet";
import ErrorBoundary from "./components/ErrorBoundary";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<ErrorBoundary />}>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Home />} />,
      </Route>
      <Route path="/addwallet" element={<ConnectWallet />} />, ,
    </Route>,
  ),
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
