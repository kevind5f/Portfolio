<template>
    <header class="header">
        <div class="logo">@OmegaLull</div>
        <nav class="nav-links">
            <a
                v-for="item in links"
                :key="item.text"
                :href="item.link"
                class="nav-link"
            >{{ item.text }}</a>
        </nav>
    </header>
</template>

<script>
export default {
    props: {
    links: {
        type: Array,
        required: true
        }
    }
}
</script>

<style scoped>
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    body{
        background-color: #181818;
        color: #fff;
    }
    .header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 0;
        border-bottom: 1px solid #333;
        position: sticky;
        top: 0;
        background-color: rgba(24, 24, 24, 0.95);
        z-index: 100;
    }
    .logo{
        font-size: 20px;
        font-weight: bold;
    }
    .nav-links{
        display: flex;
        gap: 25px;
    }
    .nav-link{
        color: #fff;
        text-decoration: none;
        transition: color 0.3s;
    }
    .nav-link:hover{
        color: #ff4d4d;
    }
</style>