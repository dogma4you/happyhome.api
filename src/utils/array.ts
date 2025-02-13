export function getAsArray(data: any): any[] {
  if (Array.isArray(data)) return data;
  else if (!data) {
    return [];
  } else {
    return [data];
  }
}