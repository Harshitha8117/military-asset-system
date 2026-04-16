import { Link } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";

export default function Navbar() {
  const { user } = useAuthStore();

  // 🎨 Role colors
  const roleColors = {
    ADMIN: "#16a34a",        // green
    COMMANDER: "#2563eb",    // blue
    LOGISTICS: "#f59e0b"     // orange
  };

  return (
    <div
      style={{
        padding: 15,
        background: "#1e293b",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h2>Military Asset System</h2>

      {/* NAV LINKS */}
      <div>
        <Link to="/" style={{ marginRight: 15, color: "white" }}>
          Dashboard
        </Link>

        {(user.role === "ADMIN" || user.role === "LOGISTICS") && (
          <Link to="/purchases" style={{ marginRight: 15, color: "white" }}>
            Purchases
          </Link>
        )}

        {(user.role === "ADMIN" || user.role === "LOGISTICS") && (
          <Link to="/transfers" style={{ marginRight: 15, color: "white" }}>
            Transfers
          </Link>
        )}

        {(user.role === "ADMIN" || user.role === "COMMANDER") && (
          <Link to="/assignments" style={{ marginRight: 15, color: "white" }}>
            Assignments
          </Link>
        )}
      </div>

      {/* 🔥 ROLE BADGE */}
      <div
        style={{
          background: roleColors[user.role] || "#334155",
          padding: "6px 12px",
          borderRadius: "20px",
          fontWeight: "bold",
          fontSize: "12px",
        }}
      >
        {user.role}
      </div>
    </div>
  );
}