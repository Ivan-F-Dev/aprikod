export function debounce<Params extends any[]>(
    fn: (...args: Params) => any,
    timeout: number,
): (...args: Params) => void {
    let timer: NodeJS.Timeout
    return (...args: Params) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            fn(...args)
        }, timeout)
    }
}