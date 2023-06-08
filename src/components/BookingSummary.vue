<template>
    <div class="container">
        <div class="row p-5">
            <h4 class="text-justify">Thank you for your reservation! Our customer support team will contact you shortly to confirm your booking and discuss further details.</h4>

            <h5 class="mt-4 mb-4">Booking Date</h5>
            <hr>
            <div class="col-lg-6">
                <label for="startDate" class="form-label">Start from</label>
                <input type="text" id="startDate" class="form-control" readonly v-model="dataFetched.startDate">
            </div>
            <div class="col-lg-6">
                <label for="endDate" class="form-label">Until</label>
                <input type="text" id="endDate" class="form-control" readonly v-model="dataFetched.endDate">
            </div>

            <h5 class="mt-4 mb-4">Parents Detail</h5>
            <hr>
            <div class="col-lg-4">
                <label for="parentName" class="form-label">Parent Name</label>
                <input type="text" id="parentName" class="form-control" readonly v-model="dataFetched.parentName">
            </div>
            <div class="col-lg-4">
                <label for="parentPhone" class="form-label">Parent Phone Number</label>
                <input type="text" id="parentPhone" class="form-control" readonly v-model="dataFetched.parentPhone">
            </div>
            <div class="col-lg-4">
                <label for="parentEmail" class="form-label">Parent Email</label>
                <input type="text" id="parentEmail" class="form-control" readonly v-model="dataFetched.parentEmail">
            </div>
            <div class="col-lg-4  mt-3" v-if="dataFetched.spouseName !== null && dataFetched.spouseName !== ''">
                <label for="spouseName" class="form-label">Spouse Name</label>
                <input type="text" id="spouseName" class="form-control" readonly v-model="dataFetched.spouseName">
            </div>
            <div class="col-lg-4  mt-3" v-if="dataFetched.spousePhone !== null && dataFetched.spousePhone !== ''">
                <label for="spousePhone" class="form-label">Spouse Phone Number</label>
                <input type="text" id="spousePhone" class="form-control" readonly v-model="dataFetched.spousePhone">
            </div>
            <div class="col-lg-12 mt-3">
                <label for="parentAddress" class="form-label">Address</label>
                <textarea id="parentAddress" class="form-control" v-model="dataFetched.parentAddress" readonly></textarea>
            </div>

            <h5 class="mt-4 mb-4">Children Detail</h5>
            <hr>
            <div v-for="(child, index) in dataFetched.children" :key="index">
                <div class="row">
                    <div class="col-lg-4 mt-3">
                        <label for="childName" class="form-label">Child Name</label>
                        <input type="text" id="childName" class="form-control" v-model="child.childName" readonly>
                    </div>
                    <div class="col-lg-4 mt-3">
                        <label for="childAge" class="form-label">Child Age (in month)</label>
                        <input type="number" id="childAge" class="form-control" v-model="child.childAge" readonly>
                    </div>
                    <div class="col-lg-4 mt-3">
                        <label for="childGender" class="form-label">Child Gender</label>
                        <input type="text" id="childAge" class="form-control" v-model="child.childGender" readonly>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script lang="ts">
  import { defineComponent} from 'vue';
  import axios from 'axios';
  
  export default defineComponent({
    name: 'BookingSummary',
    props: {
      bookingId: {
        type: Number,
        required: true,
      },
    },
    data() {
        return {
            dataFetched: {
                parentName: '',
                parentEmail: '',
                parentPhone: '',
                parentAddress: '',
                spouseName: '',
                spousePhone: '',
                startDate: '',
                endDate: '',
                children:[] as { childName: string, childAge: number, childGender: string }[],
            }
        }
    },
    methods: {
        async getBookingSummary() {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/bookings/${this.bookingId}/booking-summary`);
                this.dataFetched = response.data;
            } catch (error) {
                console.error(error);
            }
        },
    },
    mounted() {
      this.getBookingSummary();
    },
  });
</script>
  