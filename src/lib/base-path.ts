export const REPO_NAME = "festival-mb";

export function getBasePath(): string {
  return process.env.GITHUB_PAGES === "true" ? `/${REPO_NAME}` : "";
}

export function withBasePath(path: string): string {
  const basePath = getBasePath();
  return `${basePath}${path.startsWith("/") ? path : `/${path}`}`;
}
