// @author: t8ne
//--------------------------------------------------------------------------------------------

//Cena de Preload: Carregar previamente os assets
class PreloadScene extends Phaser.Scene {
  constructor() {
    super("PreloadScene");
  }

  preload() {
    this.input.keyboard.enabled = false;
    this.input.mouse.enabled = true;

    //Setup da barra de progresso
    let progressBar = this.add.graphics();
    let progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);

    const { x, y } = calculatePosition(240, 270);
    const barWidth = game.config.width * 0.4;
    const barHeight = game.config.height * 0.08;
    progressBox.fillRect(x, y, barWidth, barHeight);

    let width = this.cameras.main.width;
    let height = this.cameras.main.height;

    //Texto da Percentagem do load
    let percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: "0%",
      style: {
        font: `${calculateFontSize(18)}px PixelOperator8-Bold`,
        fill: "#ffffff",
      },
    });
    percentText.setOrigin(0.5, 0.5);

    //Texto do asset que está a ser carregado
    let assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: "",
      style: {
        font: `${calculateFontSize(18)}px PixelOperator8-Bold`,
        fill: "#ffffff",
      },
    });
    assetText.setOrigin(0.5, 0.5);

    //Texto adicional
    let additionalText = this.make.text({
      x: width / 2,
      y: height / 2 + 280,
      text: "A 1ª vez pode demorar um pouco mais...",
      style: {
        font: `${calculateFontSize(18)}px PixelOperator8-Bold`,
        fill: "#ffffff",
      },
    });
    additionalText.setOrigin(0.5, 0.5);

    //Estilo do texto e barra
    this.load.on("progress", function (value) {
      percentText.setText(parseInt(value * 100) + "%");
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(
        x + 10,
        y + 10,
        (barWidth - 20) * value,
        barHeight - 20
      );
    });

    //Texto do nome dos ficheiros
    this.load.on("fileprogress", function (file) {
      assetText.setText("A carregar asset: " + file.key);
    });

    //Desaparecer quando completo
    this.load.on("complete", function () {
      progressBar.destroy();
      progressBox.destroy();
      percentText.destroy();
      assetText.destroy();
    });

    //Load dos backgrounds (fora do jogo)
    this.load.image("background", "assets/world/map.png");
    this.load.image("bgInit", "assets/world/bg.jpg");

    //Load dos backgrounds dos níveis do jogo
    this.load.image("level1", "assets/tiles/desert_tile.png");
    this.load.image("level2", "assets/tiles/snow_tile.png");
    this.load.image("level3", "assets/tiles/grass_tile.png");
    this.load.image("level4", "assets/tiles/undead_tile.png");

    //Load de spritesheets do character
    this.load.spritesheet("player1", "assets/char/1.png", {
      frameWidth: 136,
      frameHeight: 170,
    });
    this.load.spritesheet("player2", "assets/char/2.png", {
      frameWidth: 136,
      frameHeight: 170,
    });

    //Load dos spritesheets do ataque e do obstáculo
    this.load.spritesheet("fireball", "assets/char/fireball.png", {
      frameWidth: 121,
      frameHeight: 125,
    });
    this.load.spritesheet("smoke", "assets/etc/smoke.png", {
      frameWidth: 426,
      frameHeight: 497,
    });
    this.load.image("obstacle", "assets/etc/smoke.png");

    //Load dos aúdios do jogador/jogo
    this.load.audio("collect", "assets/sounds/coin.wav");
    this.load.audio("complete", "assets/sounds/power_up.wav");
    this.load.audio("shootSound", "assets/sounds/hurt.wav");
    this.load.audio("dead", "assets/sounds/explosion.wav");

    //Load das músicas de fundo
    this.load.audio("level1-song", "assets/music/level1.mp3");
    this.load.audio("level2-song", "assets/music/level2.mp3");
    this.load.audio("level3-song", "assets/music/level3.mp3");
    this.load.audio("level4-song", "assets/music/level4.mp3");

    //Load dos sons do menu de pausa
    this.load.audio("closePauseMenu", "assets/sounds/close_pausemenu.mp3");
    this.load.audio("openPauseMenu", "assets/sounds/open_pausemenu.mp3");

    //Load dos diferentes sons do painel solar
    this.load.audio("solar_appear", "assets/sounds/solar_appear.mp3");
    this.load.audio("solar_disappear", "assets/sounds/solar_disappear.mp3");
    this.load.audio("solar_collect", "assets/sounds/solar_collect.mp3");

    this.load.image("solar", "assets/etc/solarPanel.png");

    this.load.audio("ambient", "assets/music/bgMusic.mp3");

    //Load da Fonte utilizada
    this.loadFont(
      "PixelOperator8-Bold",
      "assets/fonts/PixelOperator8-Bold.ttf"
    );

    //Load do Plugin do JoyStick
    this.load.plugin(
      "rexvirtualjoystickplugin",
      "https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js",
      true
    );
  }

  //Criação da próxima cena
  create() {
    this.createAnimations();
    this.scene.start("StartScene");
  }

  //Criação das animações
  createAnimations() {
    const animations = [
      {
        //Andar
        key: "walk",
        spritesheet: "player1",
        frames: [16, 17, 18, 19, 20, 21, 22, 23],
        repeat: -1,
        frameRate: 10,
      },
      {
        //Parado
        key: "idle",
        spritesheet: "player1",
        frames: [0, 1, 2, 3, 4, 5, 6],
        repeat: -1,
        frameRate: 10,
      },
      {
        //Atacar
        key: "attack",
        spritesheet: "player2",
        frames: [0, 1, 2, 3, 4, 5, 6, 7],
        repeat: 0,
        frameRate: 64,
      },
      {
        //Morrer
        key: "dead",
        spritesheet: "player2",
        frames: [32, 33, 34, 35, 36, 37],
        repeat: 0,
        frameRate: 7,
      },
      {
        //Fireball (quando o ataque é feito)
        key: "fireball",
        spritesheet: "fireball",
        frames: [0, 1, 2, 3, 4, 5, 6, 7, 8],
        repeat: 0,
        frameRate: 10,
      },
      {
        //Obstáculo
        key: "smoke",
        spritesheet: "smoke",
        frames: [0, 1, 2, 3, 4, 5],
        repeat: -1,
        frameRate: 10,
      },
    ];

    //Setup das animações
    animations.forEach((anim) => {
      this.anims.create({
        key: anim.key,
        frames: this.anims.generateFrameNumbers(anim.spritesheet, {
          frames: anim.frames,
        }),
        frameRate: anim.frameRate,
        repeat: anim.repeat,
      });
    });
  }

  //Aplicação da fonte utilizada no jogo
  loadFont(name, url) {
    const newFont = new FontFace(name, `url(${url})`);
    newFont
      .load()
      .then(function (loadedFont) {
        document.fonts.add(loadedFont);
      })
      .catch(function (error) {
        console.error("Error loading font", error);
      });
  }
}

