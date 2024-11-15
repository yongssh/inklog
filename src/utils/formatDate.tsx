// src/utils/formatDate.ts
export const formatDate = (date: Date | string): string => {
    if (typeof date === 'string') {
      date = new Date(date);
    }
    return date.toLocaleDateString(); // Adjust format as needed
  };
  