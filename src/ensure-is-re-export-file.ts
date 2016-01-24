const REXPORT_REGEX = /^export \* from ["'][^"']+["'];?$/;

export function ensureIsReExportFile(text: string) {
    const lines = (text || "").split(/\r?\n/);

    return lines.every((line) => REXPORT_REGEX.exec(line.trim()) != null || line.trim().length === 0);
}
