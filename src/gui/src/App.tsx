import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppLayout } from './AppLayout';
import { ViewCollectionScreen } from './screens/ViewCollection';
import { MarkOwnedScreen } from './screens/MarkOwned';
import { MarkDuplicateScreen } from './screens/MarkDuplicate';
import { StatisticsScreen } from './screens/Statistics';
import { SearchScreen } from './screens/Search';
import { ExportScreen } from './screens/Export';
import { AppProviders } from './AppProviders';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <AppProviders>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<ViewCollectionScreen />} />
            <Route path="/mark-owned" element={<MarkOwnedScreen />} />
            <Route path="/mark-duplicate" element={<MarkDuplicateScreen />} />
            <Route path="/statistics" element={<StatisticsScreen />} />
            <Route path="/search" element={<SearchScreen />} />
            <Route path="/export" element={<ExportScreen />} />
          </Route>
        </Routes>
      </AppProviders>
    </BrowserRouter>
  );
}

export default App;