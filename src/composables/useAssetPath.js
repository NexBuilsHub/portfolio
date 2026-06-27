export function useAssetPath() {
  const base = import.meta.env.BASE_URL || '/'

  const getAssetPath = (path) => {
    if (!path) return ''
    if (path.startsWith('http')) return path
    const clean = path.startsWith('/') ? path.slice(1) : path
    return base + clean
  }

  return { getAssetPath, base }
}
