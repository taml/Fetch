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
        background: #deedf4;
        padding: 10px;
        width: 100%;
        font-family: 'Londrina Solid', sans-serif;
    }

    @media screen and (max-width: 960px) {
        footer {
            text-align: center;
            flex-direction: column;
            padding: 20px;
        }
    }

    .footer-credits {
        flex-grow: 1;
        color: #393352;
        padding-left: 10px;
        padding-right: 10px;
    }

    @media screen and (max-width: 960px) {
        .footer-credits {
            margin-bottom: 10px;
        }
    }

    .footer-links {
        flex-grow: 1;
        font-weight: 300;
    }

    @media screen and (max-width: 850px) {
        .footer-links {
            flex-wrap: wrap;
        }
    }

    .footer-links ul li:first-child {
        font-weight: 400;
        color: #393352;
    }

    .footer-links ul {
        display: flex;
        justify-content: space-between;
        list-style-type: none;
        margin: 0;
        padding: 0;
    }

    @media screen and (max-width: 850px) {
        .footer-links ul {
            flex-wrap: wrap;
            justify-content: center;
        }
    }

    .footer-links ul li a {
        text-decoration: none;
        color: #0B5B57;
        padding-left: 10px;
        padding-right: 10px;
        transition-timing-function: ease-in;
        transition: 0.5s;
    }

    .footer-links ul li a:hover {
        color: #897106;
    }
</style>