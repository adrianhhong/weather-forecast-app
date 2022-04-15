/**
 * Return a subset of an object's properties
 * https://stackoverflow.com/questions/17781472/how-to-get-a-subset-of-a-javascript-objects-properties
 * @param object
 * @param fields Subset of fields we want to keep
 * @returns
 */
export function pickFields<T>(object: T, fields: string[]): Partial<T> {
  return (({ ...fields }) => ({ ...fields }))(object);
}
