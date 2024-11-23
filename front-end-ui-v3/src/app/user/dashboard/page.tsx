"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const colorMap = {
  Critical: "bg-purple-600 dark:bg-purple-800",
  High: "bg-red-500 dark:bg-red-700",
  Mid: "bg-orange-400 dark:bg-orange-600",
  Low: "bg-yellow-400 dark:bg-yellow-600",
  Accepted: "bg-green-400 dark:bg-green-600",
  Closed: "bg-gray-400 dark:bg-gray-600",
};

function RiskCard({ title, content, color }) {
  return (
    <Card className={`${color} text-white`}>
      <CardHeader>
        <CardTitle className="text-center">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold text-center">{content}</p>
      </CardContent>
    </Card>
  );
}

function LogsTable({ logs }) {
  return (
    <Card>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sl No</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Level</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Event ID</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.map((log, index) => {
              const logObj = JSON.parse(log.log.replace(/'/g, '"'));
              return (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{log.timestamp}</TableCell>
                  <TableCell>{logObj.level}</TableCell>
                  <TableCell>{log.message}</TableCell>
                  <TableCell>{log.event_id}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function RiskChart({ data }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Risk Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={{}} className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="value" fill="var(--bar-color)" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

function useDataFetching() {
  const [riskCounts, setRiskCounts] = React.useState({
    Critical: 0,
    High: 0,
    Mid: 0,
    Low: 0,
    Accepted: 0,
    Closed: 0,
  });
  const [logs, setLogs] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const prevDataRef = React.useRef({ riskCounts: null, logs: null });

  const fetchData = React.useCallback(async () => {
    try {
      setError(null);

      const [jobDetails, bruteForceLogs] = await Promise.all([
        fetch("http://127.0.0.1:223/Job_details").then((res) => res.json()),
        fetch("http://127.0.0.1:223/brute_force").then((res) => res.json()),
      ]);

      const newCounts = countValuesInArray(jobDetails);
      const newLogs = bruteForceLogs;

      if (
        JSON.stringify(newCounts) !==
        JSON.stringify(prevDataRef.current.riskCounts)
      ) {
        setRiskCounts(newCounts);
        prevDataRef.current.riskCounts = newCounts;
      }

      if (
        JSON.stringify(newLogs) !== JSON.stringify(prevDataRef.current.logs)
      ) {
        setLogs(newLogs);
        prevDataRef.current.logs = newLogs;
      }
    } catch (err) {
      setError("Failed to fetch data. Please try again later.");
      console.error("Error fetching data:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 5000);
    return () => clearInterval(intervalId);
  }, [fetchData]);

  return { riskCounts, logs, isLoading, error };
}

export default function Dashboard() {
  const { riskCounts, logs, isLoading, error } = useDataFetching();

  const chartData = React.useMemo(() => {
    return Object.entries(riskCounts).map(([name, value]) => ({ name, value }));
  }, [riskCounts]);

  if (isLoading) {
    return (
      <>
      <div className="flex items-center justify-center h-full">Loading...</div>
      </>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="flex bg-background text-foreground ">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold">Dashboard</h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
          {Object.entries(riskCounts).map(([level, count]) => (
            <RiskCard
              key={level}
              title={level}
              content={count}
              color={colorMap[level]}
            />
          ))}
        </div>
        <div className="shadow ">
          <RiskChart data={chartData} />
        </div>
      </div>
    </div>
  );
}

function countValuesInArray(rows) {
  return rows.reduce((acc, row) => {
    acc[row.level] = (acc[row.level] || 0) + 1;
    return acc;
  }, {});
}
