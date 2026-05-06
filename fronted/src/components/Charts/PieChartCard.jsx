import {
    PieChart,
    Pie, 
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";


export default function PieChartCard({ title, data }) {
    const COLORS = ["#22c55e", "#facc15", "#ef4444", "#3b82f6", "#a855f7"];

    return (
        <div className="bg-white p-4 shadow rounded flex flex-col items-center">
            <h2 className="text-gray-700 font-semibold mb-3">{title}</h2>
            <div className="w-full h-64">
                <ResponsiveContainer>
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="name"
                            outerRadius={80}
                            label={({ name, percent }) => 
                                `${name} ${(percent * 100).toFixed(0)}%`
                            }
                        >
                            {data.map((_, index) => (
                                <Cell key={index} fill={COLORS[index % COLORS.length]}/>
                            ))}
                        </Pie>
                        <Tooltip/>
                        <Legend/>
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}