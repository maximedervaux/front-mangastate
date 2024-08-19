// src/stores/authStore.js
import { defineStore } from 'pinia';
import axios from 'axios';
import { API_URL } from '../common/config';
import {jwtDecode} from 'jwt-decode';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('authToken') || '',
    expirationTime: localStorage.getItem('expirationTime') || null,
    user: localStorage.getItem('user') || null,
  }),
  actions: {
    async login(username, password) {
      try {
        const response = await axios.post(`${API_URL}/auth/login`, {
          username: username,
          password: password
        });
        
        if (response.status === 200) {
          this.token = response.data.access_token;

          // Décoder le token pour obtenir le temps d'expiration
          const decodedToken = jwtDecode(this.token);
          this.expirationTime = decodedToken.exp * 1000; // Convertir en millisecondes

          // Stocker le token et son expiration
          localStorage.setItem('authToken', this.token);
          localStorage.setItem('expirationTime', this.expirationTime);

          // Configurer le header Authorization pour axios
          axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;

          // Récupérer les informations de l'utilisateur et les sauvegarder
          this.user = (await axios.get(`${API_URL}/auth/profile`)).data;
          localStorage.setItem('user', JSON.stringify(this.user));

          return this.token;
        } else {
          throw new Error('Login failed');
        }
      } catch (error) {
        console.error('Error logging in', error);
        throw error;
      }
    },
    logout() {
      this.token = '';
      this.expirationTime = null;
      this.user = null;
      localStorage.removeItem('authToken');
      localStorage.removeItem('expirationTime');
      localStorage.removeItem('user'); 
      delete axios.defaults.headers.common['Authorization'];
    },
    isTokenValid() {
      if (!this.token || !this.expirationTime) {
        return false;
      }
      return Date.now() < this.expirationTime;
    },
    loadToken() {
      // Vérifier si le token est encore valide
      if (this.token && this.expirationTime) {
        if (!this.isTokenValid()) {
          this.logout();
        } else {
          // Configurer le header Authorization pour axios si le token est valide
          axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
        }
      }
    }
  }
});
