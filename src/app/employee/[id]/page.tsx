"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Card from "../../../components/Card";
import Badge from "../../../components/Badge";
import StarRating from "../../../components/StarRating";
import Tabs from "../../../components/Tabs";
import Button from "../../../components/Button";
import { generateMockUsers } from "../../../lib/mockData";
import type { User } from "../../../lib/mockData";

export default function EmployeeDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Simulate fetching user by id
    const users = generateMockUsers(20);
    const found = users.find((u) => String(u.id) === String(params.id));
    if (found) {
      setUser(found);
      setError("");
    } else {
      setError("Employee not found.");
    }
    setLoading(false);
  }, [params.id]);

  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;
  if (!user) return null;

  const tabs = [
    {
      label: "Overview",
      content: (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <div className="font-bold text-xl mb-2">{user.name}</div>
              <div className="text-gray-500 dark:text-gray-300 mb-2">{user.email}</div>
              <Badge color="blue">{user.department}</Badge>
              <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">Age: {user.age}</div>
              <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">Phone: {user.phone}</div>
              <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">Address: {user.address}</div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <StarRating rating={user.rating} />
              <Badge color={user.rating >= 4 ? "green" : user.rating >= 2 ? "yellow" : "red"}>
                {user.rating} / 5
              </Badge>
            </div>
          </div>
          <div className="mt-4">
            <div className="font-semibold mb-1">Bio</div>
            <div className="text-gray-700 dark:text-gray-200">{user.bio}</div>
          </div>
        </div>
      ),
    },
    {
      label: "Projects",
      content: (
        <div>
          <div className="font-semibold mb-2">Projects</div>
          <ul className="list-disc pl-5 space-y-1">
            {[1,2,3].map((i) => (
              <li key={i}>Project {i} - {user.department} Team</li>
            ))}
          </ul>
        </div>
      ),
    },
    {
      label: "Feedback",
      content: (
        <div className="flex flex-col gap-4">
          <div>
            <div className="font-semibold mb-2">Past Feedback</div>
            <ul className="list-disc pl-5 space-y-1">
              {user.performanceHistory.map((r: number, i: number) => (
                <li key={i} className="flex items-center gap-2">
                  <StarRating rating={r} />
                  <span className="text-xs text-gray-500">Year {2024 - i}</span>
                </li>
              ))}
            </ul>
          </div>
          <form className="flex flex-col gap-2 mt-4">
            <label htmlFor="feedback" className="font-semibold">Add Feedback</label>
            <textarea id="feedback" className="rounded border border-gray-300 dark:bg-gray-800 dark:text-white p-2" rows={3} placeholder="Write feedback..." />
            <Button type="submit" variant="primary">Submit</Button>
          </form>
        </div>
      ),
    },
  ];

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <Button variant="secondary" onClick={() => router.back()}>&larr; Back</Button>
      <Card>
        <Tabs tabs={tabs} />
      </Card>
    </div>
  );
} 