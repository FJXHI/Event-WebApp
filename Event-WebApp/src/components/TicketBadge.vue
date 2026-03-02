<!-- TicketBadge.vue -->
<!-- A Bagde for Ticket Info -->

<template>
  <!--<OvalLink 
    v-if="state !== 'none'"
    :href="link ?? undefined"
    target="_blank"
    class="ticket-badge"
    :name="label"
  />

  <TagLabel 
    v-if="state !== 'none'"
    :href="link ?? undefined"
    target="_blank"
    class="ticket-badge"
    :name="label"
  />-->

  <a
    v-if="state !== 'none'"
    :href="link ?? undefined"
    target="_blank"
    class="ticket-badge"
    :class="`ticket-${state}`"
  >
    {{ label }}
  </a>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import type { TicketInfo } from "@/scripts/useEventData";
import OvalLink from "@/components/OvalLink.vue";
import TagLabel from "./TagLabel.vue";

const props = defineProps<{
  ticket?: boolean;
  ticket_info?: TicketInfo;
}>();

const { t, locale } = useI18n();

const formatPrice = (price: number, currency: string) => {
  try {
    return new Intl.NumberFormat(locale.value, {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  } catch {
    return `${price.toFixed(2)} ${currency}`;
  }
};

const state = computed(() => {
  // No Ticket
  if (!props.ticket && !props.ticket_info) {
    return "none";
  }

  if (!props.ticket_info) {
    return "basic";
  }

  if (props.ticket_info.available === false) {
    return "sold_out";
  }

  if (props.ticket_info.available === true) {

    return "available";
  }

  return "basic";
});

const label = computed(() => {
  const info = props.ticket_info;

  if (state.value === "sold_out") {
    return t("ticket-sold-out");
  }

  if (state.value === "available" && info?.price != null) {
    const currency = info.currency ?? "EUR";
    return formatPrice(info.price, currency);
  }

  if (state.value === "available") {
    return t("tickets-label");
  }

  if (state.value === "basic") {
    return t("ticket-label");
  }

  return "";
});

const link = computed(() => {
  return props.ticket_info?.url ?? null;
});
</script>


<style scoped>
.ticket-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.3rem 0.8rem;
  border-radius: 999px;
  font-size: 0.8rem;
  text-decoration: none;
  font-weight: 500;
  transition: 0.2s ease;
}

/* Zustande */
.ticket-basic {
  background: #eee;
  color: #333;
}

.ticket-available {
  background: #0a84ff;
  color: white;
}

.ticket-sold_out {
  background: #ff3b30;
  color: white;
  pointer-events: none;
}
</style>
