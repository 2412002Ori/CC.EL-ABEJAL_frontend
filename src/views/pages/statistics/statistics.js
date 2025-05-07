import React, { useState } from 'react';
import { CCard, CCardBody, CCardHeader, CTable, CTableHead, CTableBody, CButton } from '@coreui/react';
import CIcon from '@coreui/icons-react'; // Importar CIcon
import { cilDescription } from '@coreui/icons'; // Importar el ícono cilDescription

function Formato1() {
  const [year, setYear] = useState(2023);
  const [search, setSearch] = useState("");

  const meses = [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
  ];

  const data = [
  { local: "A-1", inquilino: "Juan Pérez", pagos: generatePagos() },
  { local: "A-2", inquilino: "María López", pagos: generatePagos() },
  { local: "A-3", inquilino: "Carlos García", pagos: generatePagos() },
  { local: "A-4", inquilino: "Ana Martínez", pagos: generatePagos() },
  { local: "A-5", inquilino: "Luis Fernández", pagos: generatePagos() },
  { local: "A-6", inquilino: "Sofía Rodríguez", pagos: generatePagos() },
  { local: "A-7", inquilino: "Miguel Torres", pagos: generatePagos() },
  { local: "A-8", inquilino: "Laura Gómez", pagos: generatePagos() },
  { local: "A-9", inquilino: "Jorge Ramírez", pagos: generatePagos() },
  { local: "A-10", inquilino: "Isabel Sánchez", pagos: generatePagos() },
];

function generatePagos() {
  const estados = ["Pagado", "No Pagado", ""];
  return meses.reduce((acc, mes) => {
    acc[mes] = estados[Math.floor(Math.random() * estados.length)];
    return acc;
  }, {});
}

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
    row.local.toLowerCase().includes(search.toLowerCase())
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
              <CIcon icon={cilDescription} size="xl" /> {/* Tamaño del ícono ajustado */}
              
            </CButton>

          </div>
        </CCardHeader>
        <CCardBody>
          {/* Tabla combinada */}
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
                  <th className="text-center" style={{ fontWeight: "bold", padding: "10px" }}>Nombre propietario</th>
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
                      {row.local}
                    </td>
                    <td className="text-center" style={{ fontSize: "14px" }}>
                      {row.inquilino}
                    </td>
                    {meses.map((mes, i) => (
                      <td key={i} className="text-center" style={{ fontSize: "14px" }}>
                        {row.pagos[mes] === "Pagado" && "✔"}
                        {row.pagos[mes] === "No Pagado" && "✘"}
                        {row.pagos[mes] === "" && ""}
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