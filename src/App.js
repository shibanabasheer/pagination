import React, { useState, useEffect } from 'react';
import './App.css'

function Pagination() {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');
      const data = await response.json();
      setEmployees(data);
      setTotalPages(Math.ceil(data.length / 10));
    } catch (error) {
      console.error('Failed to fetch data:', error);
      alert('Failed to fetch data');
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const startIndex = (currentPage - 1) * 10;
  const endIndex = startIndex + 10;
  const currentEmployees = employees.slice(startIndex, endIndex);

  return (
    <div className="container">
      <h2 className="center main-heading">Employee Data Table</h2>
      <div className="table-container">
        <table className="center">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {currentEmployees.map((employee, index) => (
              <tr key={employee.id}>
                <td>{startIndex + index + 1}</td>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="footer center">
        <button onClick={prevPage} disabled={currentPage === 1} className="button">Previous</button>
        <div className="page-number-box">{currentPage}</div>
        <button onClick={nextPage} disabled={currentPage === totalPages} className="button">Next</button>
      </div>
    </div>
  );
}

export default Pagination;