import React from "react";  
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
    Legend,
} from "recharts";

export default function BarChartCard({ title, data, dataKey = "value"}) {
    return (
        <div className="bg-white p-4 shadow rounded-2xl flex flex-col items-center w-full">
            <h2 className="text-gray-700 font-semibold mb-3">{title}</h2>
            <div className="w-full h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} margin={{top: 10, right: 30, left: 10, bottom: 60}}>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="name" angle={-20} textAnchor="end" interval={0} height={80}/>
                        <YAxis allowDecimals={false}/>
                        <Tooltip />
                        <Legend />
                        <Bar dataKey={dataKey} fill="#3b82f6" radius={[6, 6, 0, 0]}/>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}