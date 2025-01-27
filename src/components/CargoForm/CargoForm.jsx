import { useState, useEffect } from 'react';
import * as cargoService from '../../services/cargoService';
import { useParams } from 'react-router-dom'

const CargoForm = (props) => {
  const [formData, setFormData] = useState({
    email: '',
    contact: '',
    trade: 'Import',
    type: 'Transportation',
    notes: '',
  });

const { cargoId } = useParams();



useEffect(() => {
    const fetchCargo = async () => {
      const cargoData = await cargoService.show(cargoId);
      setFormData(cargoData);
    };
    if (cargoId) fetchCargo();
  }, [cargoId]);



  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = event => {
    event.preventDefault()
    if (cargoId) {
        props.handleUpdateCargo(cargoId, formData)
    } else {
        props.handleAddCargo(formData)
    }
  }

  return (
    <main>
      <form onSubmit={handleSubmit}>
      <h1>{cargoId ? 'Edit Cargo' : 'New Cargo'}</h1>
        <label htmlFor="email-input">Email:

        </label>
        <input
          required
          type="text"
          name="email"
          id="email-input"
          value={formData.email}
          onChange={handleChange}
        />
        <label htmlFor="contact-input">Contact:

        </label>
        <textarea
          required
          type="number"
          name="contact"
          id="contact-input"
          value={formData.contact}
          onChange={handleChange}
        />

<label htmlFor="trade-input">Trade:

</label>
        <select
          required
          name="trade"
          id="trade-input"
          value={formData.trade}
          onChange={handleChange}
        >
          <option value="Import">Import</option>
          <option value="Export">Export</option>

        </select>

        <label htmlFor="type-input">Type:

        </label>
        <select
          required
          name="type"
          id="type-input"
          value={formData.type}
          onChange={handleChange}
        >
          <option value="Custom Clearance">Custom Clearance</option>
          <option value="Transportation">Transportation</option>
          <option value="Packing & Moving">Packing & Moving</option>
          <option value="Freight Forwarders">Freight Forwarders</option>
        </select>

        <label htmlFor="notes-input">Notes:

        </label>
        <textarea
          type="text"
          name="notes"
          id="notes-input"
          value={formData.notes}
          onChange={handleChange}
        />
        <button type="submit">SUBMIT</button>
      </form>
    </main>
  );
};

export default CargoForm;