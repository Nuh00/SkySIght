export function parseSalaryInput(input: string): number {
  const cleanInput = input.replace(/[^0-9KkMm.]/g, '').toUpperCase();
  
  if (cleanInput.endsWith('K')) {
    return Math.round(parseFloat(cleanInput.slice(0, -1)) * 1000);
  } else if (cleanInput.endsWith('M')) {
    return Math.round(parseFloat(cleanInput.slice(0, -1)) * 1000000);
  } else {
    return Math.round(parseFloat(cleanInput));
  }
}