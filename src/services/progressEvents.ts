import AsyncStorage from "@react-native-async-storage/async-storage";
import { syncProgressEvents } from "./api";

const STORAGE_KEY = "@eburni_progress_events";
let memoryEvents: ProgressEvent[] = [];
let asyncStorageAvailable = true;

export type ProgressEvent = {
  id: string;
  type: "lesson_view" | "quiz_answer" | "lesson_completed" | "game_session";
  userId?: string;
  lessonId?: number;
  questionId?: number;
  correct?: boolean;
  score?: number;
  durationMs?: number;
  difficulty?: "Facile" | "Moyen" | "Difficile";
  timestamp: number;
  synced: boolean;
};

async function readStorage(): Promise<ProgressEvent[]> {
  if (!asyncStorageAvailable) {
    return memoryEvents;
  }

  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as ProgressEvent[];
  } catch (error) {
    console.warn("Erreur lecture events local", error);
    asyncStorageAvailable = false;
    return memoryEvents;
  }
}

async function writeStorage(events: ProgressEvent[]) {
  memoryEvents = events;
  if (!asyncStorageAvailable) {
    return;
  }

  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  } catch (error) {
    console.warn("Erreur écriture events local", error);
    asyncStorageAvailable = false;
  }
}

export async function loadEvents(): Promise<ProgressEvent[]> {
  return await readStorage();
}

export async function saveEvent(event: Omit<ProgressEvent, "id" | "synced">) {
  const existing = await readStorage();
  const next: ProgressEvent = {
    ...event,
    id: `${event.type}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    synced: false,
  };
  const updated = [...existing, next];
  await writeStorage(updated);
  return next;
}

export async function clearEvents() {
  memoryEvents = [];
  await writeStorage([]);
}

export async function markEventSynced(id: string) {
  const existing = await readStorage();
  const updated = existing.map((evt) =>
    evt.id === id ? { ...evt, synced: true } : evt,
  );
  await writeStorage(updated);
}

export async function sendEventToServer(event: ProgressEvent) {
  const success = await syncProgressEvents([event]);
  if (!success) {
    console.warn("Échec envoi event au backend, conservation en local.");
  }
  return success;
}
