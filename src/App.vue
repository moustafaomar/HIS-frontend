<template>
  <div id="app">
    <div class="container-fluid">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Navbar from '@/components/Navbar'
import Foot from '@/components/Foot'

export default {
  name: 'app',
  computed: {
    ...mapGetters(
    { currentUser: 'currentUser' },
    { currentPatient: 'currentPatient' }
    )
  },
  components: {
    Navbar,
    Foot
  }
}
</script>

<style>
</style>
