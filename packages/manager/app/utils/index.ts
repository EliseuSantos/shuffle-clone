export function getActiveVersion(
  versions: Array<{ version: string; url: string; status: boolean; integrity: string }>
) {
  return versions.find((v) => v.status)
}
