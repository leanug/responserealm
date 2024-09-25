export const generateSlug = (name: string) => {
  const urlFriendlyName = name
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+/g, '-') // Replace non-alphanumeric characters with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading or trailing hyphens
  return urlFriendlyName
};