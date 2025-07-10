import { useRoutes } from 'react-router-dom';
import routesConfig from './routes/routesConfig';

function App() {
  return useRoutes(routesConfig);
}

export default App;