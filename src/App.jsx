
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

import {
  collection,
  doc,
  onSnapshot,
  setDoc,
  deleteDoc
} from "firebase/firestore";

import { auth, db } from "./services/firebase";

import {
  loginUser,
  registerUser,
  logoutUser
} from "./services/auth";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Explore from "./pages/Explore";
import Favorites from "./pages/Favorites";
import MovieDetail from "./pages/MovieDetail";

import AppLayout from "./components/AppLayout";
import "./styles/global.css";

function App() {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [favorites, setFavorites] = useState([]);

  // Verificar el estado de autenticación
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUsuario(user);
      setCargando(false);
    });

    return () => unsubscribe();
  }, []);

  // Cargar favoritos desde Firestore
  useEffect(() => {
    if (!usuario) {
      setFavorites([]);
      return;
    }

    const favoritesRef = collection(
      db,
      "users",
      usuario.uid,
      "favorites"
    );

    const unsubscribe = onSnapshot(
      favoritesRef,
      (snapshot) => {
        const savedFavorites = snapshot.docs.map((item) => ({
          ...item.data(),
          id: Number(item.id)
        }));

        setFavorites(savedFavorites);
      },
      (error) => {
        console.error("Error cargando favoritos:", error);
      }
    );

    return () => unsubscribe();
  }, [usuario]);

  // Iniciar sesión
  const iniciarSesion = async (email, password) => {
    await loginUser(email, password);
  };

  // Registrar usuario
  const registrarUsuario = async (name, email, password) => {
    await registerUser(name, email, password);
  };

  // Cerrar sesión
  const cerrarSesion = async () => {
    await logoutUser();
  };

  // Agregar o eliminar favoritos en Firestore
  const toggleFavorite = async (movie) => {
    if (!usuario) return;

    const favoriteRef = doc(
      db,
      "users",
      usuario.uid,
      "favorites",
      String(movie.id)
    );

    const exists = favorites.some(
      (item) => item.id === movie.id
    );

    try {
      if (exists) {
        await deleteDoc(favoriteRef);
      } else {
        await setDoc(favoriteRef, {
          ...movie,
          createdAt: new Date().toISOString()
        });
      }
    } catch (error) {
      console.error("Error actualizando favorito:", error);
    }
  };

  if (cargando) {
    return <p>Cargando MoviePicker...</p>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/inicio" replace />}
        />

        <Route
          path="/login"
          element={
            usuario ? (
              <Navigate to="/inicio" replace />
            ) : (
              <Login
                onLogin={iniciarSesion}
                onRegister={registrarUsuario}
              />
            )
          }
        />

        <Route
          element={
            <AppLayout
              onLogout={usuario ? cerrarSesion : null}
            />
          }
        >
          <Route
            path="/inicio"
            element={<Home usuario={usuario} />}
          />

          <Route
            path="/dashboard"
            element={
              <Dashboard
                usuario={usuario}
                favorites={favorites}
              />
            }
          />

          <Route
            path="/explorar"
            element={
              <Explore
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
                usuario={usuario}
              />
            }
          />

          <Route
            path="/favoritos"
            element={
              <Favorites
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
                usuario={usuario}
              />
            }
          />

          <Route
            path="/pelicula/:id"
            element={
              <MovieDetail
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
                usuario={usuario}
              />
            }
          />
        </Route>

        <Route
          path="*"
          element={<Navigate to="/inicio" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