//Cena que corre no background, menos na GameScene (jogo em si)
class BaseScene extends Phaser.Scene {
  //Colocar o background
  createBackground(imageName = "bgInit", darkTint = false) {
    const bg = this.add.image(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2,
      imageName
    );
    const scaleX = this.cameras.main.width / bg.width;
    const scaleY = this.cameras.main.height / bg.height;
    const scale = Math.max(scaleX, scaleY);
    bg.setScale(scale).setScrollFactor(0);

    if (darkTint) {
      bg.setTint(0x222222);
    }
  }

  //Aplicar a fonte
  applyFontStyle(size = "24px", color = "#ffffff") {
    return {
      fontSize: calculateFontSize(parseInt(size)),
      fill: color,
      fontFamily: "PixelOperator8-Bold",
    };
  }

  //Criação de um Back Button para voltar á StartScene
  createBackButton(scene) {
    const { x, y } = calculatePosition(50, 550);
    const backButton = this.add
      .text(x, y, "Voltar", this.applyFontStyle("20px"))
      .setInteractive()
      .on("pointerdown", () => this.scene.start(scene));
    return backButton;
  }

  //Tocar da música ambiente no background dos devidos ecrâs
  playAmbientMusic() {
    if (!this.sound.get("ambient")) {
      const ambientVolume =
        parseFloat(localStorage.getItem("ambientVolume")) || 0.5;
      this.ambientMusic = this.sound.add("ambient", {
        loop: true,
        volume: ambientVolume,
      });
      this.ambientMusic.play();
    } else if (!this.sound.get("ambient").isPlaying) {
      this.sound.get("ambient").play();
    }
  }
}

//Primeira cena real do jogo
class StartScene extends BaseScene {
  constructor() {
    super("StartScene");
  }

  create() {
    this.input.keyboard.enabled = false;
    this.input.mouse.enabled = true;

    this.createBackground("bgInit", true);

    //Adição do texto principal da scene
    const { x: centerX, y: topY } = calculatePosition(400, 100);
    this.add
      .text(
        centerX,
        topY,
        "Energy Guardian Adventure",
        this.applyFontStyle("30px")
      )
      .setOrigin(0.5);
    this.add
      .text(
        centerX,
        topY + 35,
        "--------------------------------",
        this.applyFontStyle("30px")
      )
      .setOrigin(0.5);

    const { x: bottomRightX, y: bottomRightY } = calculatePosition(710, 585);
    this.add
      .text(
        bottomRightX,
        bottomRightY,
        "t8ne - 2024",
        this.applyFontStyle("15px")
      )
      .setOrigin(0.5);

    //Botões diferentes que o user pode clicar, redirige á sua scene devida
    const buttons = [
      { text: "Jogar", scene: "LevelSelectScene" },
      { text: "Objetivo", scene: "ObjectiveScene" },
      { text: "Controlos", scene: "ControlsScene" },
      { text: "Dificuldade", scene: "DifficultySelectScene" },
      { text: "Opções", scene: "OptionsSelectScene" },
    ];

    buttons.forEach((button, index) => {
      const { x, y } = calculatePosition(400, 210 + index * 50);
      this.add
        .text(x, y, button.text, this.applyFontStyle())
        .setOrigin(0.5)
        .setInteractive()
        .on("pointerdown", () => this.scene.start(button.scene));
    });

    //Dar reset aos níveis se o utilizador clicar no botão
    const { x: bottomLeftX, y: bottomLeftY } = calculatePosition(110, 585);
    const clearDataButton = this.add
      .text(
        bottomLeftX,
        bottomLeftY,
        "Limpar Níveis",
        this.applyFontStyle("15px")
      )
      .setOrigin(0.5)
      .setInteractive()
      .on("pointerdown", () => {
        localStorage.removeItem("levels");
        clearDataButton.setText("Níveis Limpos");
        console.log("Levels data cleared");
      });

    this.playAmbientMusic();
  }
}

//Ecrâ dos objetivos
class ObjectiveScene extends BaseScene {
  constructor() {
    super("ObjectiveScene");
  }

  create() {
    this.input.keyboard.enabled = false;
    this.input.mouse.enabled = true;

    //Texto do objetivo do jogo
    this.createBackground("bgInit", true);
    const { x: centerX, y: topY } = calculatePosition(400, 100);
    this.add
      .text(centerX, topY, "Objetivo", this.applyFontStyle("32px"))
      .setOrigin(0.5);

    const objectives = [
      "Apanha energias renováveis",
      "para restaurar o meio ambiente.",
      "Desvia-te dos obstáculos",
      "para não perder energia.",
      "Completa a meta de energia",
      "antes que o tempo acabe!",
    ];

    objectives.forEach((objective, index) => {
      const { x, y } = calculatePosition(400, 200 + index * 40);
      this.add
        .text(x, y, objective, this.applyFontStyle("20px"))
        .setOrigin(0.5);
    });

    this.createBackButton("StartScene");
    this.playAmbientMusic();
  }
}

