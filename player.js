class Entity {
  constructor(
    input = { x: 0, y: 0, speed: 5, lookat: { x: 0, y: 0 }, sprite: null }
  ) {
    this.input = input;
    this.x = input.x;
    this.y = input.y;
    this.speed = input.speed;
    this.velocity = { x: 0, y: 0 };
    this.direction = 0;
    this.spriteSheet = input.sprite;
  }
  updateDirection() {
    this.direction = Math.atan2(
      this.input.lookat.y - this.y,
      this.input.lookat.x - this.x
    );
  }

  updatePosition() {
    const dampingFactor = 0.2;
    this.velocity.x *= dampingFactor;
    this.velocity.y *= dampingFactor;

    if (Math.abs(this.velocity.x) < 0.1) this.velocity.x = 0;
    if (Math.abs(this.velocity.y) < 0.1) this.velocity.y = 0;
    const magnitude = Math.sqrt(this.velocity.x ** 2 + this.velocity.y ** 2);
    if (magnitude > 0) {
      this.x += (this.velocity.x / magnitude) * this.speed;
      this.y += (this.velocity.y / magnitude) * this.speed;
    }
  }

  draw(ctx) {
    if (!this.spriteSheet) {
      ctx.fillStyle = "black";
      ctx.fillRect(this.x - 25, this.y - 25, 50, 50);
    } else {
    }
  }
}

class Player extends Entity {
  constructor(input) {
    super(input);
    // add dash stuff
    this.dashVelocity = { x: 0, y: 0 };
    this.dashPower = 20;
  }

  // keyboard input stuff
  handleInput(keysDown, keybinds) {
    if (keysDown.includes(keybinds.up)) {
      this.velocity.y += -1 * this.speed;
    }
    if (keysDown.includes(keybinds.down)) {
      this.velocity.y += 1 * this.speed;
    }
    if (keysDown.includes(keybinds.left)) {
      this.velocity.x += -1 * this.speed;
    }
    if (keysDown.includes(keybinds.right)) {
      this.velocity.x += 1 * this.speed;
    }
  }

  // dash
  dash() {
    this.dashVelocity.x += Math.cos(this.direction) * this.dashPower;
    this.dashVelocity.y += Math.sin(this.direction) * this.dashPower;
  }

  // updates pos 
  update() {
    const dampingFactor = 0.2;
    this.velocity.x *= dampingFactor;
    this.velocity.y *= dampingFactor;

    if (Math.abs(this.velocity.x) < 0.1) this.velocity.x = 0;
    if (Math.abs(this.velocity.y) < 0.1) this.velocity.y = 0;

    const dashDamper = 0.7;
    this.dashVelocity.x *= dashDamper;
    this.dashVelocity.y *= dashDamper;

    if (Math.abs(this.dashVelocity.x) < 0.1) this.dashVelocity.x = 0;
    if (Math.abs(this.dashVelocity.y) < 0.1) this.dashVelocity.y = 0;

    // calculate velocity
    const totalVelocityX = this.velocity.x + this.dashVelocity.x;
    const totalVelocityY = this.velocity.y + this.dashVelocity.y;

    const magnitude = Math.sqrt(totalVelocityX ** 2 + totalVelocityY ** 2);

    if (magnitude > 0) {
      this.x += (totalVelocityX / magnitude) * this.speed;
      this.y += (totalVelocityY / magnitude) * this.speed;
    }

    // Update direction based on mouse position
    this.updateDirection();
  }
}
