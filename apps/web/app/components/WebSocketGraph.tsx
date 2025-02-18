"use client";
import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

interface DataPoint {
    number: number;
    timeStamp: string;
}

export default function WebSocketGraph() {
    const [data, setData] = useState<DataPoint[]>([]);
    const svgRef = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
        const ws = new WebSocket("ws://localhost:8080");

        ws.onopen = () => console.log("✅ Connected to WebSocket server");
        ws.onmessage = (event) => {
            const newData: DataPoint = JSON.parse(event.data);

            if (!newData.number) return;

            setData((prev) => [...prev.slice(-19), newData]); // Keep last 20 points
        };
        ws.onclose = () => console.log("❌ Disconnected from WebSocket server");

        return () => ws.close();
    }, []);

    useEffect(() => {
        if (!svgRef.current || data.length === 0) return;

        const svg = d3.select(svgRef.current);
        const width = 600;
        const height = 300;
        const margin = { top: 20, right: 30, bottom: 30, left: 40 };

        svg.selectAll("*").remove(); // Clear SVG before redrawing

        const xScale = d3
            .scaleTime()
            .domain(d3.extent(data, (d) => new Date(d.timeStamp)) as [Date, Date])
            .range([margin.left, width - margin.right]);

        const yScale = d3
            .scaleLinear()// Cleanup on unmount
            .domain([0, 100]) // Assuming numbers range from 0-100
            .range([height - margin.bottom, margin.top]);

        const line = d3
            .line<DataPoint>()
            .x((d) => xScale(new Date(d.timeStamp)))
            .y((d) => yScale(d.number))
            .curve(d3.curveMonotoneX);

        svg.append("g")
            .attr("transform", `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(xScale).tickFormat(d3.timeFormat("%H:%M:%S") as any));

        svg.append("g")
            .attr("transform", `translate(${margin.left},0)`)
            .call(d3.axisLeft(yScale));

        svg.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "blue")
            .attr("stroke-width", 2)
            .attr("d", line);
    }, [data]);

    return (
        <div className="p-4 border rounded-lg shadow-md bg-white">
            <h2 className="text-lg font-bold mb-2">📊 Real-Time Graph</h2>
            <svg ref={svgRef} width={600} height={300}></svg>
        </div>
    );
}
