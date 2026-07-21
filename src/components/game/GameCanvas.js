import { useEffect, useRef, useState } from 'react';
import { giftAssets } from '../../game/assetCatalog';
import { journeyGates, journeyStops, offPathJokes } from '../../game/journeyContent';
import styles from './GameCanvas.module.css';

function GameCanvas({ activeStep, paused, onEncounter, onJoke }) {
    const hostRef = useRef(null);
    const activeStepRef = useRef(activeStep);
    const pausedRef = useRef(paused);
    const onEncounterRef = useRef(onEncounter);
    const onJokeRef = useRef(onJoke);
    const [status, setStatus] = useState('loading');

    useEffect(() => {
        activeStepRef.current = activeStep;
    }, [activeStep]);

    useEffect(() => {
        pausedRef.current = paused;
    }, [paused]);

    useEffect(() => {
        onEncounterRef.current = onEncounter;
    }, [onEncounter]);

    useEffect(() => {
        onJokeRef.current = onJoke;
    }, [onJoke]);

    useEffect(() => {
        let game;
        let cancelled = false;

        async function startGame() {
            try {
                const phaserModule = await import('phaser');
                const Phaser = phaserModule.default || phaserModule;

                if (cancelled || !hostRef.current) return;

                let player;
                let cursors;
                let wasd;
                let checkpointLatchedForStep = null;
                let markers = [];
                let gates = [];
                let jokeZones = [];

                const scene = {
                    preload() {
                        const map = giftAssets.map;
                        const environment = giftAssets.environmentSheet;
                        const character = giftAssets.characterSheet;

                        this.load.tilemapTiledJSON(map.key, map.path);
                        this.load.image(environment.key, environment.path);
                        this.load.spritesheet(character.key, character.path, {
                            frameWidth: character.frameWidth,
                            frameHeight: character.frameHeight,
                            spacing: character.spacing
                        });
                    },

                    create() {
                        const environment = giftAssets.environmentSheet;
                        const map = this.make.tilemap({ key: giftAssets.map.key });
                        const tileset = map.addTilesetImage(
                            environment.tilesetName,
                            environment.key,
                            environment.tileWidth,
                            environment.tileHeight,
                            environment.margin,
                            environment.spacing
                        );

                        this.textures.get(environment.key).setFilter(Phaser.Textures.FilterMode.NEAREST);

                        map.layers.forEach((layerData, index) => {
                            map.createLayer(layerData.name, tileset, 0, 0).setDepth(index);
                        });

                        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
                        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
                        this.cameras.main.setBackgroundColor('#8bcf4c');

                        const obstacles = this.physics.add.staticGroup();
                        const addBlocker = (x, y, width, height) => {
                            const blocker = this.add.rectangle(x, y, width, height, 0x000000, 0);
                            this.physics.add.existing(blocker, true);
                            obstacles.add(blocker);
                        };

                        // The supplied sample map has no collision metadata, so these bodies
                        // trace its pond and buildings while keeping each front door reachable.
                        addBlocker(603, 420, 166, 160);
                        addBlocker(576, 509, 92, 78);
                        addBlocker(473, 575, 112, 88);
                        addBlocker(552, 567, 48, 78);
                        addBlocker(432, 459, 47, 58);
                        addBlocker(772, 458, 52, 70);
                        addBlocker(848, 454, 58, 76);

                        player = this.physics.add.sprite(
                            616,
                            760,
                            giftAssets.characterSheet.key,
                            giftAssets.characterSheet.playerFrame
                        );
                        player.setDepth(20);
                        player.body.setCollideWorldBounds(true);
                        player.body.setSize(11, 13);
                        player.body.setOffset(2.5, 2.5);
                        this.physics.add.collider(player, obstacles);

                        gates = journeyGates.map((gateData, index) => {
                            const gate = this.add.rectangle(
                                gateData.x,
                                gateData.y,
                                gateData.width,
                                gateData.height,
                                0xf1bd4a,
                                0.92
                            );
                            gate.setStrokeStyle(2, 0x6d4937);
                            gate.setDepth(24);
                            this.physics.add.existing(gate, true);
                            this.physics.add.collider(player, gate);

                            const label = this.add.text(gateData.x, gateData.y - 12, String(index + 1), {
                                color: '#fff8df',
                                backgroundColor: '#6d4937',
                                fontFamily: 'system-ui, sans-serif',
                                fontSize: '8px',
                                fontStyle: 'bold',
                                padding: { x: 3, y: 2 }
                            }).setOrigin(0.5).setDepth(25);

                            return { ...gateData, gate, label };
                        });

                        markers = journeyStops.map((stop, index) => {
                            const ring = this.add.circle(stop.x, stop.y, 18, 0xffd166, 0.2);
                            ring.setStrokeStyle(3, 0xffd166, 1);
                            ring.setDepth(30);

                            const question = this.add.text(stop.x, stop.y, '?', {
                                color: '#4b321e',
                                fontFamily: 'Georgia, serif',
                                fontSize: '16px',
                                fontStyle: 'bold'
                            }).setOrigin(0.5).setDepth(31);

                            this.tweens.add({
                                targets: ring,
                                scale: { from: 0.82, to: 1.18 },
                                alpha: { from: 1, to: 0.45 },
                                duration: 850,
                                ease: 'Sine.InOut',
                                yoyo: true,
                                repeat: -1,
                                delay: index * 120
                            });

                            return { ring, question };
                        });

                        const zoneCandidates = [
                            { x: 285, y: 610 },
                            { x: 935, y: 500 },
                            { x: 620, y: 920 },
                            { x: 510, y: 150 },
                            { x: 1010, y: 770 },
                            { x: 265, y: 835 }
                        ];

                        jokeZones = Phaser.Utils.Array.Shuffle(zoneCandidates)
                            .slice(0, 4)
                            .map((zone, index) => ({
                                ...zone,
                                message: Phaser.Utils.Array.GetRandom(offPathJokes),
                                fired: false,
                                index
                            }));

                        cursors = this.input.keyboard.createCursorKeys();
                        wasd = this.input.keyboard.addKeys({
                            up: Phaser.Input.Keyboard.KeyCodes.W,
                            down: Phaser.Input.Keyboard.KeyCodes.S,
                            left: Phaser.Input.Keyboard.KeyCodes.A,
                            right: Phaser.Input.Keyboard.KeyCodes.D
                        });

                        this.cameras.main.startFollow(player, true, 0.14, 0.14);
                        this.cameras.main.setZoom(2.25);
                        this.cameras.main.roundPixels = true;
                        this.cameras.main.fadeIn(550, 13, 33, 63);

                        setStatus('ready');
                    },

                    update() {
                        if (!player?.body) return;

                        const currentStep = activeStepRef.current;

                        markers.forEach(({ ring, question }, index) => {
                            const isCurrent = index === currentStep;
                            ring.setVisible(isCurrent);
                            question.setVisible(isCurrent);
                        });

                        gates.forEach(({ gate, label, unlockAt }) => {
                            const isLocked = currentStep < unlockAt;
                            gate.setVisible(isLocked);
                            label.setVisible(isLocked);
                            gate.body.enable = isLocked;
                        });

                        if (pausedRef.current) {
                            player.body.setVelocity(0, 0);
                            return;
                        }

                        const speed = 94;
                        let x = 0;
                        let y = 0;

                        if (cursors.left.isDown || wasd.left.isDown) x -= 1;
                        if (cursors.right.isDown || wasd.right.isDown) x += 1;
                        if (cursors.up.isDown || wasd.up.isDown) y -= 1;
                        if (cursors.down.isDown || wasd.down.isDown) y += 1;

                        const direction = new Phaser.Math.Vector2(x, y).normalize().scale(speed);
                        player.body.setVelocity(direction.x, direction.y);

                        if (x < 0) player.setFlipX(true);
                        if (x > 0) player.setFlipX(false);

                        const currentStop = journeyStops[currentStep];
                        if (currentStop) {
                            const distance = Phaser.Math.Distance.Between(
                                player.x,
                                player.y,
                                currentStop.x,
                                currentStop.y
                            );

                            if (distance < 38 && checkpointLatchedForStep !== currentStep) {
                                checkpointLatchedForStep = currentStep;
                                player.body.setVelocity(0, 0);
                                onEncounterRef.current?.(currentStop);
                            } else if (distance > 70 && checkpointLatchedForStep === currentStep) {
                                checkpointLatchedForStep = null;
                            }
                        }

                        jokeZones.forEach((zone) => {
                            if (zone.fired) return;

                            const distance = Phaser.Math.Distance.Between(player.x, player.y, zone.x, zone.y);
                            if (distance < 62) {
                                zone.fired = true;
                                player.body.setVelocity(0, 0);
                                onJokeRef.current?.(zone.message);
                            }
                        });
                    }
                };

                game = new Phaser.Game({
                    type: Phaser.CANVAS,
                    parent: hostRef.current,
                    backgroundColor: '#8bcf4c',
                    render: {
                        antialias: false,
                        pixelArt: true,
                        roundPixels: true
                    },
                    physics: {
                        default: 'arcade',
                        arcade: { gravity: { x: 0, y: 0 }, debug: false }
                    },
                    scale: {
                        mode: Phaser.Scale.RESIZE,
                        width: '100%',
                        height: '100%'
                    },
                    scene
                });
            } catch (error) {
                console.error('Unable to start the birthday game', error);
                if (!cancelled) setStatus('error');
            }
        }

        startGame();

        return () => {
            cancelled = true;
            game?.destroy(true);
        };
    }, []);

    return (
        <div className={styles.shell}>
            <div ref={hostRef} className={styles.canvas} />
            {status === 'loading' && <p className={styles.message}>Opening River’s map…</p>}
            {status === 'error' && <p className={styles.message}>River couldn’t find the map.</p>}
        </div>
    );
}

export default GameCanvas;
