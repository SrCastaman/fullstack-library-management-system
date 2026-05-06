// src/pages/Dashboard.jsx
import React from "react";
import { useMemo } from "react";
import DashboardCard from "../components/DashboardCard";
import { useAxios } from "../hooks/useAxios";
import TableFilters from "../components/UI/TableFilters";
import PieChartCard from "../components/Charts/PieChartCard";
import BarChartCard from "../components/Charts/BarChartCard";

export default function Dashboard() {
  const { data: usuarios } = useAxios("/usuarios");
  const { data: libros } = useAxios("/libros");
  const { data: reservas } = useAxios("/reservas"); 

  const { activas, devueltas, atrasadas, ultimas } = useMemo(() => {
    if(!reservas) return { activas: 0, atrasadas: 0, ultimas: []};

    const now = new Date();
    const devueltas = reservas.filter(r => r.fechaDevolucion).length;
    const activas = reservas.filter((r) => !r.fechaDevolucion && new Date(r.fechaLimite) >= now).length;
    const atrasadas = reservas.filter((r) => !r.fechaDevolucion && new Date(r.fechaLimite) < now).length;

    const ultimas = [...reservas]
      .sort((a,b) => new Date(b.fechaReserva) - new Date(a.fechaReserva))
      .slice(0,5);
      
    return { activas, devueltas, atrasadas, ultimas};

  }, [reservas]);

  const chartData = [
    { name: "Devueltas", value: devueltas },
    { name: "Ocupadas", value: activas },
    { name: "Atrasadas", value: atrasadas},
  ];

  const topLibrosData = useMemo(() => {
    if(!Array.isArray(reservas) || reservas.length === 0) return [];

    const contador = {};
    reservas.forEach(r => {
      if (r.libro?.nombre) {
        contador[r.libro.nombre] = (contador[r.libro.nombre] || 0) + 1;
      }
    });

    const arr = Object.entries(contador).map(([name, value]) => ({ name, value}));
    arr.sort((a,b) => b.value - a.value);
    return arr.slice(0,5);
  }, [reservas]);


  return (
    <div>
      <div className="p-6 space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-600 mb-3">Resumen General</h3>
          <div className="grid grid-cols-1 sm:grid-cols2 lg:grid-cols-3 gap-6">
            <DashboardCard title="Usuarios" count={usuarios ? usuarios.length : 0} />
            <DashboardCard title="Libros" count={libros ? libros.length : 0} />
            <DashboardCard title="Reservas totales" count={reservas ? reservas.length : 0} />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-600 mb-3">Estado de Reservas</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <DashboardCard title="Reservas activas" count={activas} color="blue" />
            <DashboardCard title="Atrasos" count={atrasadas} color="red" />
          </div>
        </div>
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
        <PieChartCard title="Estado de Reservas" data={chartData} className="h-[400px]"/>
        <BarChartCard title="Top Libros Más Reservados" data={topLibrosData} className="h-[400px]"/>
      </div>


      <div className="bg-white p-4 shadow rouneded">
        <h2 className="text-xl font-semibold mb-4">Últimas reservas</h2>
        <TableFilters
          columns={[
            { key: "usuario", label: "Usuario", render: (usuario) => usuario?.nombre},
            { key: "libro", label: "Libro", render: (libro) => libro?.nombre},
            { key: "fechaReserva", label: "Fecha Reserva"},
            { key: "fechaDevolucion", label: "Estado", 
              render: (_, row) => {
                if (row.fechaDevolucion) {
                  return(
                    <span className="text-green-600 font-semibold">Devuelto</span>
                  );
                }

                const now = new Date();
                const limite = row.fechaLimite ? new Date(row.fechaLimite) : null;

                if ( limite && now > limite) {
                  return(
                    <span className="text-red-600 font-semibold">Atrasado</span>
                  );
                }

                return (
                  <span className="text-yellow-600 font-semibold">Ocupado</span>
                );
              },
            },
          ]}
          data={ultimas}
          filterConfig={[]}
        />
      </div>
    </div>
  );
}
