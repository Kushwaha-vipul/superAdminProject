import api from './apiClient';


const base = '/api/v1/superadmin/users';


export async function getUsers(params = {}) {
const { data } = await api.get(base, { params });
return data;
}
export async function getById(id) {
const { data } = await api.get(`${base}/${id}`);
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
export async function remove(id) {
const { data } = await api.delete(`${base}/${id}`);
return data;
}