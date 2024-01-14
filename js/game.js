import render from './render.js'
render()
import {run,isWin} from './player.js'
let isover = false
window.onkeydown = function(e){
    if (isover) {
        return
    }
    let result = false;
    if (e.code === "ArrowRight") {
        result = run("right")
    }else if(e.code === "ArrowLeft") {
        result = run("left")
    }else if(e.code === "ArrowUp") {
        result = run("top")
    }else if(e.code === "ArrowDown") {
        result = run("bottom")
    }
    if (result) {
        if (isWin()) {
            console.log("游戏胜利");
            isover = true
        }
    }
}