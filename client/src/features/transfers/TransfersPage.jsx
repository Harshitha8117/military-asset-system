import { useState, useEffect } from "react";
import axios from "axios";
import useAuthStore from "../../store/useAuthStore";

export default function TransfersPage() {
  const [form, setForm] = useState({
    equipment_id: "",
    quantity: "",
    from_base_id: "",
    to_base_id: "",
  });

  const [transfers, setTransfers] = useState([]);
  const { user } = useAuthStore();

  const API = "http://localhost:5000/api";

  const fetchTransfers = async () => {
    const res = await axios.get(`${API}/movements`);
    const filtered = res.data.filter(
      (m) => m.type === "TRANSFER_IN" || m.type === "TRANSFER_OUT"
    );
    setTransfers(filtered);
  };

  useEffect(() => {
    fetchTransfers();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await axios.post(`${API}/movements`, {
        type: "TRANSFER_OUT",
        equipment_id: form.equipment_id,
        quantity: form.quantity,
        from_base_id: form.from_base_id,
      });

      await axios.post(`${API}/movements`, {
        type: "TRANSFER_IN",
        equipment_id: form.equipment_id,
        quantity: form.quantity,
        to_base_id: form.to_base_id,
      });

      setForm({
        equipment_id: "",
        quantity: "",
        from_base_id: "",
        to_base_id: "",
      });

      fetchTransfers();
    } catch (err) {
      alert("❌ Transfer failed");
    }
  };

  return (
    <div className="container">
      <h2>Transfers</h2>

      <div className="card">
        <input
          name="equipment_id"
          placeholder="Equipment ID"
          value={form.equipment_id}
          onChange={handleChange}
        />
        <input
          name="quantity"
          placeholder="Quantity"
          value={form.quantity}
          onChange={handleChange}
        />
        <input
          name="from_base_id"
          placeholder="From Base"
          value={form.from_base_id}
          onChange={handleChange}
        />
        <input
          name="to_base_id"
          placeholder="To Base"
          value={form.to_base_id}
          onChange={handleChange}
        />

        {(user.role === "ADMIN" || user.role === "LOGISTICS") && (
          <button onClick={handleSubmit}>Transfer</button>
        )}
      </div>

      <div className="card">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Type</th>
              <th>Equipment</th>
              <th>Quantity</th>
              <th>From</th>
              <th>To</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {transfers.map((t) => (
              <tr key={t.id}>
                <td>{t.id}</td>
                <td>{t.type}</td>
                <td>{t.equipment_id}</td>
                <td>{t.quantity}</td>
                <td>{t.from_base_id}</td>
                <td>{t.to_base_id}</td>
                <td>{t.created_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}