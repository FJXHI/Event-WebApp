<template>
  <div class="scroll-head full-height">
    <div class="text-center scroll-y-area">
      <h1 class="site404">404 – Seite nicht gefunden</h1>
      <p>Die angeforderte Seite existiert nicht.</p>
      <router-link to="/" class="link404">Zur Startseite</router-link>
    </div>
  </div>
</template>

<style scoped>

.text-center {
  text-align: center;
}

.site404 {
  font-size: 2.5rem;
  font-weight: bold;
}

.link404 {
  font-size: 1.5rem;
  text-decoration: none;
}

</style>