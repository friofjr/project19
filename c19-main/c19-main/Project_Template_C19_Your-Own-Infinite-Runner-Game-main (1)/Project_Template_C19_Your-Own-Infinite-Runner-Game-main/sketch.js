var life = 300
var score = 0
var gameState = 1

function preload() {
  bgImg = loadImage("assets/bg.jpg")

  submarineImg = loadImage("assets/submarine.png")

  obImg1 = loadImage("assets/shark.png")
  obImg2 = loadImage("assets/dangerousFish.png")
  obImg3 = loadImage("assets/fish.png")
  obImg4 = loadImage("assets/octopus.png")

  coinImg = loadImage("assets/goldCoin.png")

  resetImg = loadImage("assets/reset.png")

}

function setup() {
  createCanvas(windowWidth, windowHeight)

  bg = createSprite(width / 2, height / 2, width, height)
  bg.addImage(bgImg)
  bg.scale = 0.6

  submarine = createSprite(-50, height - 250)
  submarine.addImage(submarineImg)
  submarine.velocityX = 5
  submarine.scale = 1.5
  // submarine.debug = true
  submarine.setCollider("rectangle", 0, 0, 450, 150)

  obstaclesGroup = createGroup()
  coinsGroup = createGroup()

  reset = createSprite(width / 2, height / 2)
  reset.addImage(resetImg)
  reset.visible = false

}

function draw() {
  background("blue")
  drawSprites()

  if (gameState == 1) {
    if (submarine.x >= width + 250) {
      submarine.x = -200
    }

    if (keyDown("up")) {
      submarine.y -= 10
    }

    if (keyDown("down")) {
      submarine.y += 10
    }

    if (obstaclesGroup.isTouching(submarine)) {
      for (var i = 0; i < obstaclesGroup.length; i++) {
        if (obstaclesGroup[i].isTouching(submarine)) {
          obstaclesGroup[i].destroy()
          life = life - 100
        }
      }
    }

    if (coinsGroup.isTouching(submarine)) {
      for (var i = 0; i < coinsGroup.length; i++) {
        if (coinsGroup[i].isTouching(submarine)) {
          coinsGroup[i].destroy()
          score = score + 5
        }
      }
    }

    if (life <= 0) {
      gameState = 0
    }


    spawnObstacles()

    spawnCoins()

  }


  if (gameState == 0) {
    submarine.destroy()
    coinsGroup.destroyEach()
    obstaclesGroup.destroyEach()

    reset.visible = true

    if (mousePressedOver(reset)) {
      window.location.reload()
    }
  }

  push();
  textSize(32)
  fill("black")
  text("Life Left : ", width / 2 - 240, 100)
  fill("white");
  rect(width / 2 - 100, 70, 300, 30);
  fill("#f50057");
  rect(width / 2 - 100, 70, life, 30);
  noStroke();
  pop();

  textSize(32)
  fill("black")
  text("Score : " + score, width / 2 + 240, 100)


}


function spawnObstacles() {
  if (frameCount % 100 == 0) {
    obstacle = createSprite(width + 100, random(200, height - 350))

    numb = Math.round(random(1, 4))

    switch (numb) {
      case 1: obstacle.addImage(obImg1)
        obstacle.scale = 1.3
        break

      case 2: obstacle.addImage(obImg2)
        obstacle.scale = 1.4
        break

      case 3: obstacle.addImage(obImg3)
        obstacle.scale = 0.7
        break

      case 4: obstacle.addImage(obImg4)
        obstacle.scale = 0.6

        break
    }

    obstacle.velocityX = -5

    obstaclesGroup.add(obstacle)
  }
}

function spawnCoins() {
  if (frameCount % 50 == 0) {

    coin = createSprite(width + 100, random(100, height - 100))
    coin.addImage(coinImg)
    coin.velocityX = -5
    coin.scale = 0.2
    coinsGroup.add(coin)
  }
}


