import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Privacidade from "./pages/Privacidade";
import Termos from "./pages/Termos";
import AIChatAssistant from "./components/AIChatAssistant";
import CookieBanner from "./components/CookieBanner";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/privacidade"} component={Privacidade} />
      <Route path={"/termos"} component={Termos} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
          <AIChatAssistant />
          <CookieBanner />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
