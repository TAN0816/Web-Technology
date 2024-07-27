<template>
    <div class="profile-container">
        <div class="profile-form">
            <h2>Profile Information</h2>
            <form @submit.prevent="saveProfile">
                <div class="form-group">
                    <label for="username">Username:</label>
                    <input type="text" id="username" v-model="profile.Username" required />
                </div>
                <div class="form-group">
                    <label for="email">Email:</label>
                    <input type="email" id="email" v-model="profile.Email" required />
                </div>
                <div class="form-group">
                    <label for="role">Role:</label>
                    <input type="text" id="role" v-model="profile.cRole" disabled />
                </div>
                <button type="submit">Save</button>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'UserProfile',
    data() {
        return {
            profile: {
                Username: '',
                Email: '',
                cRole: ''
            }
        };
    },
    created() {
        this.fetchProfile();
    },
    methods: {
        async fetchProfile() {
            try {
                const token = localStorage.getItem('jwtToken');
                const response = await axios.get('http://localhost:8080/profile'
                , {
                    headers: { Authorization: `Bearer ${ token }` }
        }
    );
        this.profile = response.data.data;
    } catch(error) {
        console.error('Failed to fetch profile:', error);
        // Handle error, e.g., redirect to login page
    }
},
    async saveProfile() {
    try {
        const token = localStorage.getItem('jwtToken');
        const response = await axios.post('http://localhost:8080/profile/update', this.profile, {
            headers: { Authorization: `Bearer ${ token }` }
        });
alert(response.data.message);
      } catch (error) {
    console.error('Failed to update profile:', error);
    // Handle error
}
    }
  }
};
</script>

<style scoped>
.profile-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.profile-form {
    background-color: #f2f2f2;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    max-width: 500px;
    width: 100%;
}

.form-group {
    margin-bottom: 15px;
}

label {
    display: block;
    margin-bottom: 5px;
}

input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

button {
    background-color: #fc6027;
    color: white;
    border: none;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
}

button:hover {
    background-color: #e55e1a;
}
</style>