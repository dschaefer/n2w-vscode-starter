declare function __non_webpack_require__(path: string): any;

export function add(x: number, y: number): Promise<number> {
    const native = __non_webpack_require__(`./${process.platform}/n2wNative`);
    return native.add(x, y);
}
