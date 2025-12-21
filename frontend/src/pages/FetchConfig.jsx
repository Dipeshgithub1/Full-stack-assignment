import { useState } from "react";
import { api } from "../services/api";

export default function FetchConfig() {
  const [id, setId] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = async () => {
    if (!id.trim()) {
      setError("Please enter a configuration ID");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const res = await api.get(`/configurations/${id}`);
      setData(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch configuration");
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section">
      <h2>Fetch Configuration</h2>
      <div className="input-group">
        <label htmlFor="config-id">Configuration ID:</label>
        <input
          id="config-id"
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="Enter configuration ID"
        />
      </div>
      <button className="button" onClick={fetchData} disabled={loading}>
        {loading ? "Fetching..." : "Fetch Configuration"}
      </button>
      {error && <div className="error">{error}</div>}
      {data && (
        <div className="data-display">
          <strong>Matrix:</strong>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
