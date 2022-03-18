<template>
    <div class="viewport">
        <index></index>
    </div>
</template>
<script lang="ts">
    import { defineComponent } from '@vue/composition-api';
    import Index from '@/pages/index.vue'
    export default defineComponent({
        name: 'App',
        components: {
            Index
        }
    });
</script>
<style lang="less" scoped>
    .viewport {
        height: 100%;
        box-sizing: border-box;
        overflow: auto;

        .demo-header {
            @svg square {
                @rect {
                    fill: var(--color, black);
                    width: var(--size, 100%);
                    height: var(--size, 100%);
                }
            }

            color: #2C3E50;
            overflow: hidden;
            text-align: center;
            font-size: 30px;

            &:before {
                content: " ";
                display: block;
                width: 100%;
                height: 1px;
                /* px */
                background: svg(square param(--color green));
            }

            &:after {
                content: " ";
                display: block;
                width: 100%;
                height: 1px;
                /* px */
                background: svg(square);
            }

            .image {
                margin-top: 60px;
            }
        }
    }
</style>
