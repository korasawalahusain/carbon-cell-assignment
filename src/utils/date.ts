export function createDate(date?: string | number | Date) {
  return new Date(date ?? Date.now()).toISOString();
}

export function formatDate(date?: string | number | Date): string {
  const currentDate = new Date(date ?? Date.now());
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-based
  const day = currentDate.getDate().toString().padStart(2, '0');

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}
