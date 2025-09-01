import api from './apiClient';


export async function getAnalytics() {
const { data } = await api.get('/api/v1/superadmin/analytics/');
return data; 
}