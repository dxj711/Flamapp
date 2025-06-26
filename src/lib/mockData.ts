import { faker } from '@faker-js/faker';

export type User = {
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

export const departments = [
  'Engineering',
  'Marketing',
  'Sales',
  'HR',
  'Finance',
  'Support',
];

export function generateMockUsers(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: faker.person.fullName(),
    email: faker.internet.email(),
    age: faker.number.int({ min: 22, max: 60 }),
    department: faker.helpers.arrayElement(departments),
    rating: faker.number.int({ min: 1, max: 5 }),
    address: faker.location.streetAddress(),
    phone: faker.phone.number(),
    bio: faker.lorem.sentence(),
    performanceHistory: Array.from({ length: 5 }, () => faker.number.int({ min: 1, max: 5 })),
  }));
} 