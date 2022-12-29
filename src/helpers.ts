export function extractFileNameFromUrl(str: string): string {
    return str.slice(str.indexOf('0'))
}