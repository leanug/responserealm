// Utility function to validate a slug
export const isValidSlug = (slug: string): boolean => {
  // Check if the slug is a string, and matches the allowed pattern
  const slugPattern = /^[a-zA-Z0-9\-]+$/; // Allows alphanumeric characters and hyphens
  return typeof slug === 'string' && slugPattern.test(slug) && slug.length >= 3 && slug.length <= 50
}