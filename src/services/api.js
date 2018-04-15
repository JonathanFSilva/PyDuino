import { create } from 'apisauce';

const api = create({
  baseURL: 'http://localhost:5000'
})

api.addResponseTransform(res => {
    if (!res.ok) throw res;
});

export default api;
