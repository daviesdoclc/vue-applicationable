import Applicationable from "vuetify/es5/mixins/applicationable"

/**
 * Requirements of callee
 *
 * - Must pass in a ref name of container (wrapping div of component)
 * - Anytime the height changes, call this.$applicationable.update()
 */

function ApplicationableUtil(module, container) {

    return {

        mixins: [
            Applicationable("top", ["computedHeight"])
        ],

        props: {

            app: {
                type: Boolean,
                default: true
            }
        },

        data() {

            return {
                applicationableTop: 0,
                applicationableHeight: 0,
                oldApplicationableHeight: 0
            }
        },

        computed: {

            computedHeight() {
                return this.applicationableHeight
            }
        },

        created() {

            this.$applicationable = {
                update: async () => {
                    await this.$nextTick()
                    this.applicationableHeight = this.$refs[container].clientHeight
                }
            }
        },

        mounted() {

            this.applicationableTop = this.$vuetify.application.top
            this.applicationableHeight = this.$refs[container].clientHeight
            this.oldApplicationableHeight = this.applicationableHeight

            this.$vuetify.application.application.top[module] = this.applicationableHeight
            this.$vuetify.application.update("top")

            this.$refs[container].style.top = this.applicationableTop + "px"

            this.$root.$on("recalcApplicationable", async (source) => {

                // console.log("soure.module: " + source.module + ", this.module: " + module
                //     + ", source.top: " + source.top + ", this.top: " + this.applicationableTop
                //     + ", source.height: " + source.height + ", this.height: " + this.applicationableHeight
                //     + ", source.diff: " + source.diff)

                if (source.diff !== 0 && this.applicationableTop > source.top) {

                    this.applicationableTop = this.applicationableTop + source.diff
                    this.$refs[container].style.top = this.applicationableTop + "px"
                }
            })
        },

        methods: {

            updateApplication() {

                const diff = this.applicationableHeight - this.oldApplicationableHeight
                this.oldApplicationableHeight = this.applicationableHeight

                this.$root.$emit("recalcApplicationable", {
                    module: module,
                    top: this.applicationableTop,
                    height: this.applicationableHeight,
                    diff: diff
                })

                return this.$vuetify.application.top + diff
            }
        }
    }
}

export default ApplicationableUtil
