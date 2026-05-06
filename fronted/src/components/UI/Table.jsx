import { ChevronsUpDown, ChevronUp, ChevronDown } from "lucide-react";


export default function Table({ columns, data, actions, sortConfig, onSort }){
    return(
        <table className="min-w-full border border-gray-300">
            <thead>
                <tr className="bg-gray-100">
                    {columns.map((col) => (
                        <th key={col.key} 
                            className="border px-4 py-2 text-left cursor-pointer select-none"
                            onClick={() => col.sortable !== false && onSort(col.key)}
                            >
                            {col.label}
                            {col.sortable !== false && (
                                <span className="ml-1">
                                    {sortConfig.key === col.key ? (
                                        sortConfig.direction === "asc" ? (
                                            <ChevronUp className="w-4 h-4 inline"/>
                                        ) : (
                                            <ChevronDown className="w-4 h-4 inline"/>
                                        )
                                    ) : (
                                        <ChevronsUpDown className="w-4 h-4 inline text-gray-400"/>
                                    )}
                                </span>
                            )}
                            
                        </th>
                    ))}
                    {actions && <th className="border px-4 py-2 text-left">Acciones</th>}
                </tr>
            </thead>
            <tbody>
                {data.map((row) => (
                    <tr className="hover:bg-gray-50" key={row.id}>
                        {columns.map((col) => (
                            <td key={col.key} className="border px-4 py-2">
                                {col.render ? col.render(row[col.key], row) : row[col.key]}
                            </td>
                        ))}
                        {actions && (
                            <td className="border border-gray-300 px-4 py-2">
                                {actions
                                    .filter((action) => !action.show || action.show(row))
                                    .map((action, i) => (
                                    
                                        <button
                                            key={i}
                                            onClick={() => action.onClick(row)}
                                            className={`${action.className} px-2 py-1 rounded mr-5`}
                                        >
                                            {action.label}
                                        </button>
                                    
                                ))}
                            </td>
                        )}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}