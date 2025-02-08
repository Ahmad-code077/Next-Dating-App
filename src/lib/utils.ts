export function calculateYear(year: Date) {
  const birthDate = new Date(year);
  const currentYear = new Date().getFullYear();
  const birthYear = birthDate.getFullYear();
  const age = currentYear - birthYear;
  return age;
}
