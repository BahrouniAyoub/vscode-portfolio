import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ClickSoundProvider } from "@/hooks/click-sound-provider";
import CustomCursor from "@/components/CustomCursor";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";

const App = () => (
  <ClickSoundProvider>
    <CustomCursor />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </ClickSoundProvider>
);

export default App;
