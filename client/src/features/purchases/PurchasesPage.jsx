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
  const [loading, setLoading] = useState(false);

  const { user } = useAuthStore();

  // ✅ LIVE BACKEND
  const API = "https://military-asset-system-1-tgsw.onrender.com/api";

  // ✅ FETCH DATA
  const fetchPurchases = async () => {
    try {
      setLoading(true);

      const res = await axios.get(`${API}/movements`);

      // ensure safe array
      const data = Array.isArray(res.data) ? res.data : [];

      const filtered = data.filter((m) => m.type === "PURCHASE");

      setPurchases(filtered);
    } catch (err) {
      console.error("Fetch error:", err);
      setPurchases([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPurchases();
  }, []);

  // ✅ HANDLE INPUT
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ SUBMIT
  const handleSubmit = async () => {
    if (!form.equipment_id || !form.quantity || !form.to_base_id) {
      alert("⚠️ Please fill all fields");
      return;
    }

    try {
      await axios.post(`${API}/movements`, {
        ...form,
        type: "PURCHASE",
      });

      setForm({ equipment_id: "", quantity: "", to_base_id: "" });

      fetchPurchases();
    } catch (err) {
      console.error(err);
      alert("❌ Failed to add purchase");
    }
  };

  return (
    <div className="container">
      <h2>Purchases</h2>

      {/* ✅ FORM */}
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

        {user && user.role !== "COMMANDER" && (
          <button onClick={handleSubmit}>Add Purchase</button>
        )}
      </div>

      {/* ✅ TABLE */}
      <div className="card">
        {loading ? (
          <p>Loading...</p>
        ) : purchases.length === 0 ? (
          <p>No purchases found</p>
        ) : (
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
        )}
      </div>
    </div>
  );
}