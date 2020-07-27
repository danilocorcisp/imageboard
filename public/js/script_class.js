console.log("insanity check");

new Vue({
    el: '#main',
    data: {
        // this properties is going to be reactive.when they change, the page change
        name: "Vanilla",
        seen: false,
        cities: []


    },
    mounted: function () {
        console.log("my Vue component has mounted!");
        console.log("cities: ", this.cities);
        console.log('before axios', this);
        var self = this;
        axios.get('/cities').then(function (response) {
            console.log('response: ', response.data);
            console.log('after axios', this);
            self.cities = response.data;
        }).catch(err => {
            console.log('err: ', err);
        });


    },
    methods: {
        petesMethod: function (city) {
            console.log("Timão ê ô");
            console.log("city: ", city);
            this.seen = true;
        }
    }
});