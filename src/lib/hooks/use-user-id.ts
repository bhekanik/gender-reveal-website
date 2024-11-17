export function useUserId() {
  // First check if we already have a userId in localStorage
  const existingId = localStorage.getItem("gender-reveal-user-id");
  if (existingId) {
    return existingId;
  }
  const id = crypto.randomUUID();
  localStorage.setItem("gender-reveal-user-id", id);
  return id;
}
