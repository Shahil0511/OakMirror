
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Hero from "./page/Hero"
import EditorDashboard from "./page/EditorDashboard"
import AdminDashboard from "./page/AdminDashboard"
import Dashboard from "./page/Dashboard"
import ProtectedRoute from "./routes/ProtectedRoutes"
import Post from "./page/Post"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Hero />} />
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
  )
}

export default App
