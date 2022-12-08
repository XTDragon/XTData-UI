<template>
  <h1 id="grade"></h1>
  <div id="map">

  </div>
  <button id="start">

  </button>

  <button style="width: 100px" id="stop">

  </button>
</template>

<script>
export default {
  name: "snake",
  mounted() {
    let map = document.getElementById("map");
    let game = new Game(map, 10);
    let gradeEl = document.querySelector("#grade")

    game.toGrade = function (grade) {
      gradeEl.innerHTML = grade;
    }
    game.toOver = function () {
      alert("游戏结束！")
    }
    document.querySelector("#start").onclick = (() => {
      console.log("开始游戏");
      game.start();
    })
    document.querySelector("#stop").onclick = (() => {
      console.log("暂停游戏");
      game.stop();
    })
  },
}

class Map {
  constructor(el, rect) {
    this.el = el;
    this.rect = rect;
    this.data = [];
    this.rows = Math.ceil(Map.getStyle(el, "height") / rect);
    this.columns = Math.ceil(Map.getStyle(el, "width") / rect);
    Map.setStyle(el, "height", this.rows * rect);
    Map.setStyle(el, "width", this.columns * rect);
  }

  static getStyle(el, attr) {
    return parseFloat(getComputedStyle(el)[attr])
  }

  static setStyle(el, attr, val) {
    el.style[attr] = val + "px";
  }

  setData(newData) {
    this.data = this.data.concat(newData);
  }

  clearData() {
    this.data.length = 0;
  }

  include({x, y}) {
    return this.data.some(item => (item.x == x && item.y == y));
  }

  render() {
    this.el.innerHTML = this.data.map(item => {
      return `<span style="position:absolute;left:${item.x * this.rect}px;top:${item.y * this.rect}px;width:${this.rect}px;height:${this.rect}px;background:${item.color};"></span>`
    }).join("");
  }
}

class Food {
  constructor(map, colors = ["red", "blue", "yellow", "pink"]) {
    this.map = map;
    this.colors = colors;
    this.data = null;
    this.create();
  }

  //随机生成食物
  create() {
    let x = Math.floor(Math.random() * this.map.columns);
    let y = Math.floor(Math.random() * this.map.rows);
    let color = this.colors[parseInt(Math.random() * this.colors.length)]
    this.data = {x, y, color};
    if (this.map.include(this.data)) {
      this.create();
    }
    this.map.setData(this.data)
  }
}

class Snake {
  constructor(map, food) {
    //初始蛇的位置与大小
    this.data = [
      {x: 6, y: 2, color: "green"},
      {x: 5, y: 2, color: "white"},
      {x: 4, y: 2, color: "white"},
      {x: 3, y: 2, color: "white"},
      {x: 2, y: 2, color: "white"}
    ];
    this.map = map;
    this.food = food;
    this.direction = "right"
    this.map.setData(this.data);
  }

  move() {
    //每次移动之前先把最后一份数据存起来
    let length = this.data.length
    this.lastData = {
      x: this.data[length - 1].x,
      y: this.data[length - 1].y,
      color: "white"
    }
    // 让后面每一格走到前一个的位置上
    for (let i = this.data.length - 1; i > 0; i--) {
      this.data[i].x = this.data[i - 1].x;
      this.data[i].y = this.data[i - 1].y;
    }
    // 根据方向移动蛇头
    switch (this.direction) {
      case "left":
        this.data[0].x--;
        break;
      case "right":
        this.data[0].x++;
        break;
      case "up":
        this.data[0].y--;
        break;
      case "down":
        this.data[0].y++;
        break;
    }
  }

  changeDirection(dir) {
    //如果蛇本身正在左右移动，只能修改让蛇上下移动
    //如果蛇本身正在上下移动，只能修改让蛇左右移动
    if (this.direction === "left" || this.direction === "right") {
      if (dir === "left" || dir === "right") {
        return false
      }
    } else {
      if (dir === "up" || dir === "down") {
        return false
      }
    }
    this.direction = dir;
    return true;
  }

  //吃到了食物，蛇应该变大
  eatFood() {
    this.data.push(this.lastData);
  }
}

class Game {
  constructor(el, rect, toGrade = null, toOver = null) {
    this.map = new Map(el, rect);
    this.food = new Food(this.map);
    this.snake = new Snake(this.map, this.food);
    this.map.render();
    this.timer = 0;
    this.interval = 200;
    this.keyDown = this.keyDown.bind(this);
    this.grade = 0;
    this.toGrade = toGrade;
    this.toOver = toOver;
    this.control();
  }

  //游戏的开始和暂停
  start() {
    this.move();
  }

  stop() {
    clearInterval(this.timer);
  }

  //控制移动
  move() {
    this.stop();
    this.timer = setInterval(() => {
      this.snake.move();
      this.map.clearData();
      if (this.isEat()) {
        this.grade++
        this.snake.eatFood();
        this.food.create();
        this.changeGrade(this.grade);
        this.interval *= .9;
        this.stop();
        this.start();
      }
      if (this.isOver()) {
        this.over()
      }
      this.map.setData(this.snake.data);
      this.map.setData(this.food.data);
      this.map.render();
    }, this.interval)
  }

  //判断是否吃到食物
  isEat() {
    return this.snake.data[0].x === this.food.data.x && this.snake.data[0].y === this.food.data.y;
  }

  //判断游戏是否结束
  isOver() {
    //判断蛇是否出了地图
    if (this.snake.data[0].x < 0
        || this.snake.data[0].x >= this.map.columns
        || this.snake.data[0].y < 0
        || this.snake.data[0].y >= this.map.rows) {
      return true
    }
    //判断蛇是否碰到了自己
    for (let i = 1; i < this.snake.data.length; i++) {
      if (this.snake.data[0].x === this.snake.data[i].x
          && this.snake.data[0].y === this.snake.data[i].y) {
        return true;
      }
    }
    return false;
  }

  //游戏结束
  over() {
    this.toOver && this.toOver();
    this.stop();
  }

  //分数改变
  changeGrade(grade) {
    this.toGrade && this.toGrade(grade);
  }

  keyDown({keyCode}) {
    let isDir;
    switch (keyCode) {
      case 37:
        isDir = this.snake.changeDirection("left");
        break;
      case 38:
        isDir = this.snake.changeDirection("up");
        break;
      case 39:
        isDir = this.snake.changeDirection("right");
        break;
      case 40:
        isDir = this.snake.changeDirection("down");
        break;
    }
  }

  //控制器
  control() {
    window.addEventListener("keydown", this.keyDown);
  }
}

</script>

<style scoped>

</style>