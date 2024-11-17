export function useVisitorId() {
  // Check if localStorage is available
  const isLocalStorageAvailable =
    typeof window !== "undefined" && window.localStorage;

  if (!isLocalStorageAvailable) {
    return crypto.randomUUID();
  }

  // First check if we already have a userId in localStorage
  const existingId = localStorage.getItem("pink-and-blue-visitor-id");
  if (existingId) {
    return existingId;
  }

  const id = crypto.randomUUID();
  localStorage.setItem("pink-and-blue-visitor-id", id);
  return id;
}
