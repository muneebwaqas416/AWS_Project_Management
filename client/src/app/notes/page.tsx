"use client";

import React, { useState } from "react";
import { useGetNotesQuery, useAddNoteMutation, useDeleteNoteMutation, useUpdateNoteMutation } from "../state/api";
import Header from "../(components)/Header";
import { useAppSelector } from "../redux";
import { Note } from "@/lib/supabaseClient";
import toast, { Toaster } from 'react-hot-toast';

const NotesPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { data: notes, isLoading, isError } = useGetNotesQuery();
  const [addNote, { isLoading: isAdding }] = useAddNoteMutation();
  const [deleteNote, { isLoading: isDeleting }] = useDeleteNoteMutation();
  const [updateNote, { isLoading: isUpdating }] = useUpdateNoteMutation();

  const isDarkMode = useAppSelector((state) => state.global.isDarkModeOn);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const toastId = toast.loading(editingNote ? 'Updating note...' : 'Adding note...');
    
    try {
      if (editingNote) {
        await updateNote({ id: editingNote.id, title, description }).unwrap();
        toast.success('Note updated successfully!', { id: toastId });
        setEditingNote(null);
      } else {
        await addNote({ title, description }).unwrap();
        toast.success('Note added successfully!', { id: toastId });
      }
      setTitle("");
      setDescription("");
    } catch (err: any) {
      const errorMessage = err.message || "Failed to save note";
      setError(errorMessage);
      toast.error(errorMessage, { id: toastId });
    }
  };

  const handleEdit = (note: Note) => {
    setEditingNote(note);
    setTitle(note.title);
    setDescription(note.description);
    setError(null);
    toast.success('Note loaded for editing');
  };

  const handleDelete = async (id: number) => {
    setError(null);
    const toastId = toast.loading('Deleting note...');
    
    try {
      await deleteNote(id).unwrap();
      toast.success('Note deleted successfully!', { id: toastId });
    } catch (err: any) {
      const errorMessage = err.message || "Failed to delete note";
      setError(errorMessage);
      toast.error(errorMessage, { id: toastId });
    }
  };

  return (
    <div className="h-full w-full bg-gray-100 p-8 dark:bg-dark-primary">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: isDarkMode ? '#1F2937' : '#fff',
            color: isDarkMode ? '#fff' : '#000',
            border: isDarkMode ? '1px solid #374151' : '1px solid #E5E7EB',
          },
          success: {
            iconTheme: {
              primary: '#10B981',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#EF4444',
              secondary: '#fff',
            },
          },
          loading: {
            iconTheme: {
              primary: '#3B82F6',
              secondary: '#fff',
            },
          },
        }}
      />
      
      <Header name="Notes" />
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <p className="text-gray-600 dark:text-gray-400">
            Add, edit, and delete your notes here.
          </p>
        </div>
      </div>

      {error && (
        <div className="mt-4 rounded-md bg-red-50 p-4 dark:bg-red-900/50">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                Error
              </h3>
              <div className="mt-2 text-sm text-red-700 dark:text-red-300">
                {error}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {/* Add/Edit Note Form */}
        <div className="rounded-lg bg-white p-6 shadow dark:bg-dark-secondary">
          <h2 className="mb-4 text-xl font-semibold dark:text-white">
            {editingNote ? "Edit Note" : "Add New Note"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-dark-primary dark:text-white"
                required
                disabled={isAdding || isUpdating}
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-dark-primary dark:text-white"
                required
                disabled={isAdding || isUpdating}
              />
            </div>
            <div className="flex justify-end space-x-3">
              {editingNote && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingNote(null);
                    setTitle("");
                    setDescription("");
                    setError(null);
                    toast.success('Edit cancelled');
                  }}
                  className="rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                  disabled={isAdding || isUpdating}
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 disabled:opacity-50"
                disabled={isAdding || isUpdating}
              >
                {isAdding || isUpdating ? (
                  <span className="flex items-center">
                    <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    {editingNote ? "Updating..." : "Adding..."}
                  </span>
                ) : (
                  editingNote ? "Update Note" : "Add Note"
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Notes List */}
        <div className="rounded-lg bg-white p-6 shadow dark:bg-dark-secondary">
          <h2 className="mb-4 text-xl font-semibold dark:text-white">Your Notes</h2>
          {isLoading && (
            <div className="flex items-center justify-center py-8">
              <svg className="h-8 w-8 animate-spin text-blue-500" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            </div>
          )}
          {isError && (
            <div className="text-center text-red-500">Error loading notes</div>
          )}
          {notes && notes.length === 0 && (
            <div className="text-center text-gray-600 dark:text-gray-400">No notes yet</div>
          )}
          <div className="space-y-4">
            {notes?.map((note) => (
              <div
                key={note.id}
                className="rounded-lg border border-gray-200 p-4 dark:border-gray-700"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      {note.title}
                    </h3>
                    <p className="mt-1 text-gray-600 dark:text-gray-400">
                      {note.description}
                    </p>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-500">
                      {new Date(note.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(note)}
                      className="rounded-md bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-800 disabled:opacity-50"
                      disabled={isDeleting || isUpdating}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(note.id)}
                      className="rounded-md bg-red-100 px-3 py-1 text-sm font-medium text-red-700 hover:bg-red-200 dark:bg-red-900 dark:text-red-300 dark:hover:bg-red-800 disabled:opacity-50"
                      disabled={isDeleting || isUpdating}
                    >
                      {isDeleting ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotesPage; 