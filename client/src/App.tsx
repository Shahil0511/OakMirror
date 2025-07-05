import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Hero from "./page/Hero";
import EditorDashboard from "./page/EditorDashboard";
import AdminDashboard from "./page/AdminDashboard";
import Dashboard from "./page/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoutes";
import Post from "./page/Post";
import { useAppSelector } from "./app/hooks";
import { selectIsAuthenticated, selectRole } from "./features/auth/authSlice";

function App() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const role = useAppSelector(selectRole);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? (
            role === 'admin' ? <Navigate to="/admin" /> :
              role === 'editor' ? <Navigate to="/editor" /> :
                <Navigate to="/user" />
          ) : (
            <Hero />
          )}
        />
        <Route element={<ProtectedRoute allowedRoles={['editor']} />}>
          <Route path="/editor" element={<EditorDashboard />} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/user" element={<Dashboard />} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={['admin', 'editor']} />}>
          <Route path="/post" element={<Post />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;