// species 의 개념 ( 종( 영화 species 를 생각해라. ) )
//
// Symbol.species 는 constructor 를 반환한다.
// constructor 를 반환한다는 것은 constructor 로 
// instance 를 생성하여 반환하는 것과 같다.
// Symbol.species 를 override 할수 이다. 
// 개발자 코드로 반환되는 인스턴스를 변경할 수 있다.
// species 의 개념을 살펴보고 species 사용 형태를 살펴보자.
//

let arrayObj = [ 1, 2, 3 ];
let sliceOne = arrayObj.slice( 1, 3 );
let sliceTwo = sliceOne.slice( 1, 2 );

// 재미있는 개념이다.
// 우리는 찰스다윈이 되어서 종의 기원을 찾는 방법을 species 로 
// 알아낼수 있다.
// 위의 코드를 한번 생각해보자.
// arrayObj 는 Array 의 instance 이다.
// 이는 __proto__  를 통해서도 알수 있는데,
// __proto__ 의 constructor 가 Array 이며,
// Array 의 prototype 객체에 링크되어 있다.
// 그렇기에 Array 의 instance 는 
// Array Oject ( prototype 에 없는 ) 고유 의 property 나 method 는 사용하지 못한다. 
//
// 자! 그럼 arratObj 는 instance 인것이 확실해 졌다.
// 그럼 다르게 생각해보자.
// 만약, instance 에 연결된 property 를 사용하여,
// 새로운 instance 를 만들게 되면, 과연 그 instance 의
// constructor ( 생성자 ) 는 누가 되는가?
// 위의 코드를 살펴보면,
//
// let sliceOne = arrayObj.slice( 1, 3 );
// 
// 는 arrayObj 의 instance 에서 link 되어 있는
// slice method 를 사용하여, 새로운 배열을 반환한다.
// 여기서 우리는 이렇게 생각할 수 있다.
// arrayObj 에서 1 번째 부터 3번째 앞에 있는 값들을
// 분리해서 반환되어 나열한다.
// 그러므로, arrayObj 에서 파생된 값이다.
// 이는 맞는 말이기도 하다. 그러므로 arrayObj 의 instance 일까?
// 하지만, 개념은 약간 다르다.
// sliceOne 에 할당 될 것은 Array 의 instance 이다.
// slice() 를 호출하는 arrayObj 인스턴스와 slice() 결과가
// 할당된 sliceOne 인스턴스는 모두 인스턴스로 차이가 없다. 
// 다만, 배열의 엘리먼트 값이 다를뿐이다.
//

// 여기서 중요한점은 Array instance 의 slice() 를 호출하면
// slice() 실행 결과가 반영된 Array 인스턴스가 반환된다는 점이다.
// Array instance 가 반환되므로, Array prototype 이 링크된 __proto__
// 에서 계속 slice 를 사용할수 있다.
//

class ExtArr extends Array {
    getValue() {}
}

let extArray = new ExtArr( 1, 2, 3 );
console.log( extArray.__proto__.constructor.name ); // ExtArr

let instArray = extArray.slice( 1, 3 );
console.log( instArray.__proto__.constructor.name ); //ExtArr
//
// 둘다 constructor 가 ExtArr 이다.
// 즉 같은 종( species ) 이다.
// 종의 기원을 찾는 property 이다.
// 

/** species */
// Symbol.species 는 constructor 를 반환한다.
//

// Symbol.species 는 static 엑세서 프로퍼티로 getter 만 있고,
// setter 는 없다. Array, Map, Set, Promise, RegExp, ArrayBuffer, TypedArray 오브젝트에
// Symbol.species 가 builtIn 으로 포함되어 있다.
//




 