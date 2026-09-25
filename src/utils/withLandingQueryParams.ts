export function withLandingQueryParams(
    destination: string,
    landingSearch: string,
): string {
    if (!landingSearch) return destination;

    const url = new URL(destination);
    new URLSearchParams(landingSearch).forEach((value, key) => {
        url.searchParams.append(key, value);
    });
    return url.toString();
}
