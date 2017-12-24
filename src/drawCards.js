import Canvas from 'canvas';

import {
  EMPTY,
  SOLID,
  STRIPED,
  RED,
  GREEN,
  BLUE,
  DIAMOND,
  OVAL,
  SQUIGGLE,
  letters,
} from './const';

const cachedStripes = {};

function getStripes(colour) {
  if (!cachedStripes[colour]) {
    const patternCanvas = new Canvas(16, 16);
    const ctx = patternCanvas.getContext('2d');
    ctx.fillStyle = colour;
    ctx.fillRect(4, 0, 8, 16);
    cachedStripes[colour] = patternCanvas;
  }
  return cachedStripes[colour];
}

function setFill(ctx, colour, fill) {
  if (fill === SOLID) {
    ctx.fillStyle = colour;
    ctx.fill();
  } else if (fill === STRIPED) {
    const pattern = ctx.createPattern(getStripes(colour), 'repeat');
    ctx.fillStyle = pattern;
    ctx.fill();
  }
}

function drawDiamond(ctx, {
  colour,
  fill,
  x = 0,
  y = 0,
}) {
  ctx.save();

  ctx.strokeStyle = colour;
  ctx.lineWidth = 16;
  ctx.beginPath();
  ctx.moveTo(x + 50, y + 125);
  ctx.lineTo(x + 200, y + 50);
  ctx.lineTo(x + 350, y + 125);
  ctx.lineTo(x + 200, y + 200);
  ctx.closePath();

  setFill(ctx, colour, fill);
  ctx.stroke();

  ctx.restore();
}

function drawOval(ctx, {
  colour,
  fill,
  x = 0,
  y = 0,
}) {
  ctx.save();

  ctx.strokeStyle = colour;
  ctx.lineWidth = 16;

  ctx.beginPath();
  ctx.moveTo(x + 100, y + 50);
  ctx.lineTo(x + 300, y + 50);
  ctx.bezierCurveTo(x + 350, y + 50, x + 375, y + 90, x + 375, y + 125);
  ctx.bezierCurveTo(x + 375, y + 160, x + 350, y + 200, x + 300, y + 200);
  ctx.lineTo(x + 100, y + 200);
  ctx.bezierCurveTo(x + 50, y + 200, x + 25, y + 160, x + 25, y + 125);
  ctx.bezierCurveTo(x + 25, y + 90, x + 50, y + 50, x + 100, y + 50);
  ctx.closePath();

  setFill(ctx, colour, fill);
  ctx.stroke();

  ctx.restore();
}

function drawSquiggle(ctx, {
  colour,
  fill,
  x = 0,
  y = 0,
}) {
  ctx.save();

  ctx.strokeStyle = colour;
  ctx.lineWidth = 16;

  ctx.beginPath();
  ctx.moveTo(x + 130, y + 50);
  ctx.bezierCurveTo(x + 180, y + 50, x + 200, y + 85, x + 250, y + 90);
  ctx.bezierCurveTo(x + 310, y + 90, x + 320, y + 40, x + 360, y + 70);
  ctx.bezierCurveTo(x + 400, y + 110, x + 340, y + 200, x + 270, y + 200);
  ctx.bezierCurveTo(x + 220, y + 200, x + 200, y + 165, x + 150, y + 160);
  ctx.bezierCurveTo(x + 90, y + 160, x + 80, y + 210, x + 40, y + 180);
  ctx.bezierCurveTo(x + 0, y + 140, x + 60, y + 50, x + 130, y + 50);
  ctx.closePath();

  setFill(ctx, colour, fill);
  ctx.stroke();

  ctx.restore();
}

function drawOutline(ctx) {
  ctx.save();

  ctx.strokeStyle = '#000';
  ctx.lineWidth = 8;

  ctx.beginPath();
  ctx.moveTo(50, 25);
  ctx.lineTo(455, 25);
  ctx.bezierCurveTo(470, 25, 480, 35, 480, 50);
  ctx.lineTo(480, 670);
  ctx.bezierCurveTo(480, 685, 470, 695, 455, 695);
  ctx.lineTo(50, 695);
  ctx.bezierCurveTo(35, 695, 25, 685, 25, 670);
  ctx.lineTo(25, 50);
  ctx.bezierCurveTo(25, 35, 35, 25, 50, 25);

  ctx.fillStyle = '#fff';
  ctx.fill();
  ctx.stroke();

  ctx.restore();
}

function drawCard({
  number, colour, fill, shape,
}) {
  const canvas = new Canvas(505, 720);
  const ctx = canvas.getContext('2d');

  drawOutline(ctx);

  const yPositions = {
    1: [240],
    2: [130, 350],
    3: [40, 240, 440],
  };
  const shapeFunctions = {
    [DIAMOND]: drawDiamond,
    [OVAL]: drawOval,
    [SQUIGGLE]: drawSquiggle,
  };

  (yPositions[number] || []).forEach((y) => {
    if (shapeFunctions[shape]) {
      shapeFunctions[shape](ctx, {
        colour, fill, x: 52, y,
      });
    }
  });

  return canvas;
}

export function drawCards(cards) {
  const canvas = new Canvas(
    Math.floor((25 + (252 * 4)) / 2),
    Math.floor((25 + (360 * 3)) / 2),
  );
  const ctx = canvas.getContext('2d');
  ctx.scale(0.5, 0.5);

  for (let i = 0; i < cards.length; i += 1) {
    const x = 12 + (252 * (i % 4));
    const y = 12 + (360 * Math.floor(i / 4));

    ctx.globalAlpha = cards[i].faded ? 0.3 : 1;
    ctx.drawImage(drawCard(cards[i]), x, y, 252, 360);

    if (!cards[i].faded) {
      ctx.font = '30px Arial';
      ctx.fillText(letters[i], x + 21, y + 50);
      ctx.strokeText(letters[i], x + 21, y + 50);
    }
  }

  return canvas;
}
