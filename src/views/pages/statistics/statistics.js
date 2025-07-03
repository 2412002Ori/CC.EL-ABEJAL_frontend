import React, { useState, useEffect } from 'react';
import { CCard, CCardBody, CCardHeader, CTable, CTableHead, CTableBody, CButton } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilDescription } from '@coreui/icons';

function Formato1() {
  const [year, setYear] = useState(2023);
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const meses = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

  // Fetch data from backend statistics endpoint
  useEffect(() => {
    console.log('AÑO ENVIADO AL BACKEND:', year);
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:3003/api/stadistics?year=${year}`);
        const result = await res.json();
        // El backend devuelve { rows: [...] }
        if (result && result.rows) {
          setData(result.rows);
        } else if (Array.isArray(result)) {
          setData(result); // fallback por si cambia la estructura
        } else {
          setData([]);
        }
      } catch (error) {
        console.error('Error fetching statistics:', error);
        setData([]);
      }
    };
    fetchData();
  }, [year]);

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleDownloadPDF = () => {
    alert("Descargar PDF no está implementado aún.");
  };

  const filteredData = data.filter((row) =>
    (row["N° Local"] || "").toString().toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="informe-mensual" style={{ padding: "20px" }}>
      <CCard
        className="m-1"
        style={{
          border: "1px solid #ddd",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <CCardHeader
          style={{
            backgroundColor: "#0aa3add5",
            borderBottom: "1px solid #ddd",
            padding: "20px",
            textAlign: "center",
          }}
        >
          <h3 style={{ margin: 0, fontWeight: "bold", color: "#333" }}>
            INFORME ANUAL ESTADÍSTICO
          </h3>
          <h5 style={{ margin: 0, fontWeight: "bold", color: "#333" }}>
            CONDOMINIO
          </h5>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "15px",
            }}
          >
            <select
              value={year}
              onChange={handleYearChange}
              style={{
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                fontSize: "14px",
                backgroundColor: "#fff",
                color: "#333",
              }}
            >
              <option value={2023}>2023</option>
              <option value={2022}>2022</option>
              <option value={2021}>2021</option>
              <option value={2020}>2020</option>
            </select>
            <input
              type="text"
              placeholder="Buscar por N° Local"
              value={search}
              onChange={handleSearchChange}
              style={{
                width: "20%",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                fontSize: "14px",
              }}
            />

            <CButton
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                padding: "10px 15px",
                fontSize: "14px",
                borderRadius: "5px",
              }}
              onClick={handleDownloadPDF}
            >
              <CIcon icon={cilDescription} size="xl" />
            </CButton>
          </div>
        </CCardHeader>
        <CCardBody>
          <div
            style={{
              border: "2px  #ddd",
              borderRadius: "10px",
            }}
          >
            <CTable responsive>
              <CTableHead>
                <tr>
                  <th className="text-center" style={{ fontWeight: "bold", padding: "10px" }}>N° Local</th>
                  <th className="text-center" style={{ fontWeight: "bold", padding: "10px" }}>Nombre del local</th>
                  {meses.map((mes, index) => (
                    <th key={index} className="text-center" style={{ fontWeight: "bold", padding: "10px" }}>
                      {mes}
                    </th>
                  ))}
                </tr>
              </CTableHead>
              <CTableBody>
                {filteredData.map((row, index) => (
                  <tr
                    key={index}
                    style={{
                      backgroundColor: index % 2 === 0 ? "#ffffff" : "#f8f9fa",
                    }}
                  >
                    <td className="text-center" style={{ fontSize: "14px" }}>
                      {row["N° Local"]}
                    </td>
                    <td className="text-center" style={{ fontSize: "14px" }}>
                      {row["Nombre del local"]}
                    </td>
                    {meses.map((mes, i) => (
                      <td key={i} className="text-center" style={{ fontSize: "14px" }}>
                        {row[mes]}
                      </td>
                    ))}
                  </tr>
                ))}
              </CTableBody>
            </CTable>
          </div>
        </CCardBody>
      </CCard>
    </div>
  );
}

export default Formato1;