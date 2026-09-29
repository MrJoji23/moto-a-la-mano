import AppRouter from "./routes/AppRouter";
import { BrowserRouter } from "react-router-dom";
import WhatsAppButton from "./components/WhatsAppButton/WhatsAppButton";
import ConsentManager from "./components/ConsentManager/ConsentManager";

function App() {
  return (
    <BrowserRouter>
      <AppRouter />
      <WhatsAppButton />
      <ConsentManager />
    </BrowserRouter>
  );
}

export default App;