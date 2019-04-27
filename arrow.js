// new operator
// arrow 함수는 new 연산자로 인스턴스를 생성하지 못한다.
let get = () => 123;
console.log( get() ); // 123
// prototype 에서 constructor 로써 생성한 함수를 참조하는 일반함수와는 다르게
// arrow 함수는 prototype 이 없으므로 constructor 도 존재하지 않는다.
// 하지만 __proto__ 를 통해 function Object 를 참조하므로,
// function Object 에 있는 property 및 method 를 사용가능하다.
// 즉 arrow 함수는 특별한 함수이다. 

// 3.6 arguments 사용

let sports = () => {
    try {
        let args = arguments;
    } catch ( error ) {
        console.log( '사용 불가' );
    }
}

sports(1, 2, 3);// 사용 불가

// arrow 함수에는 arguments 가 존재하지 않는다.
// arrow 함수에서 arguments 를 사용하면 ReferenceError 가 발생한다.
// ES6 에서는 argumets 대신에 rest parameter 를 사용한다.
// rest 는 rest parameter 에서 설명한다.

// 3.7 this 와 setTimeout()

let Sports = function() {
    this.count = 20;
}

Sports.prototype = {
    plus: function() {
        this.count += 1;
        console.log( this.count );
    },
    get: function() {
        let that = this;
        setTimeout(function() {
            console.log( 'get: ' + that.plus() );
        }, 1000)
    }
};

let newSports = new Sports();
newSports.get();

// 내가 알기로는 함수안에 함수를 만들면 this 는 window 를 향한다.
// 객체안의 함수안에 함수는 this 가 객체를 향하지 않는다.
// 그러므로 위의 setTimeout 은 당연히 this 값이 window 이다.(browser 일때...)
// 그렇다면 현재 사용해야할 객체를 여전히 this 로 참조하고 싶다면 위처럼 변수에 this 값을
// 저장하여 사용하면 된다.
// 이것은 일반함수를 사용할때의 상황이다.
// arrow 함수에서는 이러한 복잡한 과정 없이 그냥 자신을 감싼 함수의 객체를 this로 
// 가진다면 얼마나 편할까?
// 뱌로 이러한 점이 arrow 함수의 장점중 하나이다.

// arrow function and setTimeout()


Sports = function() {
    this.count = 20;
}

Sports.prototype = {
    plus: function() {
        this.count += 1;
        console.log( this.count );
    },
    get: function() {
            setTimeout( () => {
            console.log( this );
            console.log( this.plus() );
        }, 1000)
    } 
};

newSports = new Sports();
console.log( newSports.get() );

