let active = false;
let debounce = false;
let tped = false;

const tpDistance = 0.6;

function checkBlock() {
    const block = World.getBlockAt(
        Math.floor(Player.getX()),
        Math.floor(Player.getY()),
        Math.floor(Player.getZ()),
    );

    return block.type.getID() == 101;
}

function checkDirectionFromBlock(orig, dir) {
    switch (dir) {
        case 'north':
            return World.getBlockAt(orig[0], orig[1], orig[2] - 1).type.getID();
        case 'west':
            return World.getBlockAt(orig[0] - 1, orig[1], orig[2]).type.getID();
        case 'east':
            return World.getBlockAt(orig[0] + 1, orig[1], orig[2]).type.getID();
        case 'south':
            return World.getBlockAt(orig[0], orig[1], orig[2] + 1).type.getID();
    }
}

function calcDistance(p1, p2) {
    console.log(
        Math.sqrt(
            (p1[0] - p2[0]) ** 2 + (p1[1] - p2[1]) ** 2 + (p1[2] - p2[2]) ** 2,
        ),
    );

    return Math.sqrt(
        (p1[0] - p2[0]) ** 2 + (p1[1] - p2[1]) ** 2 + (p1[2] - p2[2]) ** 2,
    );
}

register('command', (usr) => {
    active = !active;
    if (active) {
        ChatLib.chat('&2&l[RT] &r&2Bar phase enabled');
    } else {
        ChatLib.chat('&4&l[RT] &r&4Bar phase disabled');
    }
}).setName('barphase');

register('tick', () => {
    if (!active) return;

    if (checkBlock() && !tped) {
        debounce = true;
        let plrPos = [Player.getX(), Player.getY(), Player.getZ()];
        let barCenterPos = [
            Player.getX() % 1 > 0.5
                ? Math.ceil(Player.getX()) - 0.5
                : Math.floor(Player.getX()) + 0.5,
            Player.getY(),
            Player.getZ() % 1 > 0.5
                ? Math.ceil(Player.getZ()) - 0.5
                : Math.floor(Player.getZ()) + 0.5,
        ];
        let barPos = [
            Math.floor(Player.getX()),
            Math.floor(Player.getY()),
            Math.floor(Player.getZ()),
        ];

        let possible = ['north', 'west', 'east', 'south'];

        possible = possible.filter((val, ind) => {
            let block1 = checkDirectionFromBlock(barPos, val);
            let block2 = checkDirectionFromBlock(
                [barPos[0], barPos[1] + 1, barPos[2]],
                val,
            );

            return block1 == 0 && block2 == 0;
        });

        if (possible.length < 2) return;

        // module found the side opposite us, AND our side valid
        // gotta figure out which side we're on, which side we're not
        // gonna do this by calculating dist from plr and the block on each side
        let maxDist = -1;
        let goalDir;

        possible.forEach((val, ind) => {
            switch (val) {
                case 'north':
                    var dist = calcDistance(plrPos, [
                        barCenterPos[0],
                        barCenterPos[1],
                        barCenterPos[2] - 1,
                    ]);

                    if (dist > maxDist) {
                        goalDir = val;
                        maxDist = dist;
                    }
                    break;
                case 'west':
                    var dist = calcDistance(plrPos, [
                        barCenterPos[0] - 1,
                        barCenterPos[1],
                        barCenterPos[2],
                    ]);

                    if (dist > maxDist) {
                        goalDir = val;
                        maxDist = dist;
                    }
                    break;
                case 'east':
                    var dist = calcDistance(plrPos, [
                        barCenterPos[0] + 1,
                        barCenterPos[1],
                        barCenterPos[2],
                    ]);

                    if (dist > maxDist) {
                        goalDir = val;
                        maxDist = dist;
                    }
                    break;
                case 'south':
                    var dist = calcDistance(plrPos, [
                        barCenterPos[0],
                        barCenterPos[1],
                        barCenterPos[2] + 1,
                    ]);

                    if (dist > maxDist) {
                        goalDir = val;
                        maxDist = dist;
                    }
                    break;
            }
        });

        switch (goalDir) {
            case 'north':
                Player.getPlayer().func_70107_b(
                    plrPos[0],
                    plrPos[1],
                    plrPos[2] - tpDistance,
                );
                break;
            case 'west':
                Player.getPlayer().func_70107_b(
                    plrPos[0] - tpDistance,
                    plrPos[1],
                    plrPos[2],
                );
                break;
            case 'east':
                Player.getPlayer().func_70107_b(
                    plrPos[0] + tpDistance,
                    plrPos[1],
                    plrPos[2],
                );
                break;
            case 'south':
                Player.getPlayer().func_70107_b(
                    plrPos[0],
                    plrPos[1],
                    plrPos[2] + tpDistance,
                );
                break;
        }
        tped = true;
        debounce = false;
    } else if (!checkBlock()) {
        tped = false;
    }
});