//Ecrâ dos controlos do jogo
class ControlosScene extends BaseScene {
  constructor() {
    super("ControlsScene");
  }

  create() {
    this.input.keyboard.enabled = false;
    this.input.mouse.enabled = true;

    //Texto dos controlos do jogo
    this.createBackground("bgInit", true);
    const { x: centerX, y: topY } = calculatePosition(400, 100);
    this.add
      .text(centerX, topY, "Controlos", this.applyFontStyle("32px"))
      .setOrigin(0.5);

    const controls = [
      { text: "Movimentação:", x: 400, y: 200 },
      { text: "← - Esquerda", x: 200, y: 260 },
      { text: "→ - Direita", x: 600, y: 260 },
      { text: "↑ - Cima", x: 200, y: 330 },
      { text: "↓ - Baixo", x: 600, y: 330 },
      { text: "Ações:", x: 400, y: 380 },
      { text: "Click - Atacar", x: 400, y: 440 },
    ];

    controls.forEach((control) => {
      const { x, y } = calculatePosition(control.x, control.y);
      this.add
        .text(x, y, control.text, this.applyFontStyle("21px"))
        .setOrigin(0.5);
    });

    this.createBackButton("StartScene");
    this.playAmbientMusic();
  }
}

//Ecrâ da escolha da dificuldade do jogo
class DifficultySelectScene extends BaseScene {
  constructor() {
    super("DifficultySelectScene");
  }

  create() {
    this.input.keyboard.enabled = false;
    this.input.mouse.enabled = true;

    //Texto do ecrâ
    this.createBackground("bgInit", true);
    const { x: centerX, y: topY } = calculatePosition(400, 100);
    this.add
      .text(
        centerX,
        topY,
        "Selecionar Dificuldade",
        this.applyFontStyle("32px")
      )
      .setOrigin(0.5);

    //Texto das Diferentes dificuldades do jogo
    const difficulties = ["Fácil", "Médio", "Difícil"];
    this.difficulties = difficulties.map((level, index) => {
      const { x, y } = calculatePosition(400, 250 + index * 50);
      return {
        name: level,
        button: this.add
          .text(x, y, level, this.applyFontStyle())
          .setOrigin(0.5)
          .setInteractive(),
      };
    });

    this.difficulties.forEach((difficulty) => {
      difficulty.button.on("pointerdown", () =>
        this.selectDifficulty(difficulty.name)
      );
    });

    //Ir buscar dificuldade escolhida anteriormente, ou Médio se não tiver jogado antes
    this.selectedDifficulty =
      localStorage.getItem("selectedDifficulty") || "Médio";
    this.updateDifficultyVisuals();

    this.createBackButton("StartScene");
    this.playAmbientMusic();
  }

  //Selecionar a dficuldade desejada
  selectDifficulty(difficulty) {
    this.selectedDifficulty = difficulty;
    localStorage.setItem("selectedDifficulty", difficulty);
    this.updateDifficultyVisuals();
  }

  //Mudar dificuldade selecionada de cor, para distinção
  updateDifficultyVisuals() {
    this.difficulties.forEach((difficulty) => {
      const color =
        difficulty.name === this.selectedDifficulty ? "#ff0000" : "#ffffff";
      difficulty.button.setStyle(this.applyFontStyle("24px", color));
    });
  }
}

//Ecrâ de opções extra do jogo
class OptionsSelectScene extends BaseScene {
  constructor() {
    super("OptionsSelectScene");
  }

  create() {
    this.input.keyboard.enabled = false;
    this.input.mouse.enabled = true;

    //Texto das opções do jogo
    this.createBackground("bgInit", true);
    this.add
      .text(400, 100, "Opções", this.applyFontStyle("32px"))
      .setOrigin(0.5);

    // Slider para o volume da música (apenas a de níveis do jogo)
    this.add
      .text(400, 190, "Música", this.applyFontStyle("24px"))
      .setOrigin(0.5);
    this.musicVolume = parseFloat(localStorage.getItem("musicVolume")) || 0.5;
    this.musicSlider = this.createSlider(
      400,
      240,
      this.musicVolume,
      (value) => {
        this.musicVolume = value;
        localStorage.setItem("musicVolume", value);
        // Update only level music volumes
        ["level1-song", "level2-song", "level3-song", "level4-song"].forEach(
          (key) => {
            const music = this.sound.get(key);
            if (music) {
              music.setVolume(value);
            }
          }
        );
      }
    );

    // Slider para sound effects do jogo
    this.add
      .text(400, 290, "Efeitos Sonoros", this.applyFontStyle("24px"))
      .setOrigin(0.5);
    this.sfxVolume = parseFloat(localStorage.getItem("sfxVolume")) || 0.5;
    this.sfxSlider = this.createSlider(400, 340, this.sfxVolume, (value) => {
      this.sfxVolume = value;
      localStorage.setItem("sfxVolume", value);
      ["shootSound", "collect", "complete", "dead"].forEach((key) => {
        const sfx = this.sound.get(key);
        if (sfx) {
          sfx.setVolume(value);
        }
      });
    });

    // Slider para apenas a música ambiente
    this.add
      .text(400, 390, "Som Ambiente", this.applyFontStyle("24px"))
      .setOrigin(0.5);
    this.ambientVolume =
      parseFloat(localStorage.getItem("ambientVolume")) || 0.5;
    this.ambientSlider = this.createSlider(
      400,
      440,
      this.ambientVolume,
      (value) => {
        this.ambientVolume = value;
        localStorage.setItem("ambientVolume", value);
        const ambientMusic = this.sound.get("ambient");
        if (ambientMusic) {
          ambientMusic.setVolume(value);
        }
      }
    );

    //Setup booleano para o uso ou não do JoyStick
    const joystickState = localStorage.getItem("joystick") === "true";
    const joystickText = joystickState ? "Joystick [X]" : "Joystick [ ]";

    this.joystick = this.add
      .text(400, 490, joystickText, this.applyFontStyle("24px"))
      .setOrigin(0.5)
      .setInteractive();

    this.joystick.on("pointerdown", () => {
      if (this.joystick.text === "Joystick [ ]") {
        this.joystick.setText("Joystick [X]");
        localStorage.setItem("joystick", "true");
      } else {
        this.joystick.setText("Joystick [ ]");
        localStorage.setItem("joystick", "false");
      }
    });

    this.createBackButton("StartScene");
    this.playAmbientMusic();
  }

