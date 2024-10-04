import './App.css';
import axios from 'axios';
import { useEffect } from 'react';

import CompShowInicio from './inicio/showInicio';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CompCreateProducto from './admin/createProducto';
import CompAdminProductos from './admin/showProdutosAdmin';
import CompEditProducto from './admin/EditProducto';
import CompLogin from './inicio/login.js';
import CompEditPrecios from './admin/EditPrecios.js';
import CompShowProductsSection from './inicio/showProdsSection.js';


function App() {


  useEffect(() => {
    const loadUserRole = async () => {
      try {
        const token = localStorage.getItem('token'); // Asegúrate de almacenar el token cuando el usuario inicia sesión
        await axios.get('https://www.fullserviceyb.com/role/role/', {
          headers: {
            'x-auth-token': token,
          },
        });

      } catch (error) {
        if (error.response && error.response.status === 401) {
          // Token expirado, borra el token del almacenamiento local
          localStorage.removeItem('token');
        } else {
          console.error('Error al cargar el rol del usuario:', error);
        }
      }
    }
    loadUserRole();
  }, []);
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>

          <Route path='/' element={<CompShowInicio />} />
          <Route path='/productos' element={<CompShowProductsSection />} />

          <Route exact path='/login' element={<CompLogin />} />
          <Route path='/admin' element={<>  <CompAdminProductos />  </>} />
          <Route path='/admin/productos/edit/:id' element={<><CompEditProducto /> </>} />
          <Route path='/admin/createproducto' element={<> <CompCreateProducto /></>} />
          <Route path='/admin/editPrecios' element={<> <CompEditPrecios /></>} />

        </Routes>
      </div>
    </BrowserRouter >
  );
}

export default App;
