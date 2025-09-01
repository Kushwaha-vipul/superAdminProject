import api from './apiClient';

export async function getAuditLogs(queryString = '') {
  const { data } = await api.get(`/api/v1/superadmin/audit-logs${queryString ? '?' + queryString : ''}`);
  return data;
}