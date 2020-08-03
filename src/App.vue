<template>
  <div id="app">
    <Header @show-contact-modal="showContactModal"></Header>
    <router-view></router-view>
    <b-modal ref="contact_me" title="Get in touch!">
      <p class="my-4">contact form here</p>
    </b-modal>
  </div>
</template>

<script>
import Header from './Header.vue';

export default {
  components: {
    Header,
  },
  name: 'App',
  data: function() {
    return {
      modalVisible: false,
    };
  },
  methods: {
    showContactModal() {
      this.$refs['contact_me'].show();
    },
    hideContactModal() {
      this.$refs['contact_me'].hide();
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
