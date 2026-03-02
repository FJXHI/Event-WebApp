<!-- CalenderModal.vue -->

<template>
  <PopupModal :model-value="props.visible" @update:modelValue="val => emit('update:visible', val)">

    <h2>{{ $t('calendar.add') }}</h2>

    <ul class="LinkItem-list">
      <LinkItem
        :href="googleCalendarUrl"
        :icon="IconGeo"
        :title="$t('calendar.google')"
      />
      <LinkItem
        :href="outlookCalendarUrl"
        :icon="IconGeo"
        :title="$t('calendar.outlook')"
      />
      <LinkItem
        :href="yahooCalendarUrl"
        :icon="IconGeo"
        :title="$t('calendar.yahoo')"
      />
      <LinkItem
        as="button"
        :icon="IconGeo"
        :title="$t('calendar.ics')"
        @click="downloadIcs" 
      />
    </ul>

    <!-- 
    Alternative Designs with OvalLink
    <a :href="googleCalendarUrl" target="_blank" rel="noopener noreferrer">
      <OvalLink 
          :icon="IconGeo"
          :name="$t('calendar.google')"  />
    </a>
    <a :href="outlookCalendarUrl" target="_blank" rel="noopener noreferrer">
      <OvalLink 
          :icon="IconGeo"
          :name="$t('calendar.outlook')"  />
    </a>
    <a :href="yahooCalendarUrl" target="_blank" rel="noopener noreferrer">
      <OvalLink 
          :icon="IconGeo"
          :name="$t('calendar.yahoo')"  />
    </a>
    <OvalLink 
          :link="'#'"
          :icon="IconGeo"
          :name="$t('calendar.ics')"
          @click="downloadIcs"  />
    <a href="#" target="_blank" rel="noopener noreferrer" @click.prevent="downloadIcs"> 
      <OvalLink
          :icon="IconGeo"
          :name="$t('calendar.ics')"
          @click="downloadIcs" />
    </a>
    -->
    <!--
    <OvalLink 
          :link="googleCalendarUrl"
          :icon="IconGeo"
          :name="$t('calendar.google')"  />
    <OvalLink 
          :link="outlookCalendarUrl"
          :icon="IconGeo"
          :name="$t('calendar.outlook')"  />
    <OvalLink 
          :link="yahooCalendarUrl"
          :icon="IconGeo"
          :name="$t('calendar.yahoo')"  />
    <OvalLink 
          :link="'#'"
          :icon="IconGeo"
          :name="$t('calendar.ics')"
          @click="downloadIcs"  />-->
  </PopupModal>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import IconGeo from '@/components/icons/IconGeo.vue';
import PopupModal from '@/components/PopupModalTemp.vue'
import OvalLink from '@/components/OvalLink.vue';
import SocialMediaLink from './SocialMediaLink.vue';
import LinkItem from '@/components/LinkItem.vue';

const props = defineProps<{
  visible: boolean;
  title: string;
  description?: string;
  location?: string;
  startTime: string;
  endTime: string;
  detailsUrl?: string;
}>();


const emit = defineEmits(['update:visible'])

function parseSafeDate(value: string): Date | null {
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}

function toCalendarUtc(date: Date): string {
  return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');
}

function escapeIcsText(value: string): string {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/\n/g, '\\n')
    .replace(/,/g, '\\,')
    .replace(/;/g, '\\;');
}

const startDate = computed(() => parseSafeDate(props.startTime));
const endDate = computed(() => parseSafeDate(props.endTime));

const eventTitle = computed(() => props.title?.trim() || 'Event');
const eventLocation = computed(() => props.location?.trim() || '');
const eventDescription = computed(() => {
  const base = props.description?.trim() || '';
  const details = props.detailsUrl?.trim() || '';
  return details ? `${base}\n${details}`.trim() : base;
});

const googleCalendarUrl = computed(() => {
  if (!startDate.value || !endDate.value) return '#';
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: eventTitle.value,
    dates: `${toCalendarUtc(startDate.value)}/${toCalendarUtc(endDate.value)}`,
    details: eventDescription.value,
    location: eventLocation.value,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
});

const outlookCalendarUrl = computed(() => {
  if (!startDate.value || !endDate.value) return '#';
  const params = new URLSearchParams({
    path: '/calendar/action/compose',
    rru: 'addevent',
    subject: eventTitle.value,
    startdt: startDate.value.toISOString(),
    enddt: endDate.value.toISOString(),
    body: eventDescription.value,
    location: eventLocation.value,
  });
  return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`;
});

const yahooCalendarUrl = computed(() => {
  if (!startDate.value || !endDate.value) return '#';
  const durationMs = Math.max(0, endDate.value.getTime() - startDate.value.getTime());
  const duration = new Date(durationMs).toISOString().slice(11, 19).replace(/:/g, '');
  const params = new URLSearchParams({
    v: '60',
    title: eventTitle.value,
    st: toCalendarUtc(startDate.value),
    dur: duration || '000000',
    desc: eventDescription.value,
    in_loc: eventLocation.value,
  });
  return `https://calendar.yahoo.com/?${params.toString()}`;
});

function downloadIcs() {
  if (!startDate.value || !endDate.value) return;

  const now = new Date();
  const uid = `${now.getTime()}-${Math.random().toString(36).slice(2)}@event-webapp`;
  const dtStamp = toCalendarUtc(now);
  const dtStart = toCalendarUtc(startDate.value);
  const dtEnd = toCalendarUtc(endDate.value);

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Event-WebApp//Calendar Export//DE',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${dtStamp}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:${escapeIcsText(eventTitle.value)}`,
    `DESCRIPTION:${escapeIcsText(eventDescription.value)}`,
    `LOCATION:${escapeIcsText(eventLocation.value)}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${eventTitle.value.replace(/[^\w-]+/g, '_') || 'event'}.ics`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

</script>

<style scoped>
.calendar-links {
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}

.calendar-label {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text);
}

.calendar-link {
  border: 1px solid var(--oval-line);
  border-radius: 999px;
  padding: 4px 10px;
  font-size: 0.85rem;
  color: var(--oval-line);
  text-decoration: none;
  background: transparent;
}

.calendar-btn {
  cursor: pointer;
}

.share-section {
  margin-top: 16px;
}

.share-link {
  width: 100%;
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 6px;
  cursor: pointer;
}

.copied-text {
  margin-top: 8px;
  color: green;
  font-size: 13px;
}

/*
.share-buttons {
  margin-top: 16px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
}
  
.share-button {
  padding: 8px 12px;
  border-radius: 4px;
  color: white;
  text-decoration: none;
  font-size: 14px;
}
*/

.share-buttons {
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center; /* optional: zentriert die Buttons horizontal */
}

.share-button {
  width: 90%; /* oder: width: 100%; */
  text-align: center;
  border-radius: 4px;
  color: white;
  background-color: blue;
}


.share-button.facebook {
  background-color: #3b5998;
}

.share-button.twitter {
  background-color: #1da1f2;
}

.share-button.whatsapp {
  background-color: #25d366;
}
</style>
