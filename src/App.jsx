import { useState } from "react";
import AppRouter from "./routes/AppRouter";
import { BrowserRouter } from "react-router-dom";
import WhatsAppButton from "./components/WhatsAppButton/WhatsAppButton";
import ConsentManager from "./components/ConsentManager/ConsentManager";

function App() {
  const [isBannerVisible, setIsBannerVisible] = useState(
    !localStorage.getItem("cookieConsent"),
  );

  return (
    <BrowserRouter>
      <AppRouter />
      <WhatsAppButton moveUp={isBannerVisible} />
      <ConsentManager onAccept={() => setIsBannerVisible(false)} />
    </BrowserRouter>
  );
}

export default App;
