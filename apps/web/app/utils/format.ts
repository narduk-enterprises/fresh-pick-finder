/**
 * Convert a kebab-case slug to Title Case.
 *
 * @example cityFromSlug('san-antonio') // → 'San Antonio'
 */
export function cityFromSlug(slug: string): string {
  return slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
}
