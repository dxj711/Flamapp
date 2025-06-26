import { create } from 'zustand';

type BookmarkStore = {
  bookmarks: number[];
  addBookmark: (id: number) => void;
  removeBookmark: (id: number) => void;
};

export const useBookmarks = create<BookmarkStore>((set) => ({
  bookmarks: [],
  addBookmark: (id) => set((state) => ({ bookmarks: [...state.bookmarks, id] })),
  removeBookmark: (id) => set((state) => ({ bookmarks: state.bookmarks.filter((b) => b !== id) })),
})); 