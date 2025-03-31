<template>
    <div class="text-center p-4">
      <h1 class="site404">404 – Seite nicht gefunden</h1>
      <p>Die angeforderte Seite existiert nicht.</p>
      <router-link to="/" class="link404">Zur Startseite</router-link>
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