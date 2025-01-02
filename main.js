class IBNIZEmulator {
    constructor(canvas) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.stack = [];
        this.rstack = [];
        this.isVideoContext = true; // Track the current context
        this.instructions = {
            '+': () => this.binaryOp((a, b) => a + b),
            '-': () => this.binaryOp((a, b) => a - b),
            '*': () => this.binaryOp((a, b) => a * b),
            '/': () => this.binaryOp((a, b) => b === 0 ? 0 : a / b),
            '%': () => this.binaryOp((a, b) => b === 0 ? 0 : a % b),
            '^': () => this.binaryOp((a, b) => a ^ b),
            '&': () => this.binaryOp((a, b) => a & b),
            '|': () => this.binaryOp((a, b) => a | b),
            'd': () => this.stack.push(this.stack[this.stack.length - 1]),
            'p': () => this.stack.pop(),
            'x': () => this.swap(),
            'M': () => this.mediaSwitch(),
            // Add more instructions as needed
        };
    }

    run(code) {
        for (const char of code) {
            if (this.instructions[char]) {
                this.instructions[char]();
            }
        }
        this.render();
    }

    binaryOp(fn) {
        const b = this.stack.pop();
        const a = this.stack.pop();
        this.stack.push(fn(a, b));
    }

    swap() {
        const b = this.stack.pop();
        const a = this.stack.pop();
        this.stack.push(b);
        this.stack.push(a);
    }

    mediaSwitch() {
        this.isVideoContext = !this.isVideoContext;
    }

    render() {
        const imageData = this.context.createImageData(256, 256);
        for (let i = 0; i < this.stack.length; i++) {
            const value = this.stack[i] | 0; // Ensure integer
            const x = (i % 256);
            const y = (i / 256) | 0;
            const index = (y * 256 + x) * 4;
            imageData.data[index] = value & 0xFF; // Red
            imageData.data[index + 1] = (value >> 8) & 0xFF; // Green
            imageData.data[index + 2] = (value >> 16) & 0xFF; // Blue
            imageData.data[index + 3] = 255; // Alpha
        }
        this.context.putImageData(imageData, 0, 0);
    }
}

function runCode() {
    const code = document.getElementById('code').value;
    const canvas = document.getElementById('outputCanvas');
    const emulator = new IBNIZEmulator(canvas);
    emulator.run(code);
}
