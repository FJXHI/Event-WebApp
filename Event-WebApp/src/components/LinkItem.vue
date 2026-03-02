<!-- LinkItem.vue -->
<!-- Render a link entry for some views, Home, Favorits, CalendarModal  -->

<template>
  <li>
    <component :is="linkComponent" v-bind="linkProps" @click="handleClick">
      <div class="icon-wrapper">
        <component :is="icon" class="icon" />
      </div>
      <div class="text-container">
        <span class="title">{{ translate(title) }}</span>
        <span class="subtext" v-if="subtext">{{ translate(subtext) }}</span>
      </div>
    </component>
  </li>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t, te } = useI18n(); // `t` for translations, `te` to check if a key exists

const props = defineProps({
  to: String,
  href: String,
  as: {
    type: String,
    default: 'auto', // auto | router | external | button
  },
  icon: Object,
  title: String,
  subtext: String,
  target: {
    type: String,
    default: '_blank',
  },
  rel: {
    type: String,
    default: 'noopener noreferrer',
  },
});

const emit = defineEmits(['click']);

const mode = computed(() => {
  if (props.as !== 'auto') return props.as;
  if (props.href) return 'external';
  if (props.to) return 'router';
  return 'button';
});

const isExternalLink = computed(() => mode.value === 'external');
const isButton = computed(() => mode.value === 'button');

const linkComponent = computed(() => {
  if (isExternalLink.value) return 'a';
  if (isButton.value) return 'button';
  return 'router-link';
});

const linkProps = computed(() =>
  isExternalLink.value
    ? { href: props.href, target: props.target, rel: props.rel }
    : isButton.value
      ? { type: 'button', class: 'linkitem-btn' }
      : { to: props.to }
);

const handleClick = (event) => {
  if (isButton.value) {
    emit('click', event);
  }
};

const translate = (key) => (te(key) ? t(key) : key);
</script>

<style scoped>

.icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.icon {
  width: 20px;
  height: 20px;
  fill: var(--home-icon);
}

.text-container {
  display: flex;
  flex-direction: column;
}

.title {
  font-size: 16px;
  font-weight: bold;
}

.subtext {
  font-size: 14px;
  color: var(--home-sub);
}

.linkitem-btn {
  width: 100%;
  background: transparent;
}

</style>
