/**
 * Requirements of callee
 *
 * A ref to container
 * Container should be position fixed
 * Add Applicationable mixin
 * Add app prop
 * Must have data element named height
 * Call applicationable.mounted on mounted
 * Have a computed function for computedHeight and return this.height
 * updateApplication should call applicationable.updateApplication
 * Anytime the height changes, call applicationable.updateHeight(this)
 *
 */

class ApplicationableUtil {

    constructor(self) {
        this.self = self
    }

    mounted() {

        const self = this.self

        self.top = self.$vuetify.application.top
        self.height = self.$refs.container.clientHeight
        self.oldheight = self.height

        self.$vuetify.application.application.top.myappbar = self.height
        self.$vuetify.application.update("top")

        self.$refs.container.style.top = self.top + "px"

        self.$root.$on("recalc", async (e) => {
            if (e.diff > 0 && self.top >= e.top + e.diff) {
                self.top = self.top + e.diff
                self.$refs.container.style.top = self.top + "px"
            } else if (e.diff < 0 && e.top < self.top) {
                self.top = self.top + e.diff
                self.$refs.container.style.top = self.top + "px"
            }
        })
    }

    updateApplication() {

        const self = this.self

        const diff = self.height - self.oldheight
        self.oldheight = self.height

        self.$root.$emit("recalc", {
            diff: diff,
            top: self.top
        })

        return self.$vuetify.application.top + diff
    }

    async updateHeight() {

        const self = this.self

        await self.$nextTick()
        self.height = self.$refs.container.clientHeight
    }
}

export default ApplicationableUtil
