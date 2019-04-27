// spread 는 iterable object 를 하나씩 분리하여 전개한다.
// 전개하는 방식은 [... name] or function( ... name ) {} 이다.
let one = [11, 12],
    two = [20, 21],
    arrayObj = [51, ...one, 52, ...two ];

console.log( arrayObj ); // [ 51, 11, 12, 52, 20, 21 ];

// spread operator 는 dot( . ) 을 3개 사용하여 작성한다.
// 그리고 이어서 iterable 객체를 적어주면 spread operator 를 사용할 수 있다.

// !. 중요한건 iterable object 를 사용해야 한다는 것이다.
//    이는 spread 특성상 iterable object 를 하나씩 분리하여 전개하기 때문이다.


// function 의 parameter 로 spread operator 를 사용할 수 있다.
// 이역시 iterable object 를 분리하여 전개하기에 가능한것이다.

function add( num1, num2 ) {
    return num1 + num2;
}
console.log ( add( ...one ) ); // 23
// 문제 없이 잘 작동한다.

// 이는 위의 add function 의 인자로 ...one 을 대입했다.
// 그러므로 spread operator 가 one Array 의 값을 11 과 12 로 분리하고,
// 이를 ...one 위치에 값으로 전개한다.

// ( 이는 정확한 내부동작을 보지 못해, 완벽한 설명이 불가능하다.
// 책에서는 위와 같이 작동한다고 이야기 하므로,
// 추상적으로 위와 같이 생각하겠다. )

/** String */
// String 역시 iterable Object 이다.
// 그러므로 spread operator 로 전개 가능하다.

let spreadObj = [ ..."music" ];
console.log( spreadObj );// [ 'm', 'u', 's', 'i', 'c' ]
// 이 역시 "music" 이라는 문자열을 하나씩 분리한후 spreadObj Array 에 전개하였다.


/** Function Parameter */
// 이는 위에 설명하긴 했지만, 책에서 설명이 나와 작성한다.

const values = [ 10, 20, 30 ];
get ( ... values ); // 10, 20, 30

function get( one, two, three ) {
    console.log( one, two, three );
}

// 위의 function add 설명과 같다.
// 추가되는 내용은 위와 같이 함수에 전개된 spread operator 를
// spread parameter 라 한다고 적혀있다.
// 많이 사용하는 문구라 위와 같이 얘기한다고 생각하면 좋을 듯 싶다.
// javascript 가 함수형을 지원하므로, 많이 사용하는 문구로써 알아두면 좋을듯 싶다.

// ( 근대 내가 잘못이해 했나?
//  함수에 있는 parameter 부분이 바로 변수를 저장하는 곳이고,
//  함수호출하는 부분의 값 입력부분이 arguments 로 알고 있는데..
//  여기서는 arguments 를 parameter 라고 한다.. )


/********* rest parameter */

// 호출받는 함수의 parameter 에 function ( ...rest )와 같이 spread operator 로 parameter 를
// 작성한 형태를 rest parameter 라고 한다.
// ( rest 는 휴식이라는 뜻도 있지만, 나머지라는 뜻도 있다. 여기서는 나머지라는 뜻으로 쓰인다.
//   그러므로, 간단하게 생각하면 설정한 값의 나머지를 뜻하는 문구일것이다.)
// 이는 arguments 대용으로 나온 operator 인것 같다.
// 우리는 parameter 에 적용된 값이외의 값을 가져올때 argumets 를 사용했다.
// arguments 는 모던자바스크립트에서 사용하지 strict 모드에서 사용하지 못하게 했을정도로
// 사용을 자제시키고 있다.
// 이러한 arguments 의 대체 operator 라는 생각이 든다.
// 게다가 이는 arrayLike 가 아닌 array object 를 반환한다.
// 편의상 ...rest 라는 name 을 사용했지만, 이는 언제든지 변경해도 된다.

let getRest = ( ...rest ) => {
    console.log( rest ); // [1, 2, 3];
    console.log( Array.isArray( rest )); // true
}

getRest( 1, 2, 3 );

// 밑의 arguemnts 와 비교해보자.

let getArgs = function() {
    console.log( arguments ); // [ '0': 1, '1': 2, '2': 3 ];
    console.log( Array.isArray( arguments )); // false
}
getArgs( 1, 2, 3 );

// arguments 는 arrayLike object 를 반환하며,
// Array 가 아니다.
// 이는 중요한 차이점으로 Array 의 property 및 method 를 사용할 수 없으므로,
// 따로 가공해야하는 귀찮음이 존재한다.
// ex) Array.prototype.slice.call( arguments );
// rest parameter 는 이러한 부분을 더 편하게 만들어준다.

