const game = document.querySelector("#game")
export const boxWidth = 45
export const boxHeight = 45
/**
 * 0空白
 * 1玩家
 * 2墙
 * 3箱子
 */
export const content = [
    [0, 0, 2, 2, 2, 2, 2, 0, 0],
    [0, 0, 2, 0, 1, 0, 2, 0, 0],
    [0, 0, 2, 0, 3, 0, 2, 0, 0],
    [2, 2, 2, 0, 0, 0, 2, 2, 2],
    [2, 0, 0, 0, 3, 0, 0, 0, 2],
    [2, 0, 3, 3, 3, 3, 3, 0, 2],
    [2, 0, 0, 0, 3, 0, 0, 0, 2],
    [2, 2, 0, 3, 3, 3, 0, 2, 2],
    [0, 2, 0, 0, 0, 0, 0, 2, 0],
    [0, 2, 0, 0, 3, 0, 0, 2, 0],
    [0, 2, 0, 0, 0, 0, 0, 2, 0],
    [0, 2, 2, 2, 2, 2, 2, 2, 0]
];

/**
 * 正确位置
 */
export const correct = [
    { row: 3, col: 4 },
    { row: 4, col: 4 },
    { row: 5, col: 2 },
    { row: 5, col: 3 },
    { row: 5, col: 4 },
    { row: 5, col: 5 },
    { row: 5, col: 6 },
    { row: 6, col: 4 },
    { row: 7, col: 4 },
    { row: 8, col: 4 },
    { row: 9, col: 4 },
    { row: 10, col: 4 }
];
/**
 * 行数
 */
export const rows = content.length
export const cols = content[0].length
/**
 * 箱子是否在正确的位置
 */
function iscorrect(row, col) {
    return correct.find(box => box.row === row && box.col === col) !== undefined
}
/**
 * 根据行和列生成对应的元素
 */
function setcontent(row, col) {
    const div = document.createElement("div")
    //div.style.transform = `translate(${col * boxWidth}px,${ row * boxHeight}px)`  transform变形提高页面渲染效率
    div.style.left = col * boxWidth + 'px'
    div.style.top = row * boxHeight + 'px'
    div.className = "item"
    if (content[row][col] === 0) {  //如果是0，根据是否在正确位置生成待填的样式
        //箱子在正确位置，正确位置没有箱子显示代填的样式
        if (iscorrect(row, col)) {
            div.classList.add("correct")
        }else{
            return
        }
    } else if (content[row][col] === 1) { //如果是1，生成玩家
        div.classList.add("player")
    } else if (content[row][col] === 2) { //如果是2，生成墙
        div.classList.add("wall")
    } else { //其它情况，生成箱子
        //箱子在正确的位置显示正确的box
        if (iscorrect(row, col)) {
            div.classList.add("correct-box")
        } else {
            div.classList.add("box")
        }
    }
    game.appendChild(div)
}
/**
 * 渲染函数
 */
function render() {
    game.innerHTML = ""
    //1、生成容器的宽度和高度
    game.style.width = cols * boxWidth + 'px'
    game.style.height = rows * boxHeight + 'px'
    //2、根据位置生成对应的内容
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            setcontent(row, col)
        }
    }
}
export default render


/**
 * 我的思路 根据content一个一个生成对应的盒子  不是正确位置的空白区域也生成了盒子是没有必要的 
 */