  //Método de criação do slider, feito para o código não ser repetido
  createSlider(x, y, initialValue, onUpdate) {
    const width = 200;
    const height = 20;
    const bar = this.add
      .rectangle(x, y, width, height, 0x888888)
      .setOrigin(0.5);
    const slider = this.add
      .rectangle(x + width * initialValue - width / 2, y, 20, 30, 0xffffff)
      .setInteractive();

    this.input.setDraggable(slider);

    slider.on("drag", (pointer, dragX) => {
      const newX = Phaser.Math.Clamp(dragX, x - width / 2, x + width / 2);
      slider.x = newX;
      const value = (newX - (x - width / 2)) / width;
      onUpdate(value);
    });

    return { bar, slider };
  }
}

//Ecrâ de seleção de níveis
class LevelSelectScene extends BaseScene {
  constructor() {
    super("LevelSelectScene");
  }

  create() {
    this.input.keyboard.enabled = false;
    this.input.mouse.enabled = true;

    //Adição do background do ecrâ, e uma tint no mesmo
    this.createBackground("background");
    const darkTint = this.add
      .rectangle(0, 0, game.config.width, game.config.height, 0x000000, 0.6)
      .setOrigin(0);
    const { x: centerX, y: topY } = calculatePosition(400, 100);
    this.add
      .text(centerX, topY, "Selecionar Nível", this.applyFontStyle("32px"))
      .setOrigin(0.5);

    //Load dos níveis do localstorage, ou usar o default se não existirem
    this.levels = JSON.parse(localStorage.getItem("levels")) || [
      { name: "Nível 1", unlocked: true, energyGoal: 150, x: 180, y: 460 },
      { name: "Nível 2", unlocked: false, energyGoal: 150, x: 385, y: 210 },
      { name: "Nível 3", unlocked: false, energyGoal: 200, x: 460, y: 495 },
      { name: "Nível 4", unlocked: false, energyGoal: 200, x: 650, y: 250 },
    ];

    //Diferentes cores se o mesmo estiver bloqueado ou não
    this.levels.forEach((level, index) => {
      const color = level.unlocked ? "#ffffff" : "#ff0000";
      const { x, y } = calculatePosition(level.x, level.y);
      const levelButton = this.add
        .text(x, y, level.name, this.applyFontStyle("24px", color))
        .setOrigin(0.5);

      //Deixá-lo interativo se o mesmo estiver desbloqueado
      if (level.unlocked) {
        levelButton.setInteractive();
        levelButton.on("pointerdown", () =>
          this.startLevel(index + 1, level.energyGoal)
        );
      }
    });

    this.createBackButton("StartScene");
    this.playAmbientMusic();
  }

  //Começar o nível correspondente
  startLevel(level, energyGoal) {
    const difficulty = this.scene.get(
      "DifficultySelectScene"
    ).selectedDifficulty;
    this.sound.stopAll();
    this.scene.start("GameScene", { level, difficulty, energyGoal });
  }
}

//O próprio jogo
class GameScene extends BaseScene {
  constructor() {
    super("GameScene");
    //Inicialização das origens das animações
    this.animationOrigins = {
      walk: { x: 0.6, y: 0.4 },
      idle: { x: 0.5, y: 0.5 },
      attack: { x: 0.5, y: 0.5 },
      dead: { x: 0.5, y: 0.2 },
    };
    this.lastFireballTime = 0;
    this.fireballDelay = 500; //0.5 seconds
  }

  //Método de criação do jogo
  create(data) {
    this.input.keyboard.enabled = true;
    this.input.mouse.enabled = true;

    //Diferentes Variáveis
    const { level, difficulty, energyGoal } = data;
    this.currentLevel = level;

    //Setup do Background
    const bg = this.add.image(
      game.config.width / 2,
      game.config.height / 2,
      `level${level}`
    );

    //Escala do background dependendo do nível
    if (level === 4) {
      bg.setScale(2);
    } else {
      const scaleX = this.cameras.main.width / bg.width;
      const scaleY = this.cameras.main.height / bg.height;
      const scale = Math.max(scaleX, scaleY);
      bg.setScale(scale);
    }

    bg.setScrollFactor(0);

    //Setup do jogador (player)
    const { x: playerX, y: playerY } = calculatePosition(400, 300);
    this.player = this.physics.add.sprite(playerX, playerY, "player1");
    this.player.setCollideWorldBounds(true);

    //Setup do tamanho do jogador
    const playerWidth = 40 * (game.config.width / 800);
    const playerHeight = 120 * (game.config.height / 600);
    this.player.body.setSize(playerWidth, playerHeight);
    this.player.body.setOffset(
      (this.player.width - playerWidth) / 2,
      (this.player.height - playerHeight) / 2
    );

    //Iniciar o estado do player
    this.playerState = "idle";
    this.player.anims.play("idle", true);
    this.updatePlayerOrigin();

    //Iniciar o jogo
    this.score = 0;
    this.energy = 0;
    this.energyGoal = energyGoal;
    this.timeLimit = 60;
    this.lives = 3;
    this.isGameOver = false;
    this.isPaused = false;
    this.isMoving = false;

    //Setup dos cursor keys
    this.cursors = this.input.keyboard.createCursorKeys();
    this.input.on("pointerdown", this.shootFireball, this);

    //Setup do grupo de objetos
    this.obstacles = this.physics.add.group({
      allowGravity: false,
      immovable: true,
    });

    this.physics.add.overlap(
      this.player,
      this.obstacles,
      this.handleCollision,
      null,
      this
    );

    //Setup do grupo de painéis solares
    this.solarPanels = this.physics.add.group({
      allowGravity: false,
      immovable: true,
    });

    //Setup do grupo de objetos
    this.physics.add.overlap(
      this.player,
      this.solarPanels,
      this.collectSolarPanel,
      null,
      this
    );

    //Resto do setup do jogo
    this.createUI(level);
    this.initGame(difficulty);
    this.setupPauseMenu();
    this.setupAudio(level);
    this.joyStickSetup();

    //Iniciar o spawn de painéis solares
    this.time.addEvent({
      delay: 8500, //8.5 segundos
      callback: this.spawnSolarPanel,
      callbackScope: this,
      loop: true,
    });
  }

