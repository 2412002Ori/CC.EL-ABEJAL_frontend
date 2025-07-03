import React, { useEffect, useRef, useState } from 'react'
import { getStyle } from '@coreui/utils'
import { CChart } from '@coreui/react-chartjs'
import { CCard, CCardBody } from '@coreui/react'

export const MainChart_loc_mes = () => {
  const chartRef = useRef(null)
  const [monthlyData, setMonthlyData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const token = localStorage.getItem('token');
        const year = new Date().getFullYear();
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/stadistics/monthly?year=${year}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const result = await res.json();
        setMonthlyData(result.rows || [])
      } catch (e) {
        setMonthlyData([])
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    const handleColorSchemeChange = () => {
      const chartInstance = chartRef.current
      if (chartInstance) {
        const { options } = chartInstance
        if (options.scales?.x) {
          if (options.scales.x.grid) {
            options.scales.x.grid.color = getStyle('--cui-border-color-translucent')
          }
          if (options.scales.x.ticks) {
            options.scales.x.ticks.color = getStyle('--cui-body-color')
          }
        }
        if (options.scales?.y) {
          if (options.scales.y.grid) {
            options.scales.y.grid.color = getStyle('--cui-border-color-translucent')
          }
          if (options.scales.y.ticks) {
            options.scales.y.ticks.color = getStyle('--cui-body-color')
          }
        }
        chartInstance.update()
      }
    }
    document.documentElement.addEventListener('ColorSchemeChange', handleColorSchemeChange)
    return () => {
        document.documentElement.removeEventListener('ColorSchemeChange', handleColorSchemeChange)
    }
  }, [])

  const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
  const data = {
    labels: meses,
    datasets: [
      {
        label: 'Pagos de condominio',
        backgroundColor: 'rgba(54, 162, 235, 0.8)',
        borderColor: '#f87979',
        data: meses.map(mes => {
          const found = monthlyData.find(item => item.page_month === mes)
          return found ? Number(found._sum.amount) : 0
        })
      },
    ],
  }

  const options = {
    plugins: {
      legend: {
        labels: {
          color: getStyle('--cui-body-color'),
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: getStyle('--cui-border-color-translucent'),
        },
        ticks: {
          color: getStyle('--cui-body-color'),
        },
        type: 'category',
      },
      y: {
        grid: {
          color: getStyle('--cui-border-color-translucent'),
        },
        ticks: {
          color: getStyle('--cui-body-color'),
        },
        beginAtZero: true,
      },
    },
  }

  return (
    <CCard>
      <CCardBody>
        {loading ? 'Cargando...' : <CChart type="bar" data={data} options={options} ref={chartRef} />}
      </CCardBody>
    </CCard>
  )
}

export default MainChart_loc_mes