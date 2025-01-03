import { Route, Routes } from "react-router-dom";
import Product from "./pages/Product/Product";
import Pricing from "./pages/Pricing/Pricing";
import Homepage from "./pages/Homepage/Homepage";
import PageNotFound from "./pages/PageNotFound/PageNotFound";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />

        {/* "*" is a wildcard path that matches any route not explicitly defined above. If no matching path is found, the <PageNotFound /> component is rendered. */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default App;
