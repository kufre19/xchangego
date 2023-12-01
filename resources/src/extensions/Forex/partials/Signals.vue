<template>
    <template v-for="(signal, index) in forexSignals" :key="index">
        <div v-if="signal != null" class="card max-w-xs">
            <div class="card-body">
                <span class="card-title">{{ $t("Signal") }} 1</span>
                <div class="data-doc-item data-doc-item-lg mx-auto my-1">
                    <div class="data-doc-image">
                        <img
                            v-lazy="'/assets/images/signal/' + signal.image"
                            class="img-fluid img-thumbnail"
                        />
                    </div>
                    <ul class="data-doc-actions">
                        <li>
                            <a
                                :href="'/assets/images/signal/' + signal.image"
                                target="_blank"
                                ><i class="bi bi-cloud-download"></i
                            ></a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </template>
</template>

<script>
export default {
    props: {
        forexSignals: {
            type: Object,
            required: true,
        },
    },
};
</script>
