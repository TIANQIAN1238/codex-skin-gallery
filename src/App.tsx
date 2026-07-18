import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AppShell } from './components/AppShell'
import { CatalogPage } from './pages/CatalogPage'
import { CollectionsPage } from './pages/CollectionsPage'
import { GuidePage } from './pages/GuidePage'
import { HomePage } from './pages/HomePage'
import { InstallPage } from './pages/InstallPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { SkinDetailPage } from './pages/SkinDetailPage'
import { SubmitPage } from './pages/SubmitPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route index element={<HomePage />} />
          <Route path="skins" element={<CatalogPage />} />
          <Route path="skins/:skinId" element={<SkinDetailPage />} />
          <Route path="install/:skinId" element={<InstallPage />} />
          <Route path="collections" element={<CollectionsPage />} />
          <Route path="guide" element={<GuidePage />} />
          <Route path="submit" element={<SubmitPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route path="zh" element={<AppShell />}>
          <Route index element={<HomePage />} />
          <Route path="skins" element={<CatalogPage />} />
          <Route path="skins/:skinId" element={<SkinDetailPage />} />
          <Route path="install/:skinId" element={<InstallPage />} />
          <Route path="collections" element={<CollectionsPage />} />
          <Route path="guide" element={<GuidePage />} />
          <Route path="submit" element={<SubmitPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
