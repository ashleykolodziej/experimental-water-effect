import * as PIXI from "https://cdn.skypack.dev/pixi.js";

// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container
const app = new PIXI.Application({width: 1920, height: 1080});

const loader = PIXI.Loader.shared;

const banner = "images/michael-longmire-L9EV3OogLh0-unsplash.jpg";
const displacementImage   = 'images/3DlQqNq.jpeg';

// The application will create a canvas element for you that you
// can then insert into the DOM
document.querySelector('#banner').appendChild(app.view);

loader.add([
  banner,
  displacementImage
])
.load(setup);

function setup() {
  // This code will run when the loader has finished loading the image
  let sprite = new PIXI.Sprite(
    loader.resources[banner].texture
  );

  // Add the bunny to the scene we are building
  app.stage.addChild(sprite);
  
  let displacementSprite  = new PIXI.Sprite.from( loader.resources[displacementImage].texture );
  app.stage.addChild(displacementSprite);
  sprite.filters = [new PIXI.filters.DisplacementFilter( displacementSprite )];
  
  let renderer = new PIXI.autoDetectRenderer();
  let ticker = PIXI.Ticker.shared;

  const width = app.view.width;
  const height = app.view.height;

  displacementSprite.anchor.set(0.5);
  displacementSprite.x = renderer.view.width;
  displacementSprite.y = renderer.view.height;  

  const moveX = 5;
  const moveY = 3;
  let directionX = moveX, 
      directionY = moveY;

  // Listen for frame updates
  ticker.add((delta) => {
    if ( displacementSprite.x < -app.view.width*1.5 ) {
      directionX = moveX;
    } else if ( displacementSprite.x > app.view.width*1.5 ) {
      directionX = -moveX;
    }

    if ( displacementSprite.y < -app.view.height*1.5 ) {
      directionY = moveY;
    } else if ( displacementSprite.y > app.view.height*1.5 ) {
      directionY = -moveY;
    }

    displacementSprite.x += directionX * delta;
    displacementSprite.y += directionY * delta;

    // Render our stage
    renderer.render( app.stage );
  });
}