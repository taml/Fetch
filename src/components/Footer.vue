<script setup>
</script>

<template>
    <footer>
        <div class="footer-credits">
            <p>Created by Tamsin L-P.</p>
        </div>
        <div class="footer-links">
            <ul>
                <li><p>Dog Charities</p></li>
                <li><a href="https://www.guidedogs.org.uk/" target="_blank">Guide Dogs</a></li>
                <li><a href="https://www.thinbluepaw.org.uk/" target="_blank">Thin Blue Paw</a></li>
                <li><a href="https://hollyhedge.org.uk" target="_blank">Holly Hedge</a></li>
                <li><a href="https://www.bluecross.org.uk/" target="_blank">Blue Cross</a></li>
            </ul>
        </div>
    </footer>
</template>

<style>
    footer {
        display: flex;
        justify-content: space-between;
        padding: 20px;
        width: 100%;
    }

    .footer-credits {
        flex-grow: 1;
    }

    .footer-links {
        flex-grow: 1;
    }

    .footer-links ul {
        display: flex;
        justify-content: space-between;
        list-style-type: none;
        margin: 0;
        padding: 0;
    }
</style>