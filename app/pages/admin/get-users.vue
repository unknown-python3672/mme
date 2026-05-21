<template>
    <Navbar />
    <div>
        <h1> All registered Users</h1>

        <div v-if="error" style="color: red;">
            You don't have permission to view this page!
        </div>
        <ul v-else>
            <li v-for="user in allUsers" :key="user.id">
                {{ user.name }} - {{ user.email }} - {{ user.matricNumber }}
            </li>
        </ul>
    </div>
</template>

<script setup>
definePageMeta({
    middleware: 'admin-only'
})


const config = useRuntimeConfig()


const token = useCookie('token').value

const { data: allUsers, error } = await useFetch(`${config.public.apiUrl}/api/v1/users/all`, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})
</script>