import { useRoutes } from 'react-router-dom';
import routesConfig from './routes/routesConfig';
import './App.css'; 
function App() {
  return useRoutes(routesConfig);
}

export default App;