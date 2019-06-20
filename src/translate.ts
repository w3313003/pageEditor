interface wordsMap {
    [key: string]: string;
}
const wordMap = {
    title: "标题",
    content: "内容",
    href: "链接地址",
    pagesize: "页码",
    autoplay: "是否自动播放",
    autoplaySpeed: "自动播放时间间隔",
    height: "高度",
    transparent: "是否透明",
    bgColor: "背景色"
};

export function transKeyToChinese(key: string): string {
    const wordsMap: wordsMap = Object.assign({}, wordMap)
    return wordsMap[key];
}