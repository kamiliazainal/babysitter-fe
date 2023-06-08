<template>
    <form @submit.prevent="submitBookingDetails">
        <div class="container">
            <div class="row p-5">
                <h4 class="text-center mb-4">Reservation Form</h4>
                <div class="col-lg-6">
                    <label for="start_datetime" class="form-label">Start Datetime <span style="color: red">*</span></label>
                    <Datepicker v-model="formData.start_datetime" required />
                </div>
                <div class="col-lg-6">
                    <label for="end_datetime" class="form-label">End Datetime <span style="color: red">*</span></label>
                    <Datepicker v-model="formData.end_datetime" required />
                </div>
                <div class="col-lg-4  mt-3">
                    <label for="parent_name" class="form-label">Parent Name <span style="color: red">*</span></label>
                    <input type="text" id="parent_name" class="form-control" v-model="formData.parent_name" required>
                </div>
                <div class="col-lg-4  mt-3">
                    <label for="parent_phone" class="form-label">Phone Number <span style="color: red">*</span></label>
                    <input type="text" id="parent_phone" class="form-control" v-model="formData.parent_phone" required>
                </div>
                <div class="col-lg-4  mt-3">
                    <label for="parent_email" class="form-label">Email <span style="color: red">*</span></label>
                    <input type="email" id="parent_email" class="form-control" v-model="formData.parent_email" required>
                </div>
                <div class="col-lg-12 mt-3">
                    <label for="parent_address" class="form-label">Address <span style="color: red">*</span></label>
                    <textarea id="parent_address" class="form-control" v-model="formData.parent_address" required></textarea>
                </div>
                <div class="col-lg-6 mt-3">
                    <label for="spouse_name" class="form-label">Spouse Name</label>
                    <input type="text" id="spouse_name" class="form-control" v-model="formData.spouse_name" required>
                </div>
                <div class="col-lg-6 mt-3">
                    <label for="spouse_phone" class="form-label">Spouse Phone Number</label>
                    <input type="text" id="spouse_phone" class="form-control" v-model="formData.spouse_phone" required>
                </div>
                <div class="text-center p-5">
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Submit</button>
                </div>
            </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Submit Booking and Parent Details</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    Are you sure you want to submit? Once submitted, it is not reversible, and you will be redirected to enter children details.
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-success" data-bs-dismiss="modal" @click="submitBookingDetails">Confirm</button>
                </div>
                </div>
            </div>
        </div>
    </form>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref} from 'vue';
  import axios from 'axios';
  import Datepicker from '@vuepic/vue-datepicker';
  import '@vuepic/vue-datepicker/dist/main.css';

  export default defineComponent({
    name: 'BookingDetail',
    components: {Datepicker},
    data() {
        return {
            formData: {
                start_datetime: ref(new Date()),
                end_datetime: ref(new Date()),
                parent_name: '',
                parent_phone: '',
                parent_email: '',
                parent_address: '',
                spouse_name: '',
                spouse_phone: '',
            },
            booking_id: 0,
            errorMessage: '',
        }
    },
    methods: {
      async submitBookingDetails() {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/bookings/booking-details', this.formData);
            this.booking_id = response.data.data.id;
            this.$emit('bookingSubmitted', this.booking_id);
        } catch (error) {
            console.error(error);
        }
      },
    },
  });
  </script>
  