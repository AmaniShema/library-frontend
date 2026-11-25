import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LibraryButton from './LibraryButton';

function Office() {
  const [officeName, setOfficeName] = useState("");
  const [officeNumber, setOfficeNumber] = useState("");
  const [offices, setOffices] = useState([]);
  const [search, setSearch] = useState("");

  async function fetchOffices() {
    const response = await axios.get("http://localhost:8080/api/offices");
    setOffices(response.data);
  }

  useEffect(() => {
    fetchOffices();
  }, []);

  async function saveOffice() {
    await axios.post("http://localhost:8080/api/offices/save", {
      buildingName: officeName,
      roomNumber: officeNumber
    });
    alert("The office is saved successfully");
    setOfficeName("");
    setOfficeNumber("");
    fetchOffices();
  }

  async function deleteOffice(id) {
    await axios.delete(`http://localhost:8080/api/offices/${id}`);
    alert("The office is deleted successfully");
    fetchOffices();
  }

  const filteredOffices = offices.filter((office) =>
    String(office.buildingName || "").toLowerCase().includes(search.toLowerCase()) ||
    String(office.roomNumber || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1>SAVE OFFICE</h1>
      <label>Office Name: </label>
      <input
        type="text"
        value={officeName}
        onChange={e => setOfficeName(e.target.value)}
      />
      <br />

      <label>Office Number: </label>
      <input
        type="text"
        value={officeNumber}
        onChange={e => setOfficeNumber(e.target.value)}
      />
      <br />

      <LibraryButton buttonLabel="SAVE" onClickButton={saveOffice} />

      <h2>OFFICES</h2>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Office Number</th>
            <th>Office Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredOffices.map((office) => (
            <tr key={office.id}>
              <td>{office.id}</td>
              <td>{office.roomNumber}</td>
              <td>{office.buildingName}</td>
              <td>
                <button onClick={() => deleteOffice(office.id)}>
                  DELETE
                </button>
                {" "}
                <button disabled>UPDATE</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <br />
      <label>Search: </label>
      <input
        type="text"
        placeholder="Search by office name or number"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
    </div>
  );
}

export default Office;