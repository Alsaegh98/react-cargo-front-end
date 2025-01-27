/////cargoServices.js
const BASE_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/cargos`


const index = async () => {
    try {
        const res = await fetch(BASE_URL, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        return res.json()
    } catch (error) {
        console.log(error)
    }
}

const show = async (cargoId) => {
    try {
      const res = await fetch(`${BASE_URL}/${cargoId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      if (res.ok) {
        return await res.json();
      } else {
        console.error('Failed to fetch cargo details');
      }
    } catch (error) {
      console.error(error);
    }
  };
  

  const create = async (cargoFormData) => {
    try {
      const res = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cargoFormData),
      });
  
      if (res.ok) {
        return await res.json();
      } else {
        console.error('Failed to create cargo');
      }
    } catch (error) {
      console.log(error);
    }
  };
  

  const deleteCargo = async (cargoId) => {
    try {
      const res = await fetch(`${BASE_URL}/${cargoId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
  };

  const update = async (cargoId, cargoFormData) => {
    try {
        const res = await fetch(`${BASE_URL}/${cargoId}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cargoFormData)
        })
        return res.json()
    } catch (error) {
        console.log(error)
    }
}
  
  export { index, show, create, deleteCargo, update };