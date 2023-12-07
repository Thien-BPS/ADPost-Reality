import { DC } from "../../constants";

// This is supposed to be in ./navigation.js but importing doesn't work for some stupid reason
function emphasizeEnd(fraction) {
  return Math.pow(fraction, 10);
}

export const V_REDUCTION_MODE = {
  SUBTRACTION: 1,
  DIVISION: 2
};

export const v = {
  // Note: mainUnlock IDs here are one-indexed to match with navigation indices
  mainUnlock: {
    realities: {
      id: 1,
      name: "Realities",
      resource: () => Currency.realities.value,
      requirement: 100000,
      format: x => formatInt(x),
      progress: () => Currency.realities.value / 10000,
    },
    eternities: {
      id: 2,
      name: "Eternities",
      resource: () => Currency.eternities.value,
      requirement: 1e70,
      format: x => format(x, 2),
      progress: () => emphasizeEnd(Currency.eternities.value.pLog10() / 70),
    },
    infinities: {
      id: 3,
      name: "Infinities",
      resource: () => Currency.infinitiesTotal.value,
      requirement:1e160,
      format: x => format(x, 2),
      progress: () => emphasizeEnd(Currency.infinitiesTotal.value.pLog10() / 160),
    },
    dilatedTime: {
      id: 4,
      name: "Dilated Time",
      resource: () => player.records.thisReality.maxDT,
      requirement: DC.E320,
      format: x => format(x, 2),
      progress: () => emphasizeEnd(player.records.thisReality.maxDT.pLog10() / 320),
    },
    replicanti: {
      id: 5,
      name: "Replicanti",
      resource: () => player.records.thisReality.maxReplicanti,
      requirement: DC.E320000,
      format: x => format(x, 2),
      progress: () => emphasizeEnd(player.records.thisReality.maxReplicanti.pLog10() / 320000),
    },
    realityMachines: {
      id: 6,
      name: "Reality Machines",
      resource: () => Currency.realityMachines.value,
      requirement: 1e60,
      format: x => format(x, 2),
      progress: () => emphasizeEnd(Currency.realityMachines.value.pLog10() / 60),
    },
  },
  runUnlocks: [
    {
      id: 0,
      name: "Glyph Knight",
      description: value => `Unlock Reality with at most ${quantifyInt("Glyph", -value)} equipped.`,
      // This achievement has internally negated values since the check is always greater than
      values: [-5, -4, -3, -2, -1, 0],
      condition: () => V.isRunning && TimeStudy.reality.isBought,
      currentValue: () => -Glyphs.activeWithoutCompanion.length,
      formatRecord: x => (x >= -5 ? formatInt(-x) : "Not reached"),
      shardReduction: () => 0,
      maxShardReduction: () => 0,
      mode: V_REDUCTION_MODE.SUBTRACTION
    },
    {
      id: 1,
      name: "AntiStellar",
      description: value => `Have ${formatInt(value)} total Galaxies from all types.`,
      values: () => {
        if (devVars.celestials.v.lowerAchReqs && devVars.celestials.v.lowerAchReqsArray.includes(this.id)) {
          return [2700, 2900, 3100, 3300, 3500, 3700]
        }
        return [4000, 4300, 4600, 4900, 5200, 5500];
      },
      condition: () => V.isRunning,
      currentValue: () => Replicanti.galaxies.total + player.galaxies + player.dilation.totalTachyonGalaxies,
      formatRecord: x => formatInt(x),
      shardReduction: tiers => {
        if (devVars.celestials.v.lowerAchReqs && devVars.celestials.v.lowerAchReqsArray.includes(this.id)) {
          return Math.floor(200 * tiers)
        }
        return Math.floor(300 * tiers);
      },
      maxShardReduction: goal => goal - 4000,
      perReductionStep: 50,
      mode: V_REDUCTION_MODE.SUBTRACTION
    },
    {
      id: 2,
      name: "Se7en deadly matters",
      description: value => `Get ${format(Decimal.pow10(value))} Infinity Points in Eternity Challenge 7.`,
      values: () => {
        if (devVars.celestials.v.lowerAchReqs && devVars.celestials.v.lowerAchReqsArray.includes(this.id)) {
          return [3e5, 3.4e5, 3.8e5, 4.2e5, 4.6e5, 5e5]
        }
        return [6e5, 7.2e5, 8.4e5, 9.6e5, 1.08e6, 1.2e6]
      },
      condition: () => V.isRunning && EternityChallenge(7).isRunning,
      currentValue: () => Currency.infinityPoints.value.log10(),
      formatRecord: x => format(Decimal.pow10(x), 2),
      shardReduction: tiers => {
        if (devVars.celestials.v.lowerAchReqs && devVars.celestials.v.lowerAchReqsArray.includes(this.id)) {
          return 3e4 * tiers
        }
        return 1.2e5 * tiers
      },
      maxShardReduction: goal => goal - 6e5,
      perReductionStep: DC.E40000,
      mode: V_REDUCTION_MODE.DIVISION
    },
    {
      id: 3,
      name: "Young Boy",
      description: value => `Get ${format(Decimal.pow10(value))} Antimatter in Eternity Challenge 12 without
        unlocking Time Dilation.`,
      values: () => {
        if (devVars.celestials.v.lowerAchReqs && devVars.celestials.v.lowerAchReqsArray.includes(this.id)) {
          return [2e8, 2.3e8, 2.6e8, 2.9e8, 3.2e8, 3.5e8]
        }
        return [400e6, 450e6, 500e6, 600e6, 700e6, 800e6]
      },
      condition: () => V.isRunning && EternityChallenge(12).isRunning && !PlayerProgress.dilationUnlocked(),
      currentValue: () => Currency.antimatter.value.log10(),
      formatRecord: x => format(Decimal.pow10(x)),
      shardReduction: tiers => {
        if (devVars.celestials.v.lowerAchReqs && devVars.celestials.v.lowerAchReqsArray.includes(this.id)) {
          return 3e7 * tiers
        }
        return 50e6 * tiers
      },
      maxShardReduction: goal => goal - 400e6,
      perReductionStep: () => {
        if (devVars.celestials.v.lowerAchReqs && devVars.celestials.v.lowerAchReqsArray.includes(this.id)) {
          return DC.E2E7
        }
        return DC.E500000;
      },
      mode: V_REDUCTION_MODE.DIVISION
    },
    {
      id: 4,
      name: "Eternal Sunshine",
      description: value => `Get ${format(Decimal.pow10(value))} Eternity Points.`,
      values: () => {
        if (devVars.celestials.v.lowerAchReqs && devVars.celestials.v.lowerAchReqsArray.includes(this.id)) {
          return [5000, 5400, 5800, 6200, 6600, 7000];
        }
        return [7000, 7600, 8200, 8800, 9400, 10000];
      },
      condition: () => V.isRunning,
      currentValue: () => Currency.eternityPoints.value.log10(),
      formatRecord: x => format(Decimal.pow10(x), 2),
      shardReduction: tiers => {
        if (devVars.celestials.v.lowerAchReqs && devVars.celestials.v.lowerAchReqsArray.includes(this.id)) {
          return 400 * tiers
        }
        return 600 * tiers;
      },
      maxShardReduction: goal => goal - 7000,
      perReductionStep: () => {
        if (devVars.celestials.v.lowerAchReqs && devVars.celestials.v.lowerAchReqsArray.includes(this.id)) {
          return 1e300;
        }
        return 1e6;
      },
      mode: V_REDUCTION_MODE.DIVISION
    },
    {
      id: 5,
      name: "Matterception",
      description: value => `Get ${formatInt(value)} Dimension Boosts while Dilated and inside Eternity Challenge 5.`,
      values: () => {
        if (devVars.celestials.v.lowerAchReqs && devVars.celestials.v.lowerAchReqsArray.includes(this.id)) {
          return [47, 48, 49, 50, 51, 52];
        }
        [51, 52, 53, 54, 55, 56]
        },
      condition: () => V.isRunning && player.dilation.active && EternityChallenge(5).isRunning,
      currentValue: () => DimBoost.purchasedBoosts,
      formatRecord: x => formatInt(x),
      shardReduction: tiers => Math.floor(tiers),
      maxShardReduction: () => 5,
      reductionStepSize: 100,
      perReductionStep: 1,
      mode: V_REDUCTION_MODE.SUBTRACTION
    },
    {
      id: 6,
      name: "Requiem for a Glyph",
      description: value => `Unlock Reality with at most ${formatInt(-value)} Glyphs equipped for the entire Reality.`,
      // This achievement has internally negated values since the check is always greater than
      values: [1, 4, 7, 10, 13],
      condition: () => V.isRunning && TimeStudy.reality.isBought,
      currentValue: () => -player.requirementChecks.reality.maxGlyphs,
      formatRecord: x => formatInt(-x),
      shardReduction: () => 0,
      maxShardReduction: () => 0,
      mode: V_REDUCTION_MODE.SUBTRACTION,
      isHard: true
    },
    {
      id: 7,
      name: "Post-destination",
      description: value => `Get ${formatInt(400000)} Time Theorems with a /${format(Decimal.pow10(value), 2, 2)}
        Black Hole or slower, without discharging or entering EC12.`,
      values: [100, 150, 200, 250, 300],
      condition: () => V.isRunning,
      currentValue: () => (
        // Dirty hack I know lmao
        Currency.timeTheorems.gte(400000)
          ? -Math.log10(player.requirementChecks.reality.slowestBH)
          : 0),
      formatRecord: x => `${formatInt(1)} / ${format(Math.pow(10, x))}`,
      shardReduction: tiers => 50 * tiers,
      maxShardReduction: goal => goal - 50,
      reductionStepSize: 2,
      perReductionStep: 10,
      mode: V_REDUCTION_MODE.DIVISION,
      isHard: true
    },
    {
      id: 8,
      name: "Shutter Glyph",
      description: value => `Reach a Glyph of level ${formatInt(value)}.`,
      values: [6500, 7000, 8000, 9000, 10000],
      condition: () => V.isRunning,
      currentValue: () => gainedGlyphLevel().actualLevel,
      formatRecord: x => formatInt(x),
      shardReduction: tiers => Math.floor(500 * tiers),
      maxShardReduction: () => 500,
      perReductionStep: 5,
      mode: V_REDUCTION_MODE.SUBTRACTION,
      isHard: true
    }
  ],
  unlocks: {
    vAchievementUnlock: {
      id: 0,
      reward: "Unlock V, The Celestial Of Achievements",
      description: "Meet all the above requirements simultaneously",
      requirement: () => Object.values(GameDatabase.celestials.v.mainUnlock).every(e => e.progress() >= 1)
    },
    shardReduction: {
      id: 1,
      reward: `You can spend Perk Points to reduce the goal requirement of all tiers of each V-Achievement.`,
      description: () => `Have ${formatInt(2)} V-Achievements`,
      requirement: () => V.spaceTheorems >= 2
    },
    adPow: {
      id: 2,
      reward: "Antimatter Dimension power based on total Space Theorems.",
      description: () => `Have ${formatInt(5)} V-Achievements`,
      effect: () => 1 + Math.sqrt(V.spaceTheorems) / 100,
      format: x => formatPow(x, 3, 3),
      requirement: () => V.spaceTheorems >= 5
    },
    fastAutoEC: {
      id: 3,
      reward: "Achievement multiplier reduces Auto-EC completion time.",
      description: () => `Have ${formatInt(10)} V-Achievements`,
      effect: () => Achievements.power,
      // Base rate is 60 ECs at 20 minutes each
      format: x => (Ra.unlocks.instantECAndRealityUpgradeAutobuyers.canBeApplied
        ? "Instant (Ra upgrade)"
        : `${TimeSpan.fromMinutes(60 * 20 / x).toStringShort()} for full completion`),
      requirement: () => V.spaceTheorems >= 10
    },
    autoAutoClean: {
      id: 4,
      reward: "Unlock the ability to Automatically Purge Glyphs on Reality.",
      description: () => `Have ${formatInt(16)} V-Achievements`,
      requirement: () => V.spaceTheorems >= 16
    },
    achievementBH: {
      id: 5,
      reward: "Achievement multiplier affects Black Hole power.",
      description: () => `Have ${formatInt(30)} V-Achievements`,
      effect: () => Achievements.power,
      format: x => formatX(x, 2, 0),
      requirement: () => V.spaceTheorems >= 30
    },
    raUnlock: {
      id: 6,
      reward() {
        return `Reduce the Space Theorem cost of Time Studies by ${formatInt(2)}.
                Unlock Ra, Celestial of the Forgotten.`;
      },
      description: () => `Have ${formatInt(36)} V-Achievements`,
      effect: 2,
      requirement: () => V.spaceTheorems >= 36
    }
  }
};