  //Update da origin do jogador, feito para debug dos spritesheets
  updatePlayerOrigin() {
    const origin = this.animationOrigins[this.playerState];
    if (origin) {
      this.player.setOrigin(origin.x, origin.y);
    }
  }

  //Setup para o Joystick
  joyStickSetup() {
    const joystickState = localStorage.getItem("joystick") === "true";

    //Criar o joystick se o mesmo estiver enabled
    if (joystickState) {
      const { x: joystickX, y: joystickY } = calculatePosition(100, 500);
      const joystickRadius =
        Math.min(game.config.width, game.config.height) * 0.08;
      this.joyStick = this.plugins.get("rexvirtualjoystickplugin").add(this, {
        x: joystickX,
        y: joystickY,
        radius: joystickRadius,
        base: this.add.circle(0, 0, joystickRadius, 0x888888),
        thumb: this.add.circle(0, 0, joystickRadius * 0.6, 0xcccccc),
      });

      //Criar as keys do joystick
      this.joyStickCursorKeys = this.joyStick.createCursorKeys();
    }
  }

  //Setup do áudio
  setupAudio(level) {
    const musicVolume = parseFloat(localStorage.getItem("musicVolume")) || 0.5;

    //Debugger para se o nível não estiver definido (bug fix)
    if (level !== undefined) {
      this.levelMusic = this.sound.add(`level${level}-song`, {
        loop: true,
        volume: musicVolume,
      });
      this.levelMusic.play();
    } else {
      console.warn("Nível indefinido.");
    }

    //Mudança do volume dependendo das options do user
    const sfxVolume = parseFloat(localStorage.getItem("sfxVolume")) || 0.5;
    this.shootSound = this.sound.add("shootSound", { volume: sfxVolume });
    this.deadSound = this.sound.add("dead", { volume: sfxVolume });

    //Adicionar sons do painel solar
    this.solarAppearSound = this.sound.add("solar_appear", {
      volume: sfxVolume,
    });
    this.solarDisappearSound = this.sound.add("solar_disappear", {
      volume: sfxVolume,
    });
    this.solarCollectSound = this.sound.add("solar_collect", {
      volume: sfxVolume,
    });

    //Adicionar sons do menu de pausa
    this.openPauseMenuSound = this.sound.add("openPauseMenu", {
      volume: sfxVolume,
    });
    this.closePauseMenuSound = this.sound.add("closePauseMenu", {
      volume: sfxVolume,
    });
  }

  //Menu de pausa
  setupPauseMenu() {
    this.pauseMenu = this.add.container(
      game.config.width / 2,
      game.config.height / 2
    );
    this.pauseMenu.add(
      this.add.rectangle(
        0,
        0,
        game.config.width,
        game.config.height,
        0x000000,
        1
      )
    );
    this.pauseMenu.add(
      this.add
        .text(
          0,
          -game.config.height * 0.12,
          "PAUSADO",
          this.applyFontStyle("32px")
        )
        .setOrigin(0.5)
    );
    this.pauseMenu.add(
      this.add
        .text(0, 0, "ESC - Voltar", this.applyFontStyle("24px"))
        .setOrigin(0.5)
    );
    this.pauseMenu.add(
      this.add
        .text(
          0,
          game.config.height * 0.1,
          "S - Sair",
          this.applyFontStyle("24px")
        )
        .setOrigin(0.5)
    );
    this.pauseMenu.setDepth(1000);
    this.pauseMenu.setVisible(false);

    //ESC para voltar ao jogo, S para voltar á escolha de níveis
    this.input.keyboard.on("keydown-ESC", this.togglePause, this);
    this.input.keyboard.on("keydown-S", this.quitToLevelSelect, this);
  }

  //Utilizado para parar música e etcs quando o pause menu está na screen
  togglePause() {
    this.isPaused = !this.isPaused;
    if (this.isPaused) {
      this.pauseMenu.setVisible(true);
      this.physics.pause();
      this.levelMusic.pause();
      this.smokeEvent.paused = true;
      this.timerEvent.paused = true;
      this.openPauseMenuSound.play();
    } else {
      this.pauseMenu.setVisible(false);
      this.physics.resume();
      this.levelMusic.resume();
      this.smokeEvent.paused = false;
      this.timerEvent.paused = false;
      this.closePauseMenuSound.play();
    }
  }

  //Caso o user carrege no S
  quitToLevelSelect() {
    if (this.isPaused) {
      this.levelMusic.stop();
      this.scene.start("LevelSelectScene");
    }
  }

  //Esqueleto da UI que está no jogo, a mesma leva update a cada segundo
  createUI(level) {
    let fillColor = "#ffffff";

    if (level === 2) {
      fillColor = "#000000";
    }

    const fontStyle = this.applyFontStyle("24px", fillColor);
    const { x: scoreX, y: scoreY } = calculatePosition(16, 16);
    this.scoreText = this.add.text(scoreX, scoreY, "Pontuação: 0", fontStyle);
    const { x: livesX, y: livesY } = calculatePosition(16, 50);
    this.livesText = this.add.text(livesX, livesY, "Vidas: 3", fontStyle);
    const { x: timeX, y: timeY } = calculatePosition(580, 16);
    this.timeText = this.add.text(timeX, timeY, "Tempo: 60", fontStyle);
    const { x: pauseX, y: pauseY } = calculatePosition(16, 574);
    this.add.text(
      pauseX,
      pauseY,
      "ESC para Pausar",
      this.applyFontStyle("15px", fillColor)
    );

    //Barra de progresso do jogador no nível
    this.progressBar = this.add.graphics();
    this.progressBar.fillStyle(0x00ff00, 1);

    this.updateProgressBar();
  }

  //Iniciar o jogo com valores diferentes dependendo da dificuldade
  initGame(difficulty) {
    switch (difficulty) {
      case "Fácil":
        this.obstacleSpeed = game.config.width * 0.25;
        this.obstacleSpawnRate = 1000;
        break;
      case "Difícil":
        this.obstacleSpeed = game.config.width * 0.4375;
        this.obstacleSpawnRate = 300;
        break;
      default: //Médio
        this.obstacleSpeed = game.config.width * 0.3125;
        this.obstacleSpawnRate = 700;
    }

    //Tempo do jogo
    this.timerEvent = this.time.addEvent({
      delay: 1000,
      callback: this.updateTimer,
      callbackScope: this,
      loop: true,
    });

    //Spawn dos obstáculos
    this.smokeEvent = this.time.addEvent({
      delay: this.obstacleSpawnRate,
      callback: this.spawnSmoke,
      callbackScope: this,
      loop: true,
    });
  }

  //Método de spawn dos obstáculos
  spawnSmoke() {
    //Não fazer nada se o jogo estiver pausado
    if (this.isPaused) return;

    //Criaão do Obstáculo
    const smoke = this.obstacles.create(
      game.config.width,
      Phaser.Math.Between(game.config.height * 0.17, game.config.height * 0.83),
      "smoke"
    );
    smoke.setScale(0.2 * (game.config.width / 800));

    //Hitbox do mesmo
    const smokeWidth = 60 * (game.config.width / 800);
    const smokeHeight = 70 * (game.config.height / 600);
    smoke.body.setSize(smokeWidth, smokeHeight);
    smoke.body.setOffset(
      (smoke.width * smoke.scale - smokeWidth) / 2,
      (smoke.height * smoke.scale - smokeHeight) / 2 + 5
    );

    //Mudança de velocidade dependendo do estado do jogo e dificuldade
    smoke.setVelocityX(-this.obstacleSpeed);
    smoke.setImmovable(true);
    smoke.play("smoke");
  }

  //Método para spawnar painéis solares
  spawnSolarPanel() {
    if (this.isPaused) return;

    const x = Phaser.Math.Between(
      game.config.width * 0.125,
      game.config.width * 0.875
    );
    const y = Phaser.Math.Between(
      game.config.height * 0.167,
      game.config.height * 0.833
    );
    const solarPanel = this.solarPanels.create(x, y, "solar");
    solarPanel.setScale(1.2 * (game.config.width / 800));

    this.solarAppearSound.play();

    //Remover o painel solar após 4 segundos se não for apanhado
    this.time.delayedCall(4000, () => {
      if (solarPanel.active) {
        solarPanel.destroy();
        this.solarDisappearSound.play();
      }
    });
  }

  //Método para apanhar painéis solares
  collectSolarPanel(player, solarPanel) {
    solarPanel.destroy();
    this.solarCollectSound.play();
    this.score += 15;
    this.energy += 15;
    this.scoreText.setText(`Pontuação: ${this.score}`);
    this.updateProgressBar();
    if (this.energy >= this.energyGoal) this.completeLevel();
  }

  //Fireball lançada depois do ataque do jogador
  shootFireball(pointer) {
    //Ifs diferentes para não poder disparar
    if (this.isPaused || this.isGameOver || this.isMoving) return;

    const currentTime = this.time.now;
    if (currentTime - this.lastFireballTime < this.fireballDelay) {
      return; //Não disparar se o delay não tiver passado
    }

    //Segundo if para não poder disparar se o jogador estiver a andar
    if (this.playerState != "walk") {
      //"Angular" o spritesheet dependendo da posição do mouse e do player
      const angle = Phaser.Math.Angle.Between(
        this.player.x,
        this.player.y,
        pointer.x,
        pointer.y
      );

      const fireball = this.physics.add
        .sprite(this.player.x, this.player.y, "fireball")
        .setScale(0.5 * (game.config.width / 800));
      fireball.setRotation(angle);
      fireball.play("fireball");
      this.physics.moveTo(
        fireball,
        pointer.x,
        pointer.y,
        game.config.width * 0.75
      );

      //Se houver colisão entre fireball e obstáculo, ambos desaparecem
      this.physics.add.collider(fireball, this.obstacles, (f, obstacle) => {
        this.sound.play("collect");
        obstacle.destroy();
        f.destroy();
        this.updateScore();
      });

      this.player.anims.play("attack", true);
      this.updatePlayerOrigin();

      //Animação de ataque acaba e volta a idle
      this.player.once("animationcomplete", (animation) => {
        if (animation.key === "attack") {
          this.player.anims.play("idle", true);
          this.updatePlayerOrigin();
        }
      });

      this.shootSound.play({ volume: this.sound.volume });

      this.lastFireballTime = currentTime;
    }
  }

  //Update do score a cada obstáculo destruído
  updateScore() {
    this.score += 10;
    this.energy += 10;
    this.scoreText.setText(`Pontuação: ${this.score}`);
    this.updateProgressBar();
    if (this.energy >= this.energyGoal) this.completeLevel();
  }

  //Update da progress bar a cada obstáculo destruído
  updateProgressBar() {
    const progress = (this.energy / this.energyGoal) * game.config.width * 0.75;
    this.progressBar.clear();
    this.progressBar.fillStyle(0x00ff00, 1);
    const { x, y } = calculatePosition(100, 550);
    this.progressBar.fillRect(x, y, progress, game.config.height * 0.033);
  }

