import './App.css';
import CampusMap from './components/CampusMap';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <CampusMap></CampusMap>
      <ToastContainer position='top-center'/>
    </div>
  );
}

export default App;
