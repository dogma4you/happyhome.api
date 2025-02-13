export function generateVerificationCode() {
    const num = Math.floor(100000 + Math.random() * 900000);
    return num.toString();
}

export function generateLocatonRowByCordinates(lat: number, lng: number): string {
    return `SRID=4326;POINT(${lng} ${lat})`;
}