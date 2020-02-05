<template>
  <div id="app" class="min-h-screen">
    <div class="content min-h-screen max-w-desktop">
      <div class="min-h-screen wrapper" ref="wrapper" v-if="foundWallet">
        <router-view></router-view>
      </div>
      <div v-else>
        Searching for wallet...
      </div>
    </div>
  </div>
</template>

<script>

  import aeternity from './utils/aeternity.js'

  export default {
    name: 'app',
    data() {
      return {
        foundWallet: false
      }
    },
    methods: {
      async checkAndReloadProvider() {
        if (!aeternity.address) return;
        const changesDetected = await aeternity.verifyAddress();
        // Reload the page, if changes have been detected.
        if (changesDetected) this.$router.go();
      }
    },
    async created() {
      try {
        // Bypass check if there is already an active wallet
        if (aeternity.hasActiveWallet())
          return this.foundWallet = true;
        // Otherwise init the aeternity sdk
        if (!(await aeternity.initClient()))
          return console.error('Wallet init failed');

        this.foundWallet = true;
        // Constantly check if wallet is changed
        setInterval(this.checkAndReloadProvider, 1000)
      } catch (e) {
        console.error('Initializing Wallet Error', e);
      }
    }
  }
</script>

<style scoped>
  .min-h-screen {
    min-height: 100vh;
    max-height: 100vh;
    padding-bottom: 0;
    background-color: #ffffff;
  }

  #app {
    display: flex;
    justify-content: center;
    font-family: Roboto, Helvetica, Arial, sans-serif;
    color: #2c3e50;
  }
</style>