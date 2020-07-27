// function Rectangle(w, h) {
//     this.width = w;
//     this.height = h;
//     this.getArea = function () {
//         return this.width * this.height;

//     }

// }

class Rectangle {
    constructor(w, h) {
        // create "this"
        // we need 'this' because without 'this', we can't add properties
        // to the object that Rectangle will return
        this.width = w;
        this.height = h;

    }
    getArea() {
        return this.width * this.height;
    }
}

var r = new Rectangle(20, 45);
console.log(r, r.getArea());


class Mammal {
    constructor (h) {
        this.hair = h;
        this.eyes = 2;
        this.blood = 'warm';
    }
}

// Gato vai herdar tudo de mamifero
class Cat extends Mammal {
    constructor (h, n) {
        //calling constructor creates 'this' in my cat
        super(h);
        //super calls the constructor of the parent - mammal - and cat will have everything it have
        this.cute = true;
        this.name = n;
    }

}

var myCat = new Cat('red', "Xorume");
console.log(myCat);
