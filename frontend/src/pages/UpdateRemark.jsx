import { useState } from "react";
import { api } from "../services/api";

export default function UpdateRemark() {
  const [id, setId] = useState("");
  const [remark, setRemark] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const submit = async () => {
    if (!id.trim()) {
      setMessage("Please enter a configuration ID");
      return;
    }

    setLoading(true);
    setMessage("");
    try {
      await api.put(`/configurations/${id}`, { remark });
      setMessage("Remark updated successfully!");
      setRemark("");
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to update remark");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section">
      <h2>Update Remark</h2>
      <div className="input-group">
        <label htmlFor="update-id">Configuration ID:</label>
        <input
          id="update-id"
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="Enter configuration ID"
        />
      </div>
      <div className="input-group">
        <label htmlFor="remark">Remark:</label>
        <textarea
          id="remark"
          value={remark}
          onChange={(e) => setRemark(e.target.value)}
          placeholder="Enter remark"
        />
      </div>
      <button className="button" onClick={submit} disabled={loading}>
        {loading ? "Updating..." : "Update Remark"}
      </button>
      {message && (
        <div className={message.includes("success") ? "success" : "error"}>
          {message}
        </div>
      )}
    </div>
  );
}
