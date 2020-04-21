<template>
    <div>
        <span v-for="(gesture, index) in gestureNames" :key="index">
            <p @click="selectGesture">{{ gesture }}</p>
            <br>
        </span>
        <p @click="addGesture">Add New Gesture +</p>
    </div>
</template>

<script>
export default {
    name: 'sideNav',
    props: ['gestures']
}
</script>

<style>

</style>