<template>
    <div>
      <booking-detail @bookingSubmitted="postBookingSubmitted" v-if="!bookingId" />
      <children-detail :bookingId="bookingId" @childrenSubmitted="postChildrenSubmitted" v-else-if="!childrenSubmitted" />
      <booking-summary :bookingId="bookingId" v-else />
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import BookingDetail from '@/components/BookingDetail.vue';
  import ChildrenDetail from '@/components/ChildrenDetail.vue';
  import BookingSummary from '@/components/BookingSummary.vue';
  
  export default defineComponent({
    name: 'ReservationForm',
    components: {
      BookingDetail,
      ChildrenDetail,
      BookingSummary,
    },
    data() {
      return {
        bookingId: 0,
        childrenSubmitted: false,
      };
    },
    methods: {
      postBookingSubmitted(id: number) {
        this.bookingId = id;
      },
      postChildrenSubmitted() {
        this.childrenSubmitted = true;
      },
    },
  });
  </script>  