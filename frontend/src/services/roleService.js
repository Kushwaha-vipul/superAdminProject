import api from './apiClient';


const base = '/api/v1/superadmin/roles';


export async function getRoles() {
const { data } = await api.get(base);
return data;
}
export async function create(payload) {
const { data } = await api.post(base, payload); 
return data;
}
export async function update(id, payload) {
const { data } = await api.put(`${base}/${id}`, payload);
return data;
}

export async function assignRoleById(userId, roleId) {
const { data } = await api.post(`${base}/assign-role`, { userId, roleId });
return data;
}

export async function assignRoleNames(userId, roles) {
const { data } = await api.post(`${base}/assign-role`, { userId, roles });
return data;
}