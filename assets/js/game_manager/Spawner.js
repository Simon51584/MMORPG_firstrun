class Spawner {
    constructor(config, spawnLocations, addObject, deleteObject) {
        this.id = config.id;
        this.spawnInterval = config.spawnInterval;
        this.limit = config.limit;
        this.objectType = config.objectType;
        this.spawnLocations = spawnLocations;
        this.addObject = addObject;
        this.deleteObject = deleteObject;

        this.objectsCreated = [];
        
        this.start();
    }
    start() {
        this.interval = setInterval(() => {
            if (this.objectsCreated < this.limit) {
                this.spawnObject();
            }
        }, this.spawnInterval);
    }
    spawnObject() {
        console.log("spawning object");

    }

    spawnChest() {
    }

    pickRandomLocation() {

    }

    removeObject () {

    }
}


