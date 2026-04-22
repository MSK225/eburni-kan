import type { ProgressEvent } from "./progressEvents";

// Backend placeholder URL. Modifiez cette URL quand l'API backend est disponible.
const BACKEND_BASE_URL = "https://example.com/api";

export async function sendProgressEvent(event: ProgressEvent) {
  try {
    const response = await fetch(`${BACKEND_BASE_URL}/progress-events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    });

    if (!response.ok) {
      console.warn("Backend returned non-ok status", response.status);
      return false;
    }

    return true;
  } catch (error) {
    console.warn("Impossible de contacter le backend", error);
    return false;
  }
}

export async function syncProgressEvents(events: ProgressEvent[]) {
  const results = [] as boolean[];

  for (const event of events) {
    const ok = await sendProgressEvent(event);
    results.push(ok);
  }

  return results.every(Boolean);
}
