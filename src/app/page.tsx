"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Card from "../components/Card";
import Button from "../components/Button";
import StarRating from "../components/StarRating";
import Badge from "../components/Badge";
import Modal from "../components/Modal";
import { useSearch } from "../hooks/useSearch";
import { useBookmarks } from "../hooks/useBookmarks";
import { generateMockUsers, departments } from "../lib/mockData";
import type { User } from "../lib/mockData";

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [promoteUser, setPromoteUser] = useState<User | null>(null);
  const router = useRouter();
  const { bookmarks, addBookmark, removeBookmark } = useBookmarks();

  useEffect(() => {
    setUsers(generateMockUsers(20));
  }, []);

  const { filter, setFilter, filtered } = useSearch(users);

  const isBookmarked = (id: number) => bookmarks.includes(id);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col md:flex-row md:items-end gap-6 justify-between">
        <div className="flex flex-col gap-3 w-full md:w-1/2">
          <label htmlFor="search" className="font-semibold">Search</label>
          <input
            id="search"
            type="text"
            placeholder="Search by name, email, or department..."
            className="px-4 py-2 rounded border border-gray-300 dark:bg-gray-800 dark:text-white"
            value={filter.query}
            onChange={e => setFilter(f => ({ ...f, query: e.target.value }))}
          />
        </div>
        <div className="flex gap-3 flex-wrap">
          <select
            className="px-3 py-2 rounded border border-gray-300 dark:bg-gray-800 dark:text-white"
            value={filter.departments[0] || ''}
            onChange={e => setFilter(f => ({ ...f, departments: e.target.value ? [e.target.value] : [] }))}
          >
            <option value="">All Departments</option>
            {departments.map(dep => (
              <option key={dep} value={dep}>{dep}</option>
            ))}
          </select>
          <select
            className="px-3 py-2 rounded border border-gray-300 dark:bg-gray-800 dark:text-white"
            value={filter.ratings[0] || ''}
            onChange={e => setFilter(f => ({ ...f, ratings: e.target.value ? [Number(e.target.value)] : [] }))}
          >
            <option value="">All Ratings</option>
            {[1,2,3,4,5].map(r => (
              <option key={r} value={r}>{r} Stars</option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-4">
        {filtered.map(user => (
          <Card key={user.id}>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold text-lg">{user.name}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-300">{user.email}</div>
                </div>
                <Badge color="blue">{user.department}</Badge>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600 dark:text-gray-300">Age: {user.age}</span>
                <StarRating rating={user.rating} />
              </div>
              <div className="flex gap-3 mt-2">
                <Button
                  variant="primary"
                  aria-label={`View details for ${user.name}`}
                  onClick={() => router.push(`/employee/${user.id}`)}
                >
                  View
                </Button>
                <Button
                  variant={isBookmarked(user.id) ? "primary" : "secondary"}
                  aria-label={isBookmarked(user.id) ? `Remove ${user.name} from bookmarks` : `Bookmark ${user.name}`}
                  onClick={() =>
                    isBookmarked(user.id)
                      ? removeBookmark(user.id)
                      : addBookmark(user.id)
                  }
                >
                  {isBookmarked(user.id) ? "Bookmarked" : "Bookmark"}
                </Button>
                <Button
                  variant="secondary"
                  aria-label={`Promote ${user.name}`}
                  onClick={() => setPromoteUser(user)}
                >
                  Promote
                </Button>
              </div>
            </div>
          </Card>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full text-center text-gray-500 dark:text-gray-300">No users found.</div>
        )}
      </div>
      <Modal open={!!promoteUser} onClose={() => setPromoteUser(null)}>
        <div className="flex flex-col gap-5 items-center">
          <h2 className="text-lg font-bold">Promote Employee</h2>
          <p>Promote <span className="font-semibold">{promoteUser?.name}</span>?</p>
          <div className="flex gap-3">
            <Button variant="primary" onClick={() => setPromoteUser(null)}>Confirm</Button>
            <Button variant="secondary" onClick={() => setPromoteUser(null)}>Cancel</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
