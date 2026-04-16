import { useState, useEffect } from "react";
import axios from "axios";
import useAuthStore from "../../store/useAuthStore";

export default function PurchasesPage() {
  const [form, setForm] = useState({
    equipment_id: "",
    quantity: "",
    to_base_id: "",
  });

  const [purchases, setPurchases] = useState([]);
  const { user } = useAuthStore();

  const API = "http://localhost:5000/api";

  const fetchPurchases = async () => {
    const res = await axios.get(`${API}/movements`);
    const filtered = res.data.filter((m) => m.type === "PURCHASE");
    setPurchases(filtered);
  };

  useEffect(() => {
    fetchPurchases();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await axios.post(`${API}/movements`, {
        ...form,
        type: "PURCHASE",
      });

      setForm({ equipment_id: "", quantity: "", to_base_id: "" });
      fetchPurchases();
    } catch (err) {
      alert("❌ Failed");
    }
  };

  return (
    <div className="container">
      <h2>Purchases</h2>

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
          name="to_base_id"
          placeholder="Base ID"
          value={form.to_base_id}
          onChange={handleChange}
        />

        {user.role !== "COMMANDER" && (
          <button onClick={handleSubmit}>Add Purchase</button>
        )}
      </div>

      <div className="card">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Equipment</th>
              <th>Quantity</th>
              <th>Base</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {purchases.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.equipment_id}</td>
                <td>{p.quantity}</td>
                <td>{p.to_base_id}</td>
                <td>{p.created_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}