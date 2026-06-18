import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/lib/i18n";
import Landing from "@/pages/Landing";
import Dashboard from "@/pages/Dashboard";
import PremiumWebsite from "@/pages/PremiumWebsite";
import Chamba from "@/pages/Chamba";
import TableReserve from "@/pages/TableReserve";
import NextUp from "@/pages/NextUp";
import NfcStands from "@/pages/NfcStands";
import TvMenuBoards from "@/pages/TvMenuBoards";
import BusinessConsulting from "@/pages/BusinessConsulting";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";
import NotFound from "@/pages/not-found";
import AssistantWidget from "@/components/AssistantWidget";
import { useEffect } from "react";

const queryClient = new QueryClient();

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return null;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/demo" component={Dashboard} />
      <Route path="/premium-website" component={PremiumWebsite} />
      <Route path="/chamba" component={Chamba} />
      <Route path="/table-reserve" component={TableReserve} />
      <Route path="/nextup" component={NextUp} />
      <Route path="/nfc-stands" component={NfcStands} />
      <Route path="/tv-menu-boards" component={TvMenuBoards} />
      <Route path="/business-consulting" component={BusinessConsulting} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/terms" component={Terms} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LanguageProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <ScrollToTop />
            <Router />
            <AssistantWidget />
          </WouterRouter>
          <Toaster />
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
