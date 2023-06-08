import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import ReservationForm from './views/ReservationForm.vue';
import ChildrenDetail from './components/ChildrenDetail.vue';
import BookingDetail from './components/BookingDetail.vue';
import BookingSummary from '@/components/BookingSummary.vue';

const routes = [
  { path: '/', component: ReservationForm },
  { path: '/children-detail', component: ChildrenDetail },
  { path: '/booking-detail', component: BookingDetail },
  { path: '/booking-summary', component: BookingSummary },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App).use(router).mount('#app');