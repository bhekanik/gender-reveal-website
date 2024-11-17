export function useUserId() {
  // Check if localStorage is available
  const isLocalStorageAvailable =
    typeof window !== "undefined" && window.localStorage;

  if (!isLocalStorageAvailable) {
    return crypto.randomUUID();
  }

  // First check if we already have a userId in localStorage
  const existingId = localStorage.getItem("gender-reveal-user-id");
  if (existingId) {
    return existingId;
  }

  const id = crypto.randomUUID();
  localStorage.setItem("gender-reveal-user-id", id);
  return id;
}
