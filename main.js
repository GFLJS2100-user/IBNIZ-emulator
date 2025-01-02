class IBNIZEmulator {
    constructor(output) {
        this.output = output;
        this.stack = [];
        this.rstack = [];
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
        // Implement media switch logic
    }

    render() {
        this.output.innerHTML = this.stack.join(', ');
    }
}

function runCode() {
    const code = document.getElementById('code').value;
    const output = document.getElementById('output');
    const emulator = new IBNIZEmulator(output);
    emulator.run(code);
}
