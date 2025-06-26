"use client";
import { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";
import { generateMockUsers, departments } from "../../lib/mockData";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

export default function AnalyticsPage() {
    type User = {
    id: number;
    name: string;
    email: string;
    age: number;
    department: string;
    rating: number;
    address: string;
    phone: string;
    bio: string;
    performanceHistory: number[];
  };
  
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [bookmarkTrends, setBookmarkTrends] = useState<{month: string, count: number}[]>([]);

  useEffect(() => {
    setUsers(generateMockUsers(20));
    setLoading(false);
    setBookmarkTrends(
      Array.from({ length: 6 }, (_, i) => ({
        month: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"][i],
        count: Math.floor(Math.random() * 10) + 5,
      }))
    );
  }, []);

  // Department-wise average ratings
  const deptAverages = departments.map((dept) => {
    const deptUsers = users.filter((u) => u.department === dept);
    const avg =
      deptUsers.length > 0
        ? deptUsers.reduce((sum, u) => sum + u.rating, 0) / deptUsers.length
        : 0;
    return { dept, avg: Number(avg.toFixed(2)) };
  });

  return (
    <div className="flex flex-col gap-10">
      <h1 className="text-2xl font-bold">Analytics</h1>
      {loading ? (
        <div>Loading charts...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Department-wise Average Ratings</h2>
            <Bar
              data={{
                labels: deptAverages.map((d) => d.dept),
                datasets: [
                  {
                    label: "Avg Rating",
                    data: deptAverages.map((d) => d.avg),
                    backgroundColor: [
                      "#2563eb",
                      "#059669",
                      "#f59e42",
                      "#e11d48",
                      "#6366f1",
                      "#fbbf24",
                    ],
                  },
                ],
              }}
              options={{
                responsive: true,
                plugins: {
                  legend: { display: false },
                  title: { display: false },
                },
                scales: {
                  y: { min: 0, max: 5, ticks: { stepSize: 1 } },
                },
              }}
            />
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Bookmark Trends (Mocked)</h2>
            <Line
              data={{
                labels: bookmarkTrends.map((b) => b.month),
                datasets: [
                  {
                    label: "Bookmarked Employees",
                    data: bookmarkTrends.map((b) => b.count),
                    borderColor: "#2563eb",
                    backgroundColor: "rgba(37,99,235,0.2)",
                    tension: 0.4,
                  },
                ],
              }}
              options={{
                responsive: true,
                plugins: {
                  legend: { display: false },
                  title: { display: false },
                },
                scales: {
                  y: { min: 0 },
                },
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
} 
