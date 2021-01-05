<template>
  <div id="app">
    <div class="container-fluid">
      <router-view :key="$route.fullPath"></router-view>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'app',
  computed: {
    ...mapGetters(
    { currentUser: 'currentUser' },
    { currentPatient: 'currentPatient' },
    { currentAdmin: 'currentAdmin' }
    )
  }
}
</script>