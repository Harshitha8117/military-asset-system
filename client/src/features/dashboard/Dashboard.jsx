import { useEffect, useState } from "react";
import { fetchDashboard } from "../../api/dashboard.api";
import useAuthStore from "../../store/useAuthStore";

export default function Dashboard() {
  const [data, setData] = useState({});
  const { user } = useAuthStore();

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await fetchDashboard({
      base_id: user.role === "COMMANDER" ? user.base_id : null,
    });
    setData(res.data);
  };

  return (
    <div className="container">
      <h2>Dashboard</h2>

      <div className="grid">
        <div className="card">
          <h3>Purchases</h3>
          <p>{data.purchases || 0}</p>
        </div>

        <div className="card">
          <h3>Transfers In</h3>
          <p>{data.transfer_in || 0}</p>
        </div>

        <div className="card">
          <h3>Transfers Out</h3>
          <p>{data.transfer_out || 0}</p>
        </div>

        <div className="card">
          <h3>Assigned</h3>
          <p>{data.assigned || 0}</p>
        </div>

        <div className="card">
          <h3>Expended</h3>
          <p>{data.expended || 0}</p>
        </div>
      </div>
    </div>
  );
}