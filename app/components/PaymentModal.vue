<template>
    <teleport to="body">
    <transition name="fade">
        <div v-if="modelValue" class="backdroop" @click.self="close">
            <div ref="modalRef" class="modal">
                <header>
                   <h3>Select textbooks to be purchased</h3> 
                    <h1> this is the textbook modal functionability over design</h1>
                </header>
            </div>
        </div>
    </transition>
    </teleport>
</template>
<script setup>
import {ref} from 'vue'
const isVisible = ref(false);
const close = () => (isVIsible=false);
</script>