(function () {

    Vue.component('modal-component', {
        template: '#image-pop',
        props: ['id'],
        data: function () {
            return {
                image: {
                    id: null,
                    title: '',
                    description: '',
                    username: '',
                    url: '',
                    created_at: null,
                    comments: [],
                },
                sendComment: '',
                sendCommentAuthor: '',

            };
        },
        created: function () {
            console.log('created');
        },
        mounted: function () {

            var thisData = this;
            axios
                .get('/image-pop/' + thisData.id)
                .then(function (res) {

                    thisData.image = res.data;
                })
                .catch(function (err) {
                    console.log(err);
                });
        },
        methods: {
            handleClick: function (e) {
                e.preventDefault();
                var thisData = this;
                var sendComment = {};
                sendComment.image_id = this.id;
                sendComment.comment = this.sendComment;
                sendComment.username = this.sendCommentAuthor;
                console.log(sendComment);
                axios
                    .post('/comment', sendComment)
                    .then(function (res) {
                        console.log(res);
                        thisData.image.comments.unshift(res.data[0]);
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            },
            closeModal: function () {
                this.$emit('close', this.comments);
            },
        },
    });

    new Vue({
        el: '#main',
        data: {
            images: [],
            id: null,
            title: "",
            description: "",
            username: "",
            file: null,
            selectedImage: null,

        },
        created: function () {
            console.log('created');
        },
        mounted: function () {
            console.log('monted');
            var inner = this;
            axios
                .get('/images')
                .then(function (res) {

                    inner.images = res.data;

                })
                .catch(function (err) {
                    console.log(err);
                });
        },
        methods: {

            handleClick: function (e) {
                e.preventDefault();

                var formData = new FormData();
                formData.append('title', this.title);
                formData.append('description', this.description);
                formData.append('username', this.username);
                formData.append('file', this.file);

                var thisOfData = this;
                axios
                    .post('/upload', formData)
                    .then(function (resp) {

                        thisOfData.title = thisOfData.description = thisOfData.username = thisOfData.file =
                            '';
                        thisOfData.file = null;
                        thisOfData.images.unshift(resp.data[0]);
                    })
                    .catch(function (err) {
                        console.log('err in POST /upload:', err);

                    });


            },

            getMoreImages: function (e) {
                e.preventDefault();
                var thisData = this;
                var lastId = thisData.images[thisData.images.length - 1].id;
                axios
                    .get('/more/' + lastId)
                    .then(function (res) {
                        for (var i = 0; i < res.data.length; i++) {
                            thisData.images.push(res.data[i]);
                        }
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            },

            closeModal: function () {
                this.selectedImage = null;
            },

            clearInput: function () {
                this.title = this.description = this.username = "";
            },


            handleChange: function (e) {

                this.file = e.target.files[0];

            },



        },

    });
})();