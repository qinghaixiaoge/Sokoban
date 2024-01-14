/**
 * 人物移动处理
 */
import { content,correct,rows,cols } from "./render.js";
import render from './render.js'
/**
 * 交互两个盒子位置
 * @param {*} box1 第一个盒子行列
 * @param {*} box2 第二个盒子行列
 */
function change(box1,box2){
        const temp = content[box1.row][box1.col]
        content[box1.row][box1.col] = content[box2.row][box2.col]
        content[box2.row][box2.col] = temp
}
/**
 * 移动盒子
 * @param {*} row 人物所处的行
 * @param {*} col 人物所处的列
 * @param {*} direction 人物移动的方向
 */
export function run(direction){
    const player = Getplayer()
    const next = nextbox(player.row,player.col,direction)
    //下个元素为墙，不能移动
    if (next.value === 2) {
        return false;
    }
    //如果是空白则可以移动
    if (next.value === 0) {
        //移动之后交换位置
        change(player,next)
        render()
        return true
    }else{
        const nextNext = nextbox(next.row,next.col,direction)
        if (nextNext.value === 0) {
            change(next,nextNext)
            change(player,next)
            render()
            return true
        }else{
            return false
        }
    }
}
/**
 * 判断是否胜利
 */
export function isWin(){
    for(let i = 0;i < correct.length;i++){
        if (content[correct[i].row][correct[i].col] !== 3) {
            return false
        }
    }
    return true
}
/**
 * 下个盒子的位置信息
 * @param {*} row 人物所处的行
 * @param {*} col 人物所处的列
 * @param {*} direction 人物移动的方向
 */
function nextbox(row,col,direction){
    //左边
    if (direction === "left") {
        return {
            row,
            col: col-1,
            value: content[row][col-1]
        }
    }else if(direction === "right"){
        return {
            row,
            col: col+1,
            value: content[row][col+1]
        }
    }else if(direction === "top"){
        return {
            row: row-1,
            col: col,
            value: content[row-1][col]
        }
    }else{
        return {
            row: row+1,
            col: col,
            value: content[row+1][col]
        }
    }
}
/**
 * 找出当前人物所处的行和列
 */
function Getplayer(){
    for(let row = 0;row < rows;row++){
        for(let col = 0;col < cols;col++){
            if (content[row][col] === 1) {
                return {
                    row,
                    col
                }
            }
        }
    }
}
/**
 *  content[box1.row][box1.col] = content[box2.row][box2.col]
    content[box1.row][box1.col] = box2.value //不行，box2的value更新了要重新获取
console.log(box2,box2.value,content[box2.row][box2.col],"为啥不一样");//因为已经更新了，没有重新获取

 */