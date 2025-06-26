import { useState } from 'react';

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

type Filter = {
  query: string;
  departments: string[];
  ratings: number[];
};

export function useSearch(users: User[]) {
  const [filter, setFilter] = useState<Filter>({ query: '', departments: [], ratings: [] });

  const filtered = users.filter((user) => {
    const matchesQuery =
      user.name.toLowerCase().includes(filter.query.toLowerCase()) ||
      user.email.toLowerCase().includes(filter.query.toLowerCase()) ||
      user.department.toLowerCase().includes(filter.query.toLowerCase());
    const matchesDept = filter.departments.length === 0 || filter.departments.includes(user.department);
    const matchesRating = filter.ratings.length === 0 || filter.ratings.includes(user.rating);
    return matchesQuery && matchesDept && matchesRating;
  });

  return { filter, setFilter, filtered };
} 