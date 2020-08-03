<template>
  <div>
    <b-navbar toggleable="lg">
      <b-navbar-brand>
        Lazer Porter | Mobile App and Full Stack Developer
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-nav pills align="center">
          <b-nav-item to="/" exact exact-active-class="active">
            Home
          </b-nav-item>
          <b-nav-item to="/projects" exact exact-active-class="active">
            Projects
          </b-nav-item>
          <b-nav-item @click="$emit('show-contact-modal')">
            Contact
          </b-nav-item>
        </b-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<style scoped>
a.nav-link {
  color: black;
}
</style>
