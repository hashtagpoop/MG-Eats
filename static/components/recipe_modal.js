var RecipeModal = {

    props: [
        'notifications',
        'active'
    ],
    data() {
        return {
        }
    },
    methods: {
    },
    template:   `

    <div>

        <div class="swipe">
            <div class="swipe-wrap">
                <div v-for="(notification, index) in notifications">
                <h3 style="margin-bottom: 7px">
                    {{ notification.stock }}
                </h3>
                <p v-html="notification.text"></p>
                </div>
            </div>
        </div>

    </div>
    `

};