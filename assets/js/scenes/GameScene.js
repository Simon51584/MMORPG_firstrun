class GameScene extends Phaser.Scene {
    constructor() {
        super("Game");

    }

    init() {
        this.scene.launch("Ui");
        this.score = 0;
    }

    create() {
        this.createMap();
        this.createAudio();
        this.createChests();
        // this.createWalls();
        this.createInput();
        
        this.createGameManager();

    }

    update() {
        //important to call update method
        
        if(this.player) this.player.update(this.cursors);
    }

    createAudio() {
        this.goldPickupAudio = this.sound.add("goldSound", { loop: false, volume: 0.2 });
    }

    createPlayer(location) {
        this.player = new Player(this, location[0] * 2, location[1] * 2, "characters", 5);
    }

    createChests() {
        // create a chest group
        this.chests = this.physics.add.group();
        // create chest positions array
        this.chestPositions = [[100, 100], [200, 200], [300, 300], [400, 400], [500, 500]];
        // specify the max number of chests we can have
        this.maxNumberOfChests = 3;
        for (let i = 0; i < this.maxNumberOfChests; i += 1) {
            this.spawnChest();

        }
    }

    spawnChest() {
        const location = this.chestPositions[Math.floor(Math.random() * this.chestPositions.length)]
        
        let chest = this.chests.getFirstDead();
        if (!chest) {
            const chest = new Chest(this, location[0], location[1], "items", 0);
            // add chest to chests group
            this.chests.add(chest);
        
        } else {
            chest.setPosition(location[0], location[1]);
            chest.makeActive();
        }
    }
    
    // createWalls() {
    //     this.wall = this.physics.add.image(500, 100, "button1");
    //     this.wall.setImmovable();         
    // }

    createInput() {
        this.cursors = this.input.keyboard.createCursorKeys()
    }

    addCollisions() {
        // check for collisions betrween the player and the blocked layer
        this.physics.add.collider(this.player, this.map.blockedLayer);
        // check for overlapbs between player and chest ghame objects
        this.physics.add.overlap(this.player, this.chests, this.collectChest, null, this);
    }

    collectChest(player, chest){
        // play gold pickup sound
        this.goldPickupAudio.play();
        // update our score
        this.score += chest.coins;
        // update score in the ui 
        this.events.emit("updateScore", this.score);
        // make chest game objectinactive
        chest.makeInactive();
        // spawn a new chest
        this.time.delayedCall(1000, this.spawnChest(), [], this);
    }
    
    createMap() {
        // create map
        this.map = new Map(this, "map", "background", "background", "blocked")
    }

    createGameManager() {
        this.events.on("spawnPlayer", (location) => {
            this.createPlayer(location);
            this.addCollisions(location);
        });

        this.gameManager = new GameManager(this, this.map.map.objects);
        this.gameManager.setup();
    }
}