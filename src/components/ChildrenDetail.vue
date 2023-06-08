<template>
    <form @submit.prevent="submitChildrenForm">
        <div class="container">
            <div class="row p-5">
                <div v-for="(child, index) in formData.children" :key="index">
                    <div class="row">
                        <div class="col-lg-4 mt-3">
                            <label for="childName" class="form-label">Child Name</label>
                            <input type="text" id="childName" class="form-control" v-model="child.name" required>
                        </div>
                        <div class="col-lg-4 mt-3">
                            <label for="childAge" class="form-label">Child Age (in month)</label>
                            <input type="number" id="childAge" class="form-control" v-model="child.age" required>
                        </div>
                        <div class="col-lg-4 mt-3">
                            <label for="childGender" class="form-label">Child Gender</label>
                            <select class="form-select" id="childGender" v-model="child.gender" required>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="text-center p-5">
                    <button type="button" class="btn btn-primary mb-3 mx-2" @click="addChild">Add Child</button>
                    <button type="button" class="btn btn-primary mb-3 mx-2" data-bs-toggle="modal" data-bs-target="#exampleModal">Submit</button>
                </div>
            </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Submit Children Details</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    Are you sure you want to submit? Once submitted, it is not reversible.
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-success" data-bs-dismiss="modal" @click="submitChildrenForm">Confirm</button>
                </div>
                </div>
            </div>
        </div>
    </form>
  </template>
  
  <script lang="ts">
  import { defineComponent} from 'vue';
  import axios from 'axios'

  export default defineComponent({
    name: 'ChildrenDetail',
    props: {
      bookingId: {
        type: Number,
        required: true,
      },
    },
    data() {
        return {
            formData:({
                children: [
                    { name: '', age: '', gender: '' }
                ]
            })
        }
    },
    methods: {
      addChild() {
        if (this.formData.children.length < 4) {
          this.formData.children.push({ name: '', age: '', gender: '' });
        }
      },
      async submitChildrenForm() {
        try {
            const response = await axios.post(`http://127.0.0.1:8000/api/bookings/${this.bookingId}/children-details`, this.formData);
            console.log(response);
            this.$emit('childrenSubmitted');
        } catch (error) {
            console.error(error);
        }
      },
    },
  });
  </script>
  