  //Update do timer, se não estiver com o jogo em pausa
  updateTimer() {
    if (this.isPaused) return;
    if (this.timeLimit > 0) {
      this.timeLimit--;
      this.timeText.setText(`Tempo: ${this.timeLimit}`);
      if (this.timeLimit <= 0) this.gameOver();
    }
  }

  //Colisão entre player e obstáculo
  handleCollision(player, obstacle) {
    if (!obstacle.active || this.isGameOver) return;

    //-1 vida
    obstacle.destroy();
    this.lives--;
    this.livesText.setText(`Vidas: ${this.lives}`);

    //Se houver mais que 0 vidas
    if (this.lives > 0) {
      this.deadSound.play();
      this.player.setTint(0xff0000);
      this.time.delayedCall(200, () => {
        this.player.clearTint();
      });
    }

    //Se não houverem vidas (o jogo acaba)
    if (this.lives <= 0) {
      this.deadSound.play();
      this.gameOver();
    }
  }

  //Acabar o nível se a progress bar chegar ao fim
  completeLevel() {
    this.sound.play("complete");
    this.player.play("idle");
    this.timerEvent.remove();
    this.smokeEvent.remove();
    this.levelMusic.stop();
    this.scene.start("LevelCompleteScene", {
      score: this.score,
      level: this.scene.settings.data.level,
    });
  }

  //Acabar o nível se não houverem mais vidas
  gameOver() {
    this.isGameOver = true;
    this.timerEvent.remove();
    this.smokeEvent.remove();
    this.physics.pause();
    this.levelMusic.stop();

    //Deixar de poder mover o player
    this.input.keyboard.enabled = false;
    this.input.mouse.enabled = false;

    this.playerState = "dead";
    this.player.anims.play("dead");
    this.updatePlayerOrigin();

    //Play da animação e mudança de scene
    this.player.on("animationcomplete", (animation) => {
      if (animation.key === "dead") {
        this.time.delayedCall(400, () => {
          this.scene.start("GameOverScene", {
            score: this.score,
            level: this.currentLevel,
            difficulty: this.scene.settings.data.difficulty,
            energyGoal: this.scene.settings.data.energyGoal,
          });
        });
      }
    });
  }

  //Update da movimentação do player
  update() {
    if (this.isPaused || this.isGameOver) {
      this.player.setVelocity(0);
      return;
    }

    const speed = game.config.width * 0.2;
    let newState = "idle";
    this.isMoving = false;

    //Movimentação para teclado
    //Esquerda
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-speed);
      this.player.flipX = true;
      newState = "walk";
      this.isMoving = true;
      //Direita
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(speed);
      this.player.flipX = false;
      newState = "walk";
      this.isMoving = true;
    } else {
      this.player.setVelocityX(0);
    }

    //Cima
    if (this.cursors.up.isDown) {
      this.player.setVelocityY(-speed);
      newState = "walk";
      this.isMoving = true;
      //Baixo
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityY(speed);
      newState = "walk";
      this.isMoving = true;
    } else {
      this.player.setVelocityY(0);
    }

    //Para o joystick
    if (this.joyStickCursorKeys) {
      //Esquerda
      if (this.joyStickCursorKeys.left.isDown) {
        this.player.setVelocityX(-speed);
        this.player.flipX = true;
        newState = "walk";
        this.isMoving = true;
        //Direita
      } else if (this.joyStickCursorKeys.right.isDown) {
        this.player.setVelocityX(speed);
        this.player.flipX = false;
        newState = "walk";
        this.isMoving = true;
      }

      //Cima
      if (this.joyStickCursorKeys.up.isDown) {
        this.player.setVelocityY(-speed);
        newState = "walk";
        this.isMoving = true;
        //Baixo
      } else if (this.joyStickCursorKeys.down.isDown) {
        this.player.setVelocityY(speed);
        newState = "walk";
        this.isMoving = true;
      }
    }

    //Update da animação do player (do seu estado)
    if (
      newState !== this.playerState ||
      (newState === "idle" && !this.player.anims.isPlaying)
    ) {
      this.playerState = newState;
      this.player.anims.play(this.playerState, true);
      this.updatePlayerOrigin();

      //Adicionar o listener da animação completa
      this.player.once("animationcomplete", (animation) => {
        if (animation.key === "walk") {
          this.playerState = "idle";
          this.player.anims.play("idle", true);
          this.updatePlayerOrigin();
        }
      });
    }
  }
}

//Ecrâ do nível concluído
class LevelCompleteScene extends BaseScene {
  constructor() {
    super("LevelCompleteScene");
  }

  create(data) {
    this.input.keyboard.enabled = false;
    this.input.mouse.enabled = true;

    //Texto do ecrâ
    this.createBackground("bgInit", true);
    const { x: centerX, y: topY } = calculatePosition(400, 100);
    this.add
      .text(centerX, topY, "Nível Concluído!", this.applyFontStyle("32px"))
      .setOrigin(0.5);

    const { x: scoreX, y: scoreY } = calculatePosition(400, 200);
    this.add
      .text(
        scoreX,
        scoreY,
        `Pontuação: ${data.score}`,
        this.applyFontStyle("24px")
      )
      .setOrigin(0.5);

    //Etcs dependendo do nível
    let levels = JSON.parse(localStorage.getItem("levels")) || [
      { name: "Nível 1", unlocked: true, energyGoal: 150, x: 180, y: 460 },
      { name: "Nível 2", unlocked: false, energyGoal: 150, x: 385, y: 210 },
      { name: "Nível 3", unlocked: false, energyGoal: 200, x: 460, y: 495 },
      { name: "Nível 4", unlocked: false, energyGoal: 200, x: 650, y: 250 },
    ];

    //Dar unlock do nível 1 ao 3
    if (data.level < levels.length) {
      levels[data.level].unlocked = true;
      localStorage.setItem("levels", JSON.stringify(levels));
    }

    //No nível 4 não pode dar mais unlock a nada
    if (data.level < 4) {
      const { x: nextLevelX, y: nextLevelY } = calculatePosition(400, 300);
      const nextLevelButton = this.add
        .text(nextLevelX, nextLevelY, "Próximo Nível", this.applyFontStyle())
        .setOrigin(0.5)
        .setInteractive();
      nextLevelButton.on("pointerdown", () => {
        this.sound.stopAll();
        this.scene.start("GameScene", {
          level: data.level + 1,
          difficulty: this.scene.get("DifficultySelectScene")
            .selectedDifficulty,
          energyGoal: (data.level + 1) * 50,
        });
      });
    }

    //Texto custom para o fim do jogo
    if (data.level === 4) {
      const { x: congratsX, y: congratsY } = calculatePosition(400, 300);
      this.add
        .text(
          congratsX,
          congratsY,
          "Parabéns! Concluíste o Jogo!",
          this.applyFontStyle("24px")
        )
        .setOrigin(0.5);
    }

    //Botão para voltar para a escolha de níveis
    const { x: backX, y: backY } = calculatePosition(400, 350);
    const backtoLevelsButton = this.add
      .text(backX, backY, "Seleção de Níveis", this.applyFontStyle())
      .setOrigin(0.5)
      .setInteractive();
    backtoLevelsButton.on("pointerdown", () =>
      this.scene.start("LevelSelectScene")
    );

    this.createBackButton("StartScene");

    this.playAmbientMusic();
  }
}