// ...rest 뿐만아닌 확정된 parameter 를 넣는것도 쉽게 가능하다.
// 여기서는 ...rest 가아닌 다른 이름으로 적용해 보겠다.

getRest = ( one, ...restName ) => {
    console.log( one ); // 1
    console.log( restName ); // [ 2, 3 ]
}
getRest( 1, 2, 3 );
// one 에 1 이 적용되며 나머지부분은 전부 ...restName 에 적용된다.

// --- spread 와 rest parameter 의 구분 --

// 위에 arguments 와 parameter 에 대한 의문을 적어놓았었다.
// 물론 arguments 를 이책에서는
// 호출하는 parameter 로 구분하며, 내가 이해한 parameter 를 호출받는 parameter 로서 구분하는 듯 싶다.
// 여기서 spread 는 말그대로, 배열을 분리하여 전개한다.
// 그러므로, spread parameter 는 호출하는 함수에 적용한다.
// rest 는 spread 의 반대이다.
// 호출받는 함수에서 값을 받으면, parameter 가 없는 나머지 부분을 배열형태로 만들어 ...rest 에 적용한다.
// 그러므로, 이는 함수를 받는곳에 적합하다.
// 이러한 차이점을 잘 알아두어야 할것이다.
// 하지만 역시 의문이다. arguments 가 호출하는 paramerter 아닌가?

// --------------------------------------------

// Array-like
// array 는 아니지만 마치 array 같이 생긴 object 를 array-like 라고 한다.
// 예전에 이부분때문에 맨붕온적이 있었다.. ( 하긴.. array 를 그냥 쓰면 될텐데 array-like 왜 쓰는지 이해가 안갔으니.. 
//                                    하지만 지금은 이해하고 있다. 이런식으로 쓰는 곳이 상당히 많더라.. )
// 이러한 array-like 는 ES6 에서 사용하는 공식용어이다.

let valuesObj = { 0: 'zero', 1: 'one', 2: 'two', length: 3 };

// 마치 배열처럼 동작한다.
// 심지어 length 까지 두어서 직접확인하기 전에는 ( __proto__ 및 constructor 및 Array.isArray(), method, porperty 같은 ) 
// 확인이 힘들다.
// 이 처럼 object 이면서, Array 의 특징을 가진 객체를 array-like 라고 부른다.
// vlaues['0'] 처럼 읽는것 역시 가능하다.
// 같은 array 구조를 만들어서 비교해보자.

let valuesArr = [ 'zero', 'one', 'two' ],
    i;

for ( i in valuesObj ) {
    console.log( i, valuesObj[ i ] ); // 0 zero 1 one 2 two length 3 
}
console.log( 'length: ', valuesObj.length ); //3
for ( i in valuesArr ) {
    console.log( i, valuesArr[ i ] ); // 0 zero 1 one 2 two
}
console.log( 'length: ', valuesArr.length ); // 3

// 이러한 방식이다.
// 비록 valuesObj 에서 length proepry 가 읽혀서 결과는 약간 다르지만
// valuesArr 과 값이 거의 같다.
// ( Object.definedProperies 를 사용하여, enumerable 속성을 false 로 한다면,
// Array 처럼 length 속성이 나열되지 않게도 만들수 있다. 다른방법으로 for 문을 사용하면
// length property 의 값을 숫자로 읽지 못하게 된다. 그러므로, length 값은 읽는 값에서 제외된다. )
// 게다가, length 값을 넣어 해당 값이 몇개 있는지 역시 파악 가능하다.

// array-like 에 대해 설명한 이유는 간단하다.
// 바로 arguments 와 rest parameter 의 차이가 무엇인지 설명하기 위해서이다.
// 이는 위에 적어놓았다.
// 저자가 나와 똑같은 생각으로 rest 가 더 사용하기 편하다고 권장한다.
// 하지만 내가 생각못했던 것역시 있다.
// 이부분역시 전적으로 공감가는 부분이다.
// 사실 arguments 를 사용하면서 불편한점을 파악못했다는것은 그만큼 javascript 가
// 내것이 아니라는 반증일 것이다.
// 저자는 이렇게 말한다.
// arguments 객체를 사용해야 하는지 아닌지는 코드를 보고 판단해야 한다.
// 이는 비효율적이다. 하지만 rest parameter 는 위에 몇시되어 있는 parameter 만을 보고
// 판단 가능하다.
// 간단히 말하면 나머지 parameter 를 허용하는지 안하는지에 대한 부분을 쉽게 판단가능하다.
// array 객체를 바로 사용할 수 있다는 점역시 아주 큰 장점이다. 이부분은 내 생각과 동일하다.
// 사실 조금이라도 javascript 를 공부해보았다면, 쉽게 공감가는 내용이다.
