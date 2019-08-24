"use strict";

Vue.component("compression-upgrade", {
  props: {
    upgrade: Object
  },
  data() {
    return {
      isBought: false,
      isActive: false,
      isAffordable: false,
    };
  },
  computed: {
    classObject() {
      return {
        "o-compression-upgrade": true,
        "o-compression-upgrade--active": this.isBought && this.isActive,
        "o-compression-upgrade--inactive": this.isBought && !this.isActive,
        "o-compression-upgrade--available": !this.isBought && this.isAffordable,
        "o-compression-upgrade--unavailable": !this.isBought && !this.isAffordable
      };
    }
  },
  methods: {
    update() {
      this.isBought = this.upgrade.isBought;
      this.isActive = this.upgrade.canBeApplied;
      this.isAffordable = this.upgrade.isAffordable;
    }
  },
  template:
    `<div class="l-spoon-btn-group">
      <button :class="classObject" @click="upgrade.purchase()">
        <description-display 
          :config="upgrade.config"
          :length="70"
          name="o-compression-upgrade__description"
        />
        <br><br>
        <span>To activate: {{ upgrade.config.secondary() }}</span>
        <br>
        <span>(Currently {{ upgrade.config.currentDisplay() }})</span>
        <br><br>
        <effect-display :config="upgrade.config" />
        <cost-display
          v-if="!isBought"
          :config="upgrade.config"
          singular="Entanglement"
          plural="Entanglement"
        />
        <div v-else-if="isActive">Active! (Cost: {{ upgrade.config.cost }})</div>
        <div v-else>Inactive (Cost: {{ upgrade.config.cost }})</div>
      </button>
    </div>`
});