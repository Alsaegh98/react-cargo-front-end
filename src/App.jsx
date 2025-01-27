import { useState, createContext, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import SignupForm from './components/SignupForm/SignupForm';
import SigninForm from './components/SigninForm/SigninForm';
import * as authService from '../src/services/authService'; // import the authservice
import CargoList from './components/CargoList/CargoList';
import CargoDetails from './components/CargoDetails/CargoDetails';
import * as cargoService from './services/cargoService';
import CargoForm from './components/CargoForm/CargoForm';

export const AuthedUserContext = createContext(null);

const App = () => {
  const [user, setUser] = useState(authService.getUser()); // using the method from authservice
  const [cargos, setCargos] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    const fetchAllCargos = async () => {
      const cargosData = await cargoService.index();
      setCargos(cargosData); 
    };
    if (user) fetchAllCargos();
  }, [user]);

  const handleSignout = () => {
    authService.signout();
    setUser(null);
  };

const handleAddCargo = async (cargoFormData) => {
  const newCargo = await cargoService.create(cargoFormData);
  setCargos([newCargo, ...cargos]);
  navigate('/cargos');
};

const handleDeleteCargo = async (cargoId) => {
  const deletedCargo = await cargoService.deleteCargo(cargoId);
  setCargos(cargos.filter((cargo) => cargo._id !== deletedCargo._id));
  navigate('/cargos');
};


const handleUpdateCargo = async (cargoId, cargoFormData) => {
  const updatedCargo = await cargoService.update(cargoId, cargoFormData);

  setCargos(cargos.map((cargo) => (cargoId === cargo._id ? updatedCargo : cargo)));

  navigate(`/cargos/${cargoId}`);
};

  return (
    <>
      <AuthedUserContext.Provider value={user}>
        <NavBar user={user} handleSignout={handleSignout} />
        <Routes>
  {user ? (
    // Protected Routes:
    <>
      <Route path="/" element={<Dashboard user={user} />} />
      <Route path="/cargos" element={<CargoList cargos={cargos}/>} />
      <Route path="/cargos/new" element={<CargoForm handleAddCargo={handleAddCargo} />} />
      <Route path="/cargos/:cargoId" element={<CargoDetails handleDeleteCargo={handleDeleteCargo} />} />
      <Route path="/cargos/:cargoId/edit" element={<CargoForm handleUpdateCargo={handleUpdateCargo} />} />
    </>
  ) : (
    // Public Route:
    <Route path="/" element={<Landing />} />
  )}
  <Route path="/signup" element={<SignupForm setUser={setUser} />} />
  <Route path="/signin" element={<SigninForm setUser={setUser} />} />
</Routes>
      </AuthedUserContext.Provider>
    </>
  );
};

export default App;
