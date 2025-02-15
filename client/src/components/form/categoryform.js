import React, { useState } from "react";

export default function Categoryform({ value, setValue, handlesubmit }) {
  return (
    <div>
      <>
        <form onSubmit={handlesubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter new category"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </>
    </div>
  );
}
