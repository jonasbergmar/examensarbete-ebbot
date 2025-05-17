"use client";
import React, { useState, useEffect } from "react";

interface Note {
  id: string;
  text: string;
  timestamp: string;
  colorChoice: string;
}

interface FormErrors {
  note?: string;
}

const PostItNote = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState("");
  const [colorChoice, setColorChoice] = useState("yellow");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!newNote.trim()) {
      newErrors.note = "Note cannot be empty";
    } else if (newNote.trim().length < 20) {
      newErrors.note = "Note must be at least 20 characters long";
    } else if (newNote.trim().length > 500) {
      newErrors.note = "Note cannot exceed 500 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }

    const note: Note = {
      id: Date.now().toString(),
      text: newNote.trim(),
      timestamp: new Date().toLocaleString(),
      colorChoice: colorChoice,
    };

    const updatedNotes = [note, ...notes];
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    setNewNote("");
    setIsSubmitting(false);
  };

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setNewNote(value);
    if (errors.note) {
      validateForm();
    }
  };

  const deleteNote = (id: string) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  return (
    <div className="min-h-screen p-4 md:p-8 bg-background flex items-center justify-center ">
      <div className="w-full max-w-md p-6 bg-card  shadow-md rounded-3xl">
        <h2 className="text-2xl font-bold mb-4">
          Leave a note if your missing something
        </h2>
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="mb-4">
            <label htmlFor="note" className="block mb-2">
              Note:
              <span className="text-sm text-gray-500 ml-1">
                ({newNote.length}/500 characters)
              </span>
            </label>
            <textarea
              id="note"
              className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.note ? "border-red-500" : ""
              }`}
              placeholder="Write your note here..."
              value={newNote}
              onChange={handleNoteChange}
              rows={4}
            />
            {errors.note && (
              <p className="text-red-500 text-sm mt-1">{errors.note}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="color" className="block mb-2">
              Color:
            </label>
            <select
              id="color"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={colorChoice}
              onChange={(e) => setColorChoice(e.target.value)}
            >
              <option value="yellow">Yellow</option>
              <option value="blue">Blue</option>
              <option value="green">Green</option>
              <option value="red">Red</option>
            </select>
          </div>
          <button
            type="submit"
            className={`w-full bg-primary text-black px-6 py-2 rounded-lg transition-all ${
              isSubmitting
                ? "opacity-50 cursor-not-allowed"
                : "hover:opacity-90"
            }`}
            disabled={isSubmitting || !newNote.trim()}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
        <div className="flex flex-wrap gap-2">
          {notes.map((note) => (
            <div
              key={note.id}
              className={`relative p-4 rounded-lg shadow-md ${
                note.colorChoice === "yellow"
                  ? "bg-yellow-300"
                  : note.colorChoice === "blue"
                    ? "bg-blue-300"
                    : note.colorChoice === "green"
                      ? "bg-green-300"
                      : "bg-red-300"
              }`}
            >
              <button
                onClick={() => deleteNote(note.id)}
                className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center rounded-full bg-black/10 hover:bg-black/20 transition-colors"
                aria-label="Delete note"
              >
                <span className="text-black/60">×</span>
              </button>
              <p className="mb-2 pr-6">{note.text}</p>
              <p className="text-sm text-gray-600">{note.timestamp}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostItNote;
