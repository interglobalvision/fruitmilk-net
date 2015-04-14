//(function() {

  /*
   * NAV / MATTER.JS
   */

  // Matter module aliases
  var Engine = Matter.Engine,
      Events = Matter.Events,
      World = Matter.World,
      Body = Matter.Body,
      Bodies = Matter.Bodies,
      Bounds = Matter.Bounds,
      Detector = Matter.Detector,
      Vertices = Matter.Vertices,
      Vector = Matter.Vector,
      Common = Matter.Common,
      Composite = Matter.Composite,
      Composites = Matter.Composites,
      MouseConstraint = Matter.MouseConstraint,
      Mouse = Matter.Mouse,
      Sleeping = Matter.Sleeping;

  var Nav = {
    minimized: false,
  };

  // Comment the function of these?
  Nav.options = {

    minimizedHeight: 80,

    // Initial and reapplied forces
    maxForce: 0.2,
    minForce: -0.2,

    // Initial and reapplied torque
    maxTorque: 25,
    minTorque: -25,

    loopTimer: 1, // Time between each loop iteration in seconds
    background: 'rgba(0,0,0,0)', //World background
    velocityThreshold: 0.20, // The threshold to check if force should be reapplied or not
    
    gravity: 0, // World default gravity
    altGravity: 0.2, // World alternative gravity

    // Blobs options
    blobsOptions : {
      frictionAir: 0.01,
      friction: 0.1,
      restitution: 0.7,
      render: {
        strokeStyle: '#000000',
        fillStyle: '#000000'
      },
    },

    // Bumpers options
    bumpersOptions: {
      frictionAir: 1,
      friction: 0,
      restitution: 1,
      draggable: true,
      render: {
        strokeStyle: '#000000',
        fillStyle: 'rgba(0,0,0,0)'
      }
    },

    // Walls options
    wallOptions: {
      isStatic: true,
      restitution: 0.3,
      friction: 0.1,
      render: {
        visible: true,
        strokeStyle: 'red'
      }
    },

  };

  var _engine,
  _mouseConstraint,
  _sceneWidth,
  _sceneHeight;

  Nav.init = function() {

    Nav.container = document.getElementById('nav');

    // create a Matter.js engine
    _engine = Engine.create(Nav.container, {
      timing: {
        timeScale: 1,
      },
      render: {
        options: {
          width: Nav.container.clientWidth,
          height: Nav.container.clientHeight,
          background: Nav.options.background,
          wireframes: false,
          showBounds: true,
          /*
          showAngleIndicator: true,
          showBroadphase: true,
          showBounds: true,
          showDebug: true,
          showCollisions: true,
          showVelocity: true,
          showAxes: true,
          showPositions: true,
          showShadows: true
          */
        }
      },
      world: {
        gravity: {
          y: Nav.options.gravity
        },

        // Infinity cuz it doesn't rly matter https://github.com/liabru/matter-js/issues/67
        bounds: {
          min: {
            x: -Infinity,
            y: -Infinity
          },
          max: {
            x: Infinity,
            y: Infinity
          }
        },
      }
    });


    // add a mouse controlled constraint
    _mouseConstraint = MouseConstraint.create(_engine, {
      constraint: {
        render: {
          lineWidth: 0,
          strokeStyle: 'rgba(0,0,0,0)',
        }
      }
    });
    World.add(_engine.world, _mouseConstraint );

    // run the engine
    Engine.run(_engine);

    // Create main composites: blobs & walls
    Nav.walls = Composite.create();
    Nav.blobs = Composite.create();
    Nav.bumpers = Composite.create();
    Composite.add(_engine.world, [Nav.walls, Nav.blobs, Nav.bumpers]);

    // is main the best name here?
    Nav.main();
    Nav.updateScene();
  };

  Nav.main = function() {
    var _world = _engine.world;

    var counter = 0;

    var isDragging = false;

    Events.on(_engine, 'tick', function() {
      var blobs = Composite.allBodies(Nav.blobs);
      var bumpers = Composite.allBodies(Nav.bumpers);

      /*
       *  Loop that runs to reapply force and stuff
       */
      counter++;
      // Every [Nav.options.loopTimer] seconds
      if(counter >= 60 * Nav.options.loopTimer) {
        // Re apply force
        for(var i = 0; i < blobs.length; i++) {
          var blob = blobs[i];
          if( Math.abs(blob.velocity.x) < Nav.options.velocityThreshold && Math.abs(blob.velocity.y) < Nav.options.velocityThreshold ) {
            Body.applyForce(
              blob, 
              { x: 0, y: 0 },
              {
                x: Nav.random(Nav.options.minForce, Nav.options.maxForce),
                y: Nav.random(Nav.options.minForce, Nav.options.maxForce)
              }
            );
            blob.torque = Nav.random(Nav.options.minTorque, Nav.options.maxTorque);
          }
        }
      }

      /*
       * Mouse constraint stuff
       */
      var mouse = _mouseConstraint.mouse,
          inBlob = false,
          inBumper = false,
          inMinNav = false;

      Events.on(_mouseConstraint, 'startdrag', function() {
        isDragging = true;
      });

      Events.on(_mouseConstraint, 'enddrag', function() {
        isDragging = false;
      });

      if(Nav.minimized) {
        inMinNav = true;
        if( mouse.button === 0 ) {
          Nav.maximize();
        }
      } else {
        for(var i = 0; i < blobs.length; i++) {
          var blob = blobs[i];

          // Check if mouse is inside a blob
          if(
            Bounds.contains(blob.bounds, mouse.position)
              && !isDragging
            //&& Vertices.contains(blob.vertices, mouse.position)
            && Detector.canCollide(blob.collisionFilter, _mouseConstraint.collisionFilter)
          ) {

            inBlob = true;

            // Mouse down
            if( mouse.button === 0 ) {
              currentState = window.location['href'];
              History.pushState(null, null, wp.origin + blob.label);
              href = window.location['href'];
              $.ajax({
                url: href,
                success: function(data) {
                  content = $(data).find('#main-content');
                  $('#main-content').replaceWith(content);
                },
                error: function() {
                  History.pushState(null, null, currentState);
                }
              });
              break;
            }
          }
        }
      }

      // Bumpers
      for(var i = 0; i < bumpers.length; i++) {
        var bumper = bumpers[i];

        // Check if mouse is inside a bumper
        if(
          Bounds.contains(bumper.bounds, mouse.position)
            && !isDragging
          //&& Vertices.contains(bumper.vertices, mouse.position)
          && Detector.canCollide(bumper.collisionFilter, _mouseConstraint.collisionFilter)
        ) {
          inBumper = true;
        }
      }


      if(inMinNav) {
        Nav.container.style.cursor = 's-resize';
      } else if(inBlob) {
        Nav.container.style.cursor = 'pointer';
      } else if(inBumper) {
        Nav.container.style.cursor = 'move';
      } else {
        Nav.container.style.removeProperty('cursor');
      }
    });

    // Blobs
    // iterate array of labels and vertices for create these blobs

    var blobsArray = {
      'about': '10.042 487.687 L 5.879 519.638 L 25.064 527.84 L 106.748 518.685 L 123.996 491.566 L 122.697 483.194 L 99.942 286.855 L 77.594 103.913 L 72.376 39.764 L 78.212 10.407 L 76.203 1.203 L 66.77 0.853 L 41.725 41.737 L 49.416 164.389 L 35.975 336.88 L 27.614 428.55 L 10.042 487.687',
      'blog': '392.054 129.218 L 384.143 119.408 L 375.39 121.656 L 358.12 141.105 L 285.49 157.509 L 265.767 157.281 L 219.902 150.2 L 214.017 131.911 L 221.733 115.127 L 226.184 106.015 L 237.149 87.635 L 244.193 74.45 L 268.383 35.651 L 265.172 19.183 L 233.361 1.861 L 207.499 11.249 L 181.768 64.958 L 163.564 115.758 L 162.125 120.216 L 153.813 131.761 L 123.077 141.054 L 32.131 139.953 L 2.721 156.419 L 0.343 168.71 L 9.718 195.166 L 24.208 203.927 L 55.084 200.963 L 118.745 195.936 L 170.229 194.737 L 231.76 201.272 L 274.595 207.372 L 370.824 215.581 L 404.809 194.124 L 410.611 176.187 L 392.054 129.218',
      'collabs': '0 93.175 L 10.235 110.65 L 33.41 154.144 L 81.862 246.46 L 106.647 247.578 L 128.658 238.444 L 160.3 234.546 L 191.668 225.89 L 202.41 190.48 L 198.366 138.154 L 205.989 116.91 L 210.513 46.203 L 162.392 0.573 L 111.134 8.787 L 88.522 34.418 L 66.672 54.573 L 13.288 76.774 L 0 93.175',
      'installations': '66.857 111.333 L 72.683 134.386 L 83.228 228.066 L 95.507 245.705 L 122.945 251.166 L 150.46 204.641 L 158.366 107.062 L 159.087 102.428 L 159.366 20.732 L 136.068 0.738 L 98.755 14.951 L 94.034 21.424 L 73.885 31.744 L 54.313 25.242 L 45.358 33.681 L 48.176 48.441 L 37.929 57.676 L 6.831 70.294 L 10.957 118.242 L 60.634 118.952 L 66.857 111.333',
      'press': '0.526 356.493 L 0 359.417 L 31.74 382.713 L 121.067 376.017 L 168.126 344.008 L 177.207 331.359 L 187.571 254.115 L 189.155 165.72 L 214.517 94.353 L 230.447 33.7 L 207.877 22.034 L 158.075 64.527 L 138.194 100.03 L 121.235 129.77 L 80.216 126.16 L 65.233 66.632 L 72.535 32.667 L 72.048 0 L 64.288 3.806 L 27.354 31.078 L 11.408 46.897 L 7.651 65.151 L 23.206 113.39 L 90.495 231.176 L 120.424 276.414 L 118.102 327.027 L 93.855 347.461 L 84.416 351.259 L 18.322 353.764 L 0.526 356.493',
      'shop': '0.207 175.188 L 4.804 212.244 L 37.545 272.028 L 78.736 271.07 L 105.911 250.839 L 133.487 219.549 L 134.222 167.042 L 136.63 139.391 L 196.608 98.312 L 209.953 86.888 L 195.744 32.583 L 178.641 11.346 L 135.93 4.015 L 79.495 30.561 L 45.349 50.693 L 0.207 175.188'
    };

    // Add all blobs
    for(var key in blobsArray) {
      Composite.add(Nav.blobs, Body.create( Common.extend({
        label: key,
        vertices: Vertices.fromPath(blobsArray[key]),
        position: {
          x: Nav.random(0, _engine.render.options.width),
          y: Nav.random(0, _engine.render.options.height),
        },
        force: {
          x: Nav.random(Nav.options.minForce, Nav.options.maxForce),
          y: Nav.random(Nav.options.minForce, Nav.options.maxForce)
        },
        torque: Nav.random(Nav.options.minTorque, Nav.options.maxTorque)
      },
      Common.extend({
        render: {
          fillStyle: '#000',
          sprite: {
            texture:  wp.templateDir + '/img/sprites/' + key + '.png'
          }
        }
      },
      Nav.options.blobsOptions)
                                                         )));
    }

    // create bumpers
    var bumpersArray = [
      '260.6940002441 321.5820007324 L 264.8150000572 316.9740009308 L 268.8470001221 312.3790006638 L 273.0050001144 308.0460004807 L 277.5050001144 304.2200005054 L 280.4580001831 302.8440004587 L 284.1430001259 302.2130004764 L 287.8619999886 302.3800004721 L 290.9189999104 303.3980004787 L 296.7759997845 307.0860004425 L 302.4199998379 311.1870002747 L 307.7509996891 315.6780004501 L 312.6679995060 320.5350003242 L 322.8879997730 329.3710007668 L 334.1229994297 335.0850005150 L 346.3699991703 337.8200006485 L 359.6239988804 337.7200006470 L 372.9159986973 338.2600006685 L 385.1519987583 341.9520005807 L 396.7949984074 347.4270004854 L 408.3079988956 353.3160004243 L 412.2959988117 355.2770003900 L 416.2619988918 357.2860004529 L 420.1949989796 359.3570005521 L 424.0849988461 361.5040006265 L 426.9029989243 363.0180005655 L 429.7379989624 364.5960006341 L 432.2809989452 366.3910005912 L 434.2229989767 368.5600005016 L 436.3299990892 372.1450005397 L 438.1429990530 376.0790005550 L 439.1989990473 379.9840005264 L 439.0349990577 383.4830005988 L 436.6679989547 387.6110003814 L 432.8409988135 390.0900004730 L 428.0169989318 391.2330004796 L 422.6609989852 391.3520004824 L 416.8789989203 391.2440004796 L 411.0829989165 391.4270004928 L 405.2809988707 391.7510005236 L 399.4819990844 392.0660005212 L 398.5739990324 392.1400005296 L 397.6519990414 392.3030005321 L 396.7859990448 392.5830005333 L 396.0459990352 393.0100005493 L 386.6069989055 397.6050008163 L 378.4039988369 396.6850007996 L 370.9189987034 392.1950010285 L 363.6329984516 386.0810011849 L 350.4739980549 374.9300011620 L 337.2029981464 363.9090012535 L 323.7719983906 353.0920008644 L 310.1329984516 342.5520009026 L 305.2309985012 339.4970008358 L 299.7909984440 337.1080008969 L 294.0629982799 335.2600008473 L 288.2999982685 333.8300007805 L 281.0419983715 332.1540007815 L 273.9649982303 329.9620008692 L 267.1539983600 326.6410007700 L 260.6940002441 321.5820007324',
      '340.2609863281 375.6839904785 L 362.3469867706 374.7349904180 L 379.6709861755 365.4259904027 L 390.4359865189 349.2499898076 L 392.8469865322 327.6979897618 L 392.2269865274 324.7249897122 L 391.1149865389 321.7939897180 L 389.7379865646 318.9089897275 L 388.3219865561 316.0739896894 L 381.0479863882 301.1349895597 L 373.7429865599 286.2099893689 L 366.4729865789 271.2689893842 L 359.3039864302 256.2809894681 L 358.3359863758 253.6239894032 L 357.7459863424 250.7749894261 L 357.4269863367 247.8389893174 L 357.2699863315 244.9239893556 L 357.8629863858 239.1559892297 L 360.1679864526 234.8269892335 L 364.2079864144 231.7099891305 L 370.0019865632 229.5809891820 L 377.6149864793 227.2319892049 L 385.0819864869 224.2999890447 L 392.4519863725 221.0379889607 L 399.7739863992 217.6989889741 L 404.9169865251 215.7839890122 L 408.0839865804 215.9029890150 L 409.6919866204 218.3879891485 L 410.1579866409 223.5709892362 L 411.0369866490 233.4999891371 L 413.3859866261 242.9589887708 L 416.9259865880 252.0719886869 L 421.3789866567 260.9629884809 L 424.3259866834 266.5279885381 L 427.0419867635 272.2549887747 L 429.3109868169 278.1209889501 L 430.9169867635 284.1029888242 L 433.1379867196 296.6709886640 L 434.9709867835 309.3159891218 L 436.6619867682 321.9909893125 L 438.4539867043 334.6489893049 L 439.3139867187 340.3659893125 L 440.2519868016 346.0799890608 L 441.4089868665 351.7339893430 L 442.9259868264 357.2699891180 L 445.6369867921 369.8719893545 L 445.8149868101 382.2479897588 L 443.7259868234 394.4329901785 L 439.6369865984 406.4629899114 L 429.4329861253 426.6739903539 L 416.9079865068 445.2369900793 L 402.6479862779 462.5399895757 L 387.2399862856 478.9699898809 L 384.2679861635 481.0519898981 L 380.5289860815 482.4329899400 L 376.4379860014 483.3249899000 L 372.4089861959 483.9399899095 L 356.1179858297 483.4699898809 L 341.8009854406 478.2259899229 L 328.7769852728 469.8829895109 L 316.3649855703 460.1149898618 L 311.1309853643 455.8649898618 L 305.9119855016 451.5949898809 L 300.6739855856 447.3499899954 L 295.3809853643 443.1759902090 L 284.0319853872 432.6649905294 L 274.7099848837 420.7159901708 L 266.9689847082 407.6689902395 L 260.3659845442 393.8649903387 L 257.4219845384 382.2889901251 L 257.8209845573 370.7679902166 L 260.1289846450 359.3259898275 L 262.9089846164 347.9859896749 L 265.0409845859 336.6279898733 L 265.8929845840 325.4099894613 L 264.8709846288 314.2619896978 L 261.3809846193 303.1139899343 L 259.3609846383 297.8989897817 L 257.6729846746 292.5379897207 L 256.1179846078 287.1179896444 L 254.4959846288 281.7239895910 L 253.9629846364 278.7799895853 L 254.5709846765 276.6729894727 L 256.3529846221 275.2929894775 L 259.3419847041 274.5309895128 L 268.6559848338 273.1499894708 L 277.9549846202 271.6629894823 L 287.2609843761 270.2619894594 L 296.5939845592 269.1409894079 L 298.9479846507 269.5519893914 L 301.5609845668 270.8849893361 L 303.7499846965 272.6999893934 L 304.8309846669 274.5599894077 L 306.6519846469 285.5369896442 L 308.2669846565 296.5549892932 L 309.5499846488 307.6049894840 L 310.3739846498 318.6789898425 L 310.3759846499 326.2609896213 L 309.7719846179 333.8799895793 L 308.7749845793 341.4939894229 L 307.5979845335 349.0609893352 L 307.3089845290 353.9229893237 L 308.1949845066 358.1179894954 L 310.4159844627 361.5809895545 L 314.1319845428 364.2489895374 L 320.5719846000 367.2899894267 L 327.1089847793 370.1379894763 L 333.6879847755 372.8999895602 L 340.2609863281 375.6839904785',
      '362.5180053711 432.6560058594 L 350.9450054169 429.8180058002 L 340.9390058517 423.8880054951 L 332.1480054855 415.7400057316 L 324.2190055847 406.2460052967 L 313.5960054398 391.0170052052 L 304.5760049820 374.9180042744 L 297.2650051117 358.0310051441 L 291.7670049667 340.4380047321 L 289.1500048637 325.3180048466 L 289.1530048638 310.1250050068 L 292.1700048237 295.2990047932 L 298.5930046826 281.2800047398 L 302.9850048809 276.3940045834 L 309.0010046749 272.4410045147 L 315.8430046826 269.2590045929 L 322.7130045681 266.6870045662 L 327.2410044461 265.9790045619 L 332.1540045529 266.3840045631 L 337.2350044041 267.2140046060 L 342.2690043240 267.7810046375 L 348.9220042019 267.8800046444 L 355.5870041638 267.8340046406 L 362.2230043202 267.9560046420 L 368.7910041600 268.5580046400 L 374.4040040760 269.6240046248 L 379.9600038319 271.1890046820 L 385.3400039463 273.2390046343 L 390.4270038395 275.7610044703 L 391.8310038834 277.7280044779 L 392.6310038953 281.0830044970 L 392.7240038975 284.8220045790 L 392.0100039109 287.9410045370 L 388.3430038556 301.0310046896 L 389.1000038846 313.3700044379 L 392.8820039495 325.3700044379 L 398.2900039419 337.4410045370 L 404.5590039953 352.4750049338 L 409.0450040563 368.0220048651 L 411.1260041459 384.1270044073 L 410.1770040854 400.8360040411 L 404.0300042494 414.2790038809 L 391.9020039900 426.0170037970 L 376.9960038527 433.1200039610 L 362.5180053711 432.6560058594',
    ];
    
    for(var i = 0; i < bumpersArray.length; i++) {
      Composite.add(Nav.bumpers, Body.create( Common.extend({
          vertices: Vertices.fromPath(bumpersArray[i]),
          position: {
            x: Nav.random(0, _engine.render.options.width),
            y: Nav.random(0, _engine.render.options.height),
          },
        },
        Nav.options.bumpersOptions 
      )));
    }

    // Scale blobs & bumpers
    if( Nav.container.clientWidth < 1300 ) {
      Nav.updateBlobs(Nav.container.clientWidth / 1300); 
    }

    // Minimize
    if (!($('body').hasClass('home'))) {
      Nav.minimize();
    }

    window.onstatechange = function () { //history.js
      Nav.minimize();
    }

  };

  Nav.updateScene = function() {

    if (!_engine) {
      return;
    } 

    if( Nav.container.clientWidth < 1300 ) {
      Nav.updateBlobs(Nav.container.clientWidth / _engine.render.options.width); 
    }
      
    
    var renderOptions = _engine.render.options,
      canvas = _engine.render.canvas;

    canvas.width = renderOptions.width = Nav.container.clientWidth;
    canvas.height = renderOptions.height = Nav.container.clientHeight;

    Nav.updateWalls();
  };

  Nav.updateBlobs = function(scale) {
    if (!_engine) {
      return;
    } 

    var blobs = Composite.allBodies(Nav.blobs);
    for(var i = 0; i < blobs.length; i++) {
      var blob = blobs[i];
      Body.scale(blob, scale, scale);
    }

    var bumpers = Composite.allBodies(Nav.bumpers);
    for(var i = 0; i < bumpers.length; i++) {
      var bumper = bumpers[i];
      Body.scale(bumper, scale, scale);
    }
  };

  Nav.updateWalls = function() {

    if (!_engine) {
      return;
    }

    if(this.walls.bodies.length > 0) {
      Composite.clear(Nav.walls);
    }

    // Add walls
    Composite.add( Nav.walls, [
      Bodies.rectangle(_engine.render.options.width/2, 0, _engine.render.options.width, 1, Common.extend({ label: 'topWall'}, Nav.options.wallOptions)),
      Bodies.rectangle(_engine.render.options.width/2, _engine.render.options.height, _engine.render.options.width, 1, Common.extend({ label: 'bottomWall'}, Nav.options.wallOptions)),
      Bodies.rectangle(0, _engine.render.options.height/2, 1, _engine.render.options.height, Common.extend({ label: 'leftWall'}, Nav.options.wallOptions)),
      Bodies.rectangle(_engine.render.options.width, _engine.render.options.height/2, 1, _engine.render.options.height, Common.extend({ label: 'rightWall'}, Nav.options.wallOptions))
    ]);

  };

  Nav.minimize = function () {
    if(Nav.minimized) {
      return;
    }

    Nav.switchGravity();
    var height = $(window).height() - Nav.options.minimizedHeight;
    Nav.container.style.top = "-" + height + "px";
    setTimeout( function() {
      Nav.minimized = true;
    }, basicAnimationSpeed);
  }

  Nav.maximize = function() {
    if(!Nav.minimized) {
      return;
    }

    Nav.switchGravity();
    Nav.container.style.top = "0";
    setTimeout( function() {
      Nav.minimized = false;
    }, basicAnimationSpeed);
  }

  Nav.switchGravity = function() {
    if( _engine.world.gravity.y != Nav.options.gravity ) {
      _engine.world.gravity.y = Nav.options.altGravity * -2;
      setTimeout( function() {
        _engine.world.gravity.y = Nav.options.gravity;
      }, 700);
    } else {
      _engine.world.gravity.y = Nav.options.altGravity;
    }
  };

  Nav.random = function(min, max) {
    return Math.random() * (max - min) + min;
  };

  window.addEventListener('load', Nav.init);
  window.addEventListener('resize', Nav.updateScene);

  // Monkey patch to make convex blobs draggable
  MouseConstraint.update = function(mouseConstraint, bodies) {
    var mouse = mouseConstraint.mouse,
    constraint = mouseConstraint.constraint,
    body = mouseConstraint.body;

    if (mouse.button === 0) {
      if (!constraint.bodyB) {
        for (var i = 0; i < bodies.length; i++) {
          body = bodies[i];
          if (body.draggable
            && Bounds.contains(body.bounds, mouse.position) 
              //&& Vertices.contains(body.vertices, mouse.position)
            && Detector.canCollide(body.collisionFilter, mouseConstraint.collisionFilter)) {

              constraint.pointA = mouse.position;
              constraint.bodyB = mouseConstraint.body = body;
              constraint.pointB = { x: mouse.position.x - body.position.x, y: mouse.position.y - body.position.y };
              constraint.angleB = body.angle;

              Sleeping.set(body, false);
              Events.trigger(mouseConstraint, 'startdrag', { mouse: mouse, body: body });
            }
        }
      } else {
        Sleeping.set(constraint.bodyB, false);
        constraint.pointA = mouse.position;
      }
    } else {
      constraint.bodyB = mouseConstraint.body = null;
      constraint.pointB = null;

      if (body)
        Events.trigger(mouseConstraint, 'enddrag', { mouse: mouse, body: body });
    }
  };


//})();
