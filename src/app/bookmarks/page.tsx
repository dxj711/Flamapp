"use client";
import { useEffect, useState } from "react";
import Card from "../../components/Card";
import Button from "../../components/Button";
import StarRating from "../../components/StarRating";
import Badge from "../../components/Badge";
import Modal from "../../components/Modal";
import { useBookmarks } from "../../hooks/useBookmarks";
import { generateMockUsers } from "../../lib/mockData";
import type { User } from "../../lib/mockData";

export default function BookmarksPage() {
  const { bookmarks, removeBookmark } = useBookmarks();
  const [users, setUsers] = useState<User[]>([]);
  const [modal, setModal] = useState<{ type: string; user: User } | null>(null);

  useEffect(() => {
    setUsers(generateMockUsers(20));
  }, []);

  const bookmarkedUsers = users.filter((u) => bookmarks.includes(u.id));

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-2xl font-bold">Bookmarked Employees</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookmarkedUsers.map((user) => (
          <Card key={user.id}>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold text-lg">{user.name}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-300">{user.email}</div>
                </div>
                <Badge color="blue">{user.department}</Badge>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 dark:text-gray-300">Age: {user.age}</span>
                <StarRating rating={user.rating} />
              </div>
              <div className="flex gap-2 mt-2">
                <Button
                  variant="secondary"
                  aria-label={`Remove ${user.name} from bookmarks`}
                  onClick={() => removeBookmark(user.id)}
                >
                  Remove
                </Button>
                <Button
                  variant="primary"
                  aria-label={`Promote ${user.name}`}
                  onClick={() => setModal({ type: "promote", user })}
                >
                  Promote
                </Button>
                <Button
                  variant="secondary"
                  aria-label={`Assign ${user.name} to project`}
                  onClick={() => setModal({ type: "assign", user })}
                >
                  Assign to Project
                </Button>
              </div>
            </div>
          </Card>
        ))}
        {bookmarkedUsers.length === 0 && (
          <div className="col-span-full text-center text-gray-500 dark:text-gray-300">No bookmarked employees.</div>
        )}
      </div>
      <Modal open={!!modal} onClose={() => setModal(null)}>
        <div className="flex flex-col gap-4 items-center">
          {modal?.type === "promote" && (
            <>
              <h2 className="text-lg font-bold">Promote Employee</h2>
              <p>Promote <span className="font-semibold">{modal.user?.name}</span>?</p>
            </>
          )}
          {modal?.type === "assign" && (
            <>
              <h2 className="text-lg font-bold">Assign to Project</h2>
              <p>Assign <span className="font-semibold">{modal.user?.name}</span> to a project?</p>
            </>
          )}
          <div className="flex gap-2">
            <Button variant="primary" onClick={() => setModal(null)}>Confirm</Button>
            <Button variant="secondary" onClick={() => setModal(null)}>Cancel</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
} 