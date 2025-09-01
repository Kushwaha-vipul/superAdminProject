import api from './apiClient';


export async function login(email, password) {
     console.log("Sending login request:", { email, password });
const { data } = await api.post('/api/v1/auth/login', { email, password });
console.log("Response from backend:", data);
return data; 
}


export function logout() {
localStorage.removeItem('token');
}