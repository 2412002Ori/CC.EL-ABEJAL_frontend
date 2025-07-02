const API_BASE_URL = 'http://localhost:3003/api';

// Función para obtener el token de autenticación
const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Función para hacer peticiones HTTP con autenticación
const apiRequest = async (endpoint, options = {}) => {
  const token = getAuthToken();
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
    // Comentado temporalmente para desarrollo sin autenticación
    // ...(token && { 'Authorization': `Bearer ${token}` }),
  };

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
};

// Servicios para Solicitudes de Contratos
export const requestContractsAPI = {
  // Obtener todas las solicitudes
  getAll: () => apiRequest('/request/contracts'),
  
  // Obtener solicitud por ID
  getById: (id) => apiRequest(`/request/contracts/${id}`),
  
  // Crear nueva solicitud
  create: (data) => apiRequest('/request/contracts', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  // Actualizar solicitud
  update: (id, data) => apiRequest(`/request/contracts/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  
  // Eliminar solicitud
  delete: (id) => apiRequest(`/request/contracts/${id}`, {
    method: 'DELETE',
  }),
};

// Servicios para Contratos
export const contractsAPI = {
  // Obtener todos los contratos
  getAll: () => apiRequest('/contracts'),
  
  // Obtener contrato por ID
  getById: (id) => apiRequest(`/contracts/${id}`),
  
  // Crear nuevo contrato
  create: (data) => apiRequest('/contracts', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
};

// Servicios de autenticación
export const authAPI = {
  login: (credentials) => apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  }),
  
  register: (userData) => apiRequest('/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  }),
};

export const locationsAPI = {
  getAll: () => apiRequest('/locations'),
};

export default {
  requestContracts: requestContractsAPI,
  contracts: contractsAPI,
  locations: locationsAPI,
  auth: authAPI,
}; 

