import Decimal from "break_infinity.js";

// Not actual challenges
export const quantumChallenges = [
  {
    id: 1,
    description: () =>
      `Galaxies and Dimension Boosts are disabled.`,
    goal: new Decimal("1e56738942050"),
    isQuickResettable: false,
    effect: () => undefined,
    reward: {
      description: () =>
        `Dimension Boosts are ${formatPercent(0.01)} stronger per ${formatInt(6)} total galaxies.`,
      effect: () => Math.floor((player.galaxies + player.replicanti.galaxies + player.dilation.totalTachyonGalaxies) / 6),
      formatEffect: value => formatPercent(value, 2, 2)
    },
  },
    {
      id: 2,
      description: () =>
        `Antimatter Dimensions 2-8 don't produce anything. The multiplier per 10 dimensions and dimension boosts are disabled.`,
      goal: new Decimal("1e56738942050"),
      isQuickResettable: false,
      effect: () => undefined,
      reward: {
        description: () =>
          `Galaxies are ${formatPercent(0.5)} stronger but remote antimatter galaxies scaling is ${formatX(3)} stronge.`,
        effect: () => undefined,
        formatEffect: value => undefined
      },
    },
    {
      id: 3,
      description: () =>
        `IC1 and IC8 is applied to all dimension types while EC3 is applied to your antimatter, infinity, and time dimensions.`,
      goal: new Decimal("1e56738942050"),
      isQuickResettable: false,
      effect: () => undefined,
      reward: {
        description: () =>
          `Dimension Boosts are ${formatPercent(0.01)} stronger per ${formatInt(6)} total galaxies.`,
        effect: () => Math.floor((player.galaxies + player.replicanti.galaxies + player.dilation.totalTachyonGalaxies) / 6),
        formatEffect: value => formatPercent(value, 2, 2)
      },
    },
  ];
  