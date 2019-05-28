interface wordsMap {
    [key: string]: string;
}
const ListMap = {
    title: "标题",
    content: "内容",
    href: "链接地址",
};
const CarouselMap = {
    pagesize: "页码",
    autoplay: "是否自动播放",
    autoplaySpeed: "自动播放时间间隔"
}
const WhiteSpaceMap = {
    height: "高度",
    transparent: "是否透明",
    bgColor: "背景色"
};

export function transKeyToChinese(key: string): string {
    const wordsMap: wordsMap = Object.assign({}, ListMap, CarouselMap, WhiteSpaceMap)
    return wordsMap[key];
}