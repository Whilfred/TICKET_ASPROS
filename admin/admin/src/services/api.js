const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

export const api = {
  // Auth
  async login(email, password) {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    if (data.token) localStorage.setItem('admin_token', data.token);
    return data;
  },

  async logout() {
    localStorage.removeItem('admin_token');
  },

  // Categories
  async getCategories() {
    const response = await fetch(`${API_URL}/categories`);
    return response.json();
  },

  async createCategory(data) {
    const response = await fetch(`${API_URL}/admin/categories`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
      },
      body: JSON.stringify(data)
    });
    return response.json();
  },

  async updateCategory(id, data) {
    const response = await fetch(`${API_URL}/admin/categories/${id}`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
      },
      body: JSON.stringify(data)
    });
    return response.json();
  },

  async deleteCategory(id) {
    const response = await fetch(`${API_URL}/admin/categories/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${localStorage.getItem('admin_token')}` }
    });
    return response.json();
  },

  // Events
  async getEvents() {
    const response = await fetch(`${API_URL}/events`);
    return response.json();
  },

  async createEvent(data) {
    const response = await fetch(`${API_URL}/admin/events`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
      },
      body: JSON.stringify(data)
    });
    return response.json();
  },

  async updateEvent(id, data) {
    const response = await fetch(`${API_URL}/admin/events/${id}`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
      },
      body: JSON.stringify(data)
    });
    return response.json();
  },

  async deleteEvent(id) {
    const response = await fetch(`${API_URL}/admin/events/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${localStorage.getItem('admin_token')}` }
    });
    return response.json();
  },

  // Stats
  async getStats() {
    const response = await fetch(`${API_URL}/admin/stats`, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('admin_token')}` }
    });
    return response.json();
  }
};
