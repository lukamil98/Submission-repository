import React from "react"

const Filter = ({ searchTerm, handleSearchChange }) => {
  return (
    <div>
      <label>
        Filter shown with:
        <input value={searchTerm} onChange={handleSearchChange} />
      </label>
    </div>
  )
}

export default Filter
