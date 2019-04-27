// extands
// ES5

// function Sports( member ) {
//     this.member = member;
// }
// Sports.prototype.getMember = function() {
//     return this.member;
// }

// function Soccer( member ) {
//     Sports.call( this, member );
// }
// Soccer.prototype = Object.create( Sports.prototype, {
//     setItem: {
//         value: function( item ) {
//             this.item = item 
//         }
//     },
//     setGround: {
//         value: function( ground ) {
//             this.ground = ground;
//         }
//     }
// } );

// Soccer.prototype.constructor = Soccer;
// let sports = new Soccer( 11 );
// console.log( sports.getMember() );

// sports.setItem( 'soccer' );
// sports.setGround( 'SangAam' );
// console.log( sports );
// 
// ES6

// class Sports {
//     constructor( member ) {
//         this.member = member
//     }
//     getMember() {
//         return this.memeber;
//     }
// };

// class Soccer extends Sports {
//     setItem( item ) {
//         this.item = item;
//     }
//     setGround( ground ) {
//         this.ground = ground;
//     }
// };

// let sportsObj = new Soccer( 11 );
// console.log( sportsObj );

// sportsObj.setItem( 'soccer' );
// sportsObj.setGround( 'SangAam' );
// console.log( sportsObj );

// extends 를 사용하여 위의 ES5 와 동일한 결과를 나타낸다.
// 참.. 애매하다
// 설명이 너무 어렵게 설명해 놓았다.
// 헷갈린다.
// 쉡게 생각해 보자..
// 일단, 위의 내부구조의 작동방식에 대해 이해한 대로 설명해 보자면,
// 일단 subClass 의 constructor 를 찾아본다.
// 하지만 존재하지 않으므로, SuperClass 의 constructor 를 찾고
// new 연산자로 호출할때 사용한 parameter 값을 constructor 의 parameter 값에 할당한다.
// this 값은 new opreator 로 생성된 객체를 향한다.
// 그러므로 new operator 로 만들어진 객체의 인스턴스로 member 가 추가된다.
// 그리고 sprotsObj 에 instance 가 할당된다.
// 
// 여기 까지가 할당되는 과정이다.
// 
// 그렇다면, instance 할당된후 obj 의 instnace 구조에 대해서 알아보자.
// 
// 인스턴스를 생성하는 주체는 subClass 이다.
// new Soccer() 로 인스턴스를 생성했다.
// SuperClass의 constructor 값이 instance 로 추가되었다.
// __proto__ 는 SubClass 의 prototype 을 참조하고,
// __proto__ __proto__ 는 SuperClass 의 prototype 을 참조한다.  
// 이러한 계층구조를 사용하여 method 를 찾는다.
// 만약, SubClass 에 method 와 SuperClass 의 method 가 같은 이름을 갖고 있다면,
// 위의 계층구조에 따라 SubClass 의 method 를 사용한다.
// 즉, 덮어 씌어져 버린다고 보면 된다.
// 이유는 이미 해당 method 를 SubClass 에서 찾았기에
// SuperClass 까지 찾을 필요가 없는 것이다.
// 이것이 바로 Javascript 의 상속 메커니즘 이다.
//
//
/** Super keyword */
//
// 앞전의 Javascript 의 상속 메커니즘에 따르면, 각 __proto__ 에 같은 이름이 존재한다면,
// 먼저 나오는 method 이름을 찾아 반환한다.
// 그렇다면, 그 이후에 나오는 찾지 못한 이름이 같은 method 를 호출 할수 없을까?
// ( 이는 SubClass 가 아닌 SuperCalss 의 method 를 찾는 것을 이야기 한다. ) 
//
// 그래서 Super Keyword 가 존재한다.
// SubClass constructor 에 super() 를 작성하면 SuperClass 의 constructor 가 호출된다.
// SuperClass 의 method 를 호출하면 super.name() 과 같이 super keyword 에 이어서 호출하려는
// method name 을 작성한다.
//
/** method overiding */
//
// class Sports {
//     setGround( ground ) {
//         this.ground = ground;
//     }
// };
// class Soccer extends Sports {
//     setGround( ground ) {
//         super.setGround();
//         this.ground = ground;
//     }
// };
// obj = new Soccer();
// obj.setGround( '상암구장' );

// console.log( obj );
// console.log( obj.ground );
//
// 
class Sports {
    constructor( member ) {
        this.member = member;
        console.log( this.member );
    }
}
class Soccer extends Sports {
    constructor( member ) {
        super( member );
        this.member = member;
        console.log( this.member );
    }
};

obj = new Soccer( 123 );
console.log( obj );
// 235p 를 보라
// 이것은 많이 많이 중요한 개념이다.
//