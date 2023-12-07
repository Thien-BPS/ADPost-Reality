export const teresa = {
  unlocks: {
    run: {
      id: 0,
      price: 4e7,
      description: "Unlock Teresa's Reality.",
      onUnlock: () => Teresa.quotes.unlockReality.show(),
    },
    epGen: {
      id: 1,
      price: 5e9,
      description: "Unlock passive Eternity Point generation.",
      isDisabledInDoomed: true
    },
    effarig: {
      id: 2,
      price: 8e12,
      description: "Unlock Effarig, Celestial of Ancient Relics.",
      onUnlock: () => Teresa.quotes.effarig.show(),
    },
    shop: {
      id: 3,
      price: 1e14,
      description: "Unlock Teresa's Perk Point Shop.",
    },
    undo: {
      id: 4,
      price: 150000,
      description: "Unlock \"Undo\" of equipping a Glyph.",
      isDisabledInDoomed: true
    },
    startEU: {
      id: 5,
      price: 1200,
      description: "You start Reality with all Eternity Upgrades unlocked.",
      isDisabledInDoomed: true,
      onUnlock: () => {
        for (const id of [1, 2, 3, 4, 5, 6]) player.eternityUpgrades.add(id);
      },
    }
  }
};
