import { lazy, Suspense } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/home";

const NotFound = lazy(() => import("@/pages/not-found"));

function Router() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-void" aria-hidden="true" />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <>
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
        <Router />
      </WouterRouter>
      <Toaster />
    </>
  );
}

export default App;
