import { WidgetComp } from '@/interface';

export function vueX2stoage(key: string, value: object | string | boolean): void {
    sessionStorage.setItem(key, JSON.stringify(value));
}

export function parseStoage(key: string) {
    let data = sessionStorage.getItem(key);
    try {
        return JSON.parse((data as string));
    } catch(e) {
        console.warn(`sessionStorage中不存在${key}`);
        return void 0;
    }
    
}
/**
 * @export
 * @returns {string} UUID
 */
export function uuidGenerator(): string {
    return 'xxxxyxxx-xyyx-xxxx-xxxx-xxxyxxyxxyxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

/**
 * @export 
 * @param {WidgetComp[]} List
 * @param {string} id
 * @returns 根据id查找组件树返回对应组件
 */
export function getCompById(List: WidgetComp[], id: string) {
    if (!List.length) {
        return {};
    }
    let stack: WidgetComp[] = [];
    List.length && List.forEach(comp => {
        stack.push(comp)
    });
    while (stack.length) {
        const item = (stack.pop() as WidgetComp);
        if (item.id === id) {
            return item;
        }
        if (item.children && item.children.length) {
            stack.unshift(...item.children);
        }
    };
    return {};
}

export function randomNum(n: number, m: number): number {
    return Math.floor(Math.random() * (m - n + 1) + n);
}