class GameOverScene extends BaseScene {
  constructor() {
    super("GameOverScene");
  }

  create(data) {
    this.input.keyboard.enabled = false;
    this.input.mouse.enabled = true;

    //Texto do ecrâ
    this.createBackground("bgInit", true);
    const { x: centerX, y: topY } = calculatePosition(400, 100);
    this.add
      .text(centerX, topY, "Game Over!", this.applyFontStyle("32px"))
      .setOrigin(0.5);

    const { x: scoreX, y: scoreY } = calculatePosition(400, 200);
    this.add
      .text(
        scoreX,
        scoreY,
        `Pontuação: ${data.score}`,
        this.applyFontStyle("24px")
      )
      .setOrigin(0.5);

    //Botão de restart o nível que acabou de jogar
    const { x: restartX, y: restartY } = calculatePosition(400, 300);
    const restartButton = this.add
      .text(restartX, restartY, "Reiniciar", this.applyFontStyle())
      .setOrigin(0.5)
      .setInteractive();
    restartButton.on("pointerdown", () => {
      this.sound.stopAll();
      this.scene.start("GameScene", {
        level: data.level,
        difficulty: data.difficulty,
        energyGoal: data.energyGoal,
      });
    });

    //Botão para voltar para a escolha de níveis
    const { x: backX, y: backY } = calculatePosition(400, 350);
    const backtoLevelsButton = this.add
      .text(backX, backY, "Seleção de Níveis", this.applyFontStyle())
      .setOrigin(0.5)
      .setInteractive();
    backtoLevelsButton.on("pointerdown", () =>
      this.scene.start("LevelSelectScene")
    );

    this.createBackButton("StartScene");
    this.playAmbientMusic();
  }
}

// Configuração dos níveis, da janela do jogo, físicas e etcs
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: "game-container",
  backgroundColor: "#1d1d1d",
  scale: {
    mode: Phaser.Scale.RESIZE,
    parent: "game-container",
    width: 800,
    height: 600,
    min: {
      width: 300,
      height: 225,
    },
    max: {
      width: 800,
      height: 600,
    },
    autoRound: true,
  },
  scene: [
    PreloadScene,
    StartScene,
    ObjectiveScene,
    ControlosScene,
    DifficultySelectScene,
    OptionsSelectScene,
    LevelSelectScene,
    GameScene,
    LevelCompleteScene,
    GameOverScene,
  ],
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
  plugins: { global: [{}] },
};

const game = new Phaser.Game(config);

// Função auxiliar para calcular o tamanho da fonte responsiva
function calculateFontSize(baseSize) {
  // Obter o tamanho real do canvas
  const canvas = game.canvas;
  const scaleFactor = Math.min(canvas.width / 800, canvas.height / 600);
  return Math.floor(baseSize * scaleFactor);
}

// Função auxiliar para calcular as posições responsivas
function calculatePosition(x, y) {
  const canvas = game.canvas;
  const scaleX = canvas.width / 800;
  const scaleY = canvas.height / 600;
  return {
    x: x * scaleX,
    y: y * scaleY,
  };
}

// Função para atualizar o tamanho do jogo
function updateGameSize() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const aspectRatio = 800 / 600;

  let newWidth, newHeight;

  if (width / height > aspectRatio) {
    newHeight = height;
    newWidth = height * aspectRatio;
  } else {
    newWidth = width;
    newHeight = width / aspectRatio;
  }

  game.scale.resize(newWidth, newHeight);

  // Atualizar posições e tamanhos de fonte em todas as cenas ativas
  game.scene.scenes.forEach((scene) => {
    if (scene.sys.settings.active) {
      scene.children.list.forEach((child) => {
        if (child.type === "Text") {
          const originalFontSize = parseInt(child.style.fontSize);
          child.setFontSize(calculateFontSize(originalFontSize));
        }
        const { x, y } = calculatePosition(child.x, child.y);
        child.setPosition(x, y);
      });
    }
  });
}

// Adicionar listener para mudanças de orientação
window.addEventListener("orientationchange", () => {
  // Pequeno atraso para garantir que as dimensões da janela foram atualizadas
  setTimeout(updateGameSize, 100);
});

// Adicionar listener para redimensionamento da janela
window.addEventListener("resize", updateGameSize);

// Chamar updateGameSize inicialmente para configurar o tamanho correto
updateGameSize();

// Adicionar CSS para garantir que o contêiner do jogo seja responsivo
const style = document.createElement("style");
style.textContent = `
  #game-container {
    width: 100%;
    height: 100vh;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  canvas {
    max-width: 100%;
    max-height: 100vh;
    object-fit: contain;
  }
`;
document.head.appendChild(style);
