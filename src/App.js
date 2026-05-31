import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './styles/colors.css';
import './styles/constants.css';
import './index.css';
import NotAuthProvider from './providers/NotAuthProvider';
import { useTheme } from '@mui/material/styles';
import AuthProvider from './providers/AuthProvider';
import Translation from './translation/Translation';
import { IntlProvider } from 'react-intl';
import { useConstants } from './hooks/UseConstants';
import AuthenticationRoutes from './routes/AuthenticationRoutes';
import UsersRoutes from './routes/UsersRoutes';
import Sidebar from './components/Sidebar';
import CategoriesRoutes from './routes/CategoriesRoutes';
import BannersRoutes from './routes/BannersRoutes';
import ContactsRoutes from './routes/ContactsRoutes';
import AboutusRoutes from './routes/AboutusRoutes';
import ProjectsRoutes from './routes/ProjectsRoutes';
import ClientsRoutes from './routes/ClientsRoutes';

function App() {
  const { language } = useConstants();
  const theme = useTheme();
  const messages = Translation();

  return (
    <main>
      <div className="App" style={{ backgroundColor: theme.palette.background.default }}>
        <BrowserRouter>
          <IntlProvider locale={language} messages={messages[language]}>
            <Routes>
              {
                AuthenticationRoutes().map((route, index) =>
                  <Route key={index} path={route.path} element={route.element} />
                )
              }
              {
                UsersRoutes().map((route, index) =>
                  <Route key={index} path={route.path} element={<AuthProvider><Sidebar />{route.element}</AuthProvider>} />
                )
              }
              {
                CategoriesRoutes().map((route, index) =>
                  <Route key={index} path={route.path} element={<AuthProvider><Sidebar />{route.element}</AuthProvider>} />
                )
              }
              {
                BannersRoutes().map((route, index) =>
                  <Route key={index} path={route.path} element={<AuthProvider><Sidebar />{route.element}</AuthProvider>} />
                )
              }
              {
                ContactsRoutes().map((route, index) =>
                  <Route key={index} path={route.path} element={<AuthProvider><Sidebar />{route.element}</AuthProvider>} />
                )
              }
              {
                AboutusRoutes().map((route, index) =>
                  <Route key={index} path={route.path} element={<AuthProvider><Sidebar />{route.element}</AuthProvider>} />
                )
              }
              {
                ProjectsRoutes().map((route, index) =>
                  <Route key={index} path={route.path} element={<AuthProvider><Sidebar />{route.element}</AuthProvider>} />
                )
              }
              {
                ClientsRoutes().map((route, index) =>
                  <Route key={index} path={route.path} element={<AuthProvider><Sidebar />{route.element}</AuthProvider>} />
                )
              }
            </Routes>
          </IntlProvider>
        </BrowserRouter>
      </div>
    </main>
  );
}

export default App;
