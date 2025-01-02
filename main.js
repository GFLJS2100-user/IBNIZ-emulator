const sampleRate = 61440;
const code = '';
const this.t = 0;
const this.y = 0;
const this.x = 0;

function yuv2rgb(y, u, v) {
    // Convert YUV to RGB
    const r = y + 1.13983 * v;
    const g = y - 0.39465 * u - 0.58060 * v;
    const b = y + 2.03211 * u;
    
    return [
        Math.min(255, Math.max(0, Math.round(r * 255))),
        Math.min(255, Math.max(0, Math.round(g * 255))),
        Math.min(255, Math.max(0, Math.round(b * 255)))
    ];
}
