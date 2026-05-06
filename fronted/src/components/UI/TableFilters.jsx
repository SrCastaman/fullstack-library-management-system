import React, { useState, useMemo} from "react";
import Table from "./Table";

export default function TableFilters({ columns, data, actions, filterConfig }){
    const [searchFilters, setSearchFilters] = useState({});
    const [sortConfig, setSortConfig] = useState({ key:null, direction: "asc"});
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;

    const handleFilterChange = (key, value) => {
        setSearchFilters(prev => ({ ...prev, [key]: value}));
    };


    const handleSort = (key) => {
        setSortConfig(prev => {
            if(prev.key !==key) return { key, direction: "asc"};
            if(prev.direction === "asc") return { key, direction: "desc"}
            return { key: null, direction: null};
        });
    };

    const filteredData = useMemo(() => {
        let filtered = [...data];
    

        for (const key in searchFilters) {
            const value = searchFilters[key];
            if (value) {
                filtered = filtered.filter(row => {
                    const cell = row[key];
                    console.log("Filtrando:", key, "valor de row:", row, "cell:", cell, "filtro:", value);

                    if(key === "estado") {
                        const now = new Date();
                        const fechaDevolucion = row.fechaDevolucion ? new Date(row.fechaDevolucion) : null;
                        const fechaLimite = row.fechaLimite ? new Date(row.fechaLimite) : null;

                        if(value === "devuelto") return fechaDevolucion != null;
                        if(value === "ocupado") return !fechaDevolucion && (!fechaLimite || now <= fechaLimite);
                        if(value === "atrasado") return !fechaDevolucion && fechaLimite && now > fechaLimite;

                        return true;
                    }

                    if(typeof cell === "string") {
                        return cell.toLowerCase().includes(value.toLowerCase());
                    }
                    if(typeof cell === "number") {
                        return cell.toString().includes(value);
                    }
                    
                    if(typeof cell === "boolean") {
                        return cell === (value === "true");
                    }

                    if(cell && cell.nombre) {
                        return cell.nombre.toLowerCase().includes(value.toLowerCase());
                    }
                    return false;
                });
            }
        }

        if (sortConfig.key) {
            filtered.sort((a,b) => {
                let valA = a[sortConfig.key];
                let valB = b[sortConfig.key];

                if( valA?.nombre) valA = valA.nombre;
                if(valB?.nombre) valB = valB.nombre;

                if (typeof valA === "string") valA = valA.toLowerCase();
                if (typeof valB === "string") valB = valB.toLowerCase();

                if(valA < valB) return sortConfig.direction === "asc" ? -1 : 1;
                if(valA > valB) return sortConfig.direction === "asc" ? 1: -1;
                return 0;
            });
        }

        return filtered;
    }, [data, searchFilters, sortConfig]);

    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const paginatedData = filteredData.slice(startIndex, startIndex + rowsPerPage);


    return (
        <div>
            <div className="mb-4 flex flex-wrap gap-4">
                {filterConfig.map(filter => (
                    <div key={filter.key} className="flex flex-col">
                        <label className="text-sm font-semibold">{filter.label}</label>
                        {filter.type === "text" && (
                            <input
                                type="text"
                                value={searchFilters[filter.key] || ""}
                                onChange={e => handleFilterChange(filter.key, e.target.value)}
                                className="border px-2 py-1 rounded"
                                placeholder={`Buscar ${filter.label}`}
                            />
                        )}

                        {filter.type === "select" && (
                            <select
                                value={searchFilters[filter.key] || ""}
                                onChange={e => handleFilterChange(filter.key, e.target.value)}
                                className="border px-2 py-1 rounded"
                            >
                                <option value="">Todas</option>
                                {filter.options.map((opt, i) => (
                                    <option key={i} value={opt.value}>{opt.label}</option>
                                ))}
                            </select>
                        )}
                        {filter.type === "boolean" && (
                            <select
                                value={searchFilters[filter.key] || ""}
                                onChange={e => handleFilterChange(filter.key, e.target.value)}
                                className="border px-2 py-1 rounded"
                            >
                                <option value="">Todos</option>
                                <option value="true">Sí</option>
                                <option value="false">No</option>
                            </select>
                        )}
                    </div>
                ))}
            </div>
            <Table
                columns={columns.map(col => ({
                    ...col,
                    renderHeader: col.label,
                }))}
                data={paginatedData}
                actions={actions}
                sortConfig={sortConfig}
                onSort={handleSort}
            />

            <div className="flex justify-between items-center mt-4">
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                    >
                    ←
                    </button>
                
                    <span>
                        Página {currentPage} de {totalPages || 1}
                    </span>

                    <button
                        onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                        }
                        disabled={currentPage >= totalPages}
                        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                    >
                        →
                    </button>
                </div>
            </div>
        </div>
    )

}