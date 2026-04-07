import { Switch, Route } from "wouter";
import MenuPrint from "@/pages/MenuPrint";

function App() {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  return (
    <Switch>
      <Route path={`${base}/`} component={MenuPrint} />
      <Route path="/" component={MenuPrint} />
    </Switch>
  );
}

export default App;
