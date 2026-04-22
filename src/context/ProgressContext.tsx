import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import {
    clearEvents,
    loadEvents,
    ProgressEvent,
    saveEvent,
    sendEventToServer,
} from "../services/progressEvents";
import { useAuth } from "./AuthContext";

type Difficulty = "Facile" | "Moyen" | "Difficile";

type ProgressState = {
  completedLessons: number[];
  quizCorrect: number;
  quizTotal: number;
  synced: boolean;
  offline: boolean;
};

type ProgressContextType = {
  progress: ProgressState;
  markLessonCompleted: (id: number) => void;
  recordEvent: (event: Omit<ProgressEvent, "id" | "synced">) => Promise<void>;
  syncProgress: () => Promise<void>;
  difficulty: Difficulty;
};

const ProgressContext = createContext<ProgressContextType | undefined>(
  undefined,
);

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error("useProgress must be used within ProgressProvider");
  }
  return context;
}

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState<ProgressState>({
    completedLessons: [1],
    quizCorrect: 0,
    quizTotal: 0,
    synced: true,
    offline: true,
  });

  const { user } = useAuth();

  const markLessonCompleted = (id: number) => {
    setProgress((prev) =>
      prev.completedLessons.includes(id)
        ? prev
        : {
            ...prev,
            completedLessons: [...prev.completedLessons, id],
            synced: false,
            offline: true,
          },
    );
  };

  const difficulty: Difficulty = useMemo(() => {
    const length = progress.completedLessons.length;
    if (length >= 4) return "Difficile";
    if (length >= 2) return "Moyen";
    return "Facile";
  }, [progress.completedLessons]);

  const recordEvent = async (event: Omit<ProgressEvent, "id" | "synced">) => {
    setProgress((prev) => ({ ...prev, synced: false, offline: true }));

    // Ajouter l'userId de l'utilisateur connecté
    const eventWithUser = {
      ...event,
      userId: user?.uid,
    };

    await saveEvent(eventWithUser);

    if (
      event.type === "lesson_completed" &&
      typeof event.lessonId === "number"
    ) {
      markLessonCompleted(event.lessonId);
    }

    if (event.type === "quiz_answer") {
      setProgress((prev) => ({
        ...prev,
        quizTotal: prev.quizTotal + 1,
        quizCorrect: prev.quizCorrect + (event.correct ? 1 : 0),
      }));
    }
  };

  const syncProgress = async () => {
    try {
      const queue = await loadEvents();
      for (const event of queue) {
        await sendEventToServer(event);
      }

      await clearEvents();
      setProgress((prev) => ({ ...prev, synced: true, offline: false }));
    } catch (error) {
      console.warn("Sync échoué", error);
      setProgress((prev) => ({ ...prev, synced: false, offline: true }));
    }
  };

  useEffect(() => {
    const initialize = async () => {
      const queue = await loadEvents();
      if (queue.length === 0) {
        setProgress((prev) => ({ ...prev, offline: true, synced: true }));
      } else {
        setProgress((prev) => ({ ...prev, offline: true, synced: false }));
      }
    };
    initialize();
  }, []);

  return (
    <ProgressContext.Provider
      value={{
        progress,
        markLessonCompleted,
        difficulty,
        recordEvent,
        syncProgress,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}
