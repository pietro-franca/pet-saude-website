import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../layout/Layout";

const Apresentacao = lazy(() => import("../../pages/Apresentacao"));
const SobreProjeto = lazy(() => import("../../pages/SobreProjeto"));
const ParaProfissionais = lazy(() => import("../../pages/ParaProfissionais"));
const LDRT = lazy(() => import("../../pages/LDRT"));

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full border-4 border-sky-200 border-t-sky-600 animate-spin" />
        <p className="text-sky-700 font-medium text-sm">Carregando...</p>
      </div>
    </div>
  );
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Apresentacao />} />
            <Route path="/sobre" element={<SobreProjeto />} />
            <Route path="/para-profissionais" element={<ParaProfissionais />} />
            <Route path="/ldrt" element={<LDRT />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
