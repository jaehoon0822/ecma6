// ArrayObject 에 총 9가지의 method 를 추가했다.

/** from(): create Array Object */
// 새로운 Array Object 를 생성하고 callback function 에서 
// 반환된 값을 엘리먼트 값으로 설정하여 반환한다.

//
// Array.from()
// --------------------------------------------------------------------
// parameter: Object   |  반환 대상, Array-like, iterable Object
//            Function | ( 선택 ) 배열 엘리먼트마다 호출할 함수
//            Object   | ( 선택 ) 두번째 파라미터 함수에서 this 로 참조할 오브젝트
// --------------------------------------------------------------------
// return:    Array
// --------------------------------------------------------------------
//

let arrayObj = Array.from( {0: 'zero', 1: 'one', length: 2 } );
console.log( Array.isArray( arrayObj )); // true
console.log( arrayObj ); // [ 'zero', 'one' ]

let stringObj = Array.from( 'ABC' );
console.log( stringObj ); // [ 'A', 'B', 'C' ];

// 간단하다 Array-like 혹은 iterable 객체를 Array 로 바꿔준다.
// 이는 2개의 파라미터를 더 추가하면 더 유동성있게 사용 가능하다.
// 그 2개의 파라미터는 Function 과 Function 의 this 값이 될 Object 이다.

arrayObj = Array.from( {0: 1, 1: 2, length: 2 }, function( value ) {
    switch ( value ) {
        case 1:
            value = this.bouns;
            break;
        case 2:
            value = this.show;
            break;
        default:
            console.log( 'error: notFound' );
    }
    return value;
}, { bouns: 10, show: 11 } );

console.log( arrayObj ); // [ 10, 11 ]
// 여기서 중요한 점은 array-like 객체의 값을 
// function 의 parameter value 에 대입한다는 것이다.

// 3번째 파라미터를 this 로 가진 function 을 사용하였다.
// Array-like 객체의 값을 변경하고, array 로 반환했다.

/** of(): 배열 엘리먼트 설정 */
// Array.of()
// --------------------------------------------------------------------
// parameter: Any   |  items, 배열 엘리먼트 값, 다수 지정 가능 
// --------------------------------------------------------------------
// return:    Array
// --------------------------------------------------------------------

// parameter 에 새로운 배열의 엘리먼트에 설정할 값을 작성.
// 콤마로 구분하여 다수를 작성할 수 있다.
// Array.form() 은 parameter 에 Array-like 또는 iterable Object 를 지정하지만,
// Array.of() 는 parameter에 값을 지정한다.
arrayObj = Array.of( 1, 2, 3 );
console.log( arrayObj ); // [ 1, 2, 3 ]

/*** copyWithin(): 범위 값 복사, 설정 */
//
// 인덱스 범위의 값을 복사하여 같은 배열의 지정한 위치에 설정한다.
// 
// Array.prototype.copyWithin()
// --------------------------------------------------------------------
// parameter: Number   |  target, 복사한 값을 설정할 시작 인덱스
//            Number   | ( 선택 ) 복사 시작 인덱스, 디폴트 0
//            Number   | ( 선택 ) 복사 끝 인덱스 
// --------------------------------------------------------------------
// return:    Array
// --------------------------------------------------------------------

// 두 번째 파라미터는 선택으로 배열의 엘리먼트 값을 복사할 시작 인덱스를 작성하며,
// 디폴트 값은 0 이다.
// 세 번째 파라미터는 선택으로 배열의 엘리먼트 값을 복사할 끝 인덱스를 작성한다.
// 여기서 주의 해야할점은 length 값으로 계산하기에, 끝 인덱스 바로 앞에 있는 인덱스를 선택한다.
// 또한 끝 인덱스를 설정해 주지 않으면, 복사값을 설정할 시작 인덱스 ( first parameter ) 에
// 복사 시작 인덱스 (second parameter ) 부터 인덱스 끝까지 복사해 대입한다.
// 아래의 예시를 보면 더 정확히 알수 있다.
// 처음에 약간 헷갈리기도 하다.

let one = [ 1, 2, 3, 4, 5 ];
console.log( one.copyWithin( 0, 3 ) ); // [ 4, 5, 3, 4, 5 ]

let two = [ 1, 2, 3, 4, 5 ];
console.log( two.copyWithin( 2, 3, 5 ) ); // [ 1, 2, 4, 5, 5 ]

let three = [ 1, 2, 3, 4, 5 ];
console.log( three.copyWithin( 3 ) ); // [ 1, 2, 3, 1, 2 ];

// 다음 예시를 보자
let arrayLike = { 0: 'ABC' , 1: "DFE", 2: "가나다", length: 3 },
    one1 = Array.prototype.copyWithin.call( arrayLike, 0, 1 );

console.log( one1 ); // Object { '0': 'DFE', '1': '가나다', '2': '가나다', length: 3 }
// 자꾸 헷갈리다.
// 내용은 아는데, 익숙하지 않아서 예상했던 결과가 아닌 다른 결과가 나온다.
// 하지만 내용은 안다. 참.. 이런경우가 머리가 아플때가 많다.
// 간단한 내용인데, 이해는 가는데 뭔가 꼬인다...
// 일단 위의 결과를 보면 간단하다 0 번째에 1번째 property 를 대입한다.
// 여기서 중요한건, end 값을 설정하지 않았다. end 값은 자동적으로 3번째 parameter 가 된다.
// 그러므로, 1 부터 2까지 복사해서 0 과 1에 값을 대입한다는 것이다.
// 이부분이 자꾸 헷갈린다. 아는 내용인데 머리에서 안끄집어내 진다.
// 뭐.. 익숙해지면 걍 쓰게 되겠지...
// 명심하자. 설정한 1개의 parameter 만 바꾸지 않는다.
// 범위를 지정해서 해당 위치에 범위를 대입한다. 여기서 말하는 위치는 1개를 설정하지만, 1개 + 알파가 될수 있다. 
// 왜냐하면, 범위를 대입하기에 대입할 인덱스에서 + 알파 된 부분까지 범위를 덮어씌우게 되기 때문이다.

function two2() {
    return Array.prototype.copyWithin.call( arguments, 3, 0, 2 );
}
console.log( two2( 1, 2, 3, 4, 5 )); // { '0': 1, '1': 2, '2': 3, '3': 1, '4': 2 }

/** fill(): 범위 값 변경 */
//
// Array.prototype.fill();
//
// --------------------------------------------------------------------
// parameter: any      | 설정할 값 
//            Number   | ( 선택 ) start, 시작 인덱스
//            Number   | ( 선택 ) end, 끝 인덱스
// --------------------------------------------------------------------
// return:    Array
// --------------------------------------------------------------------
//

// 이는 간단하다 file 을 사용하면 배열의 인덱스 부분을 해당 값으로 채운다.
// 이때 index 의 범위를 지정할 수 있다.
// 이는 copyWithin 과 비슷하다. start index 와 end index 를 지정하면 된다.

let one3 = [ 1, 2, 3 ];
console.log( one3.fill( 7 ) ); // [ 7, 7, 7 ]
// 만약 설정할 값만 지정했으면 ( first parameter ), 범위를 지정하지 않았으므로,
// 모든 값이 전부 설정한 값으로 바뀐다. 뭐 이는 규칙이다.

let two3 = [ 1, 2, 3, 4, 5 ];
console.log( two3.fill( 7, 2 )); // [ 1, 2, 7, 7, 7 ]
// 이 역시 copyWithin 과 비슷한것이, end 값을 지정하지 않으면,
// 설정한 값이 start index 지점부터 끝까지 적용된다.

let three1 = [ 1, 2, 3, 4, 5, 6 ]; // [1, 2, 3, 7, 7, 6 ];
console.log( three1.fill( 7, 3, 5 ));
// 항상 end index 는 length 값을 기준으로 삼는 것 같다.
// 그러므로 end index - 1 한 값 ( end index 앞의 값 ) 까지 설정한 값이 대입된다.

// 기억하자. 다른 언어는 모르겠지만, 일단 javascript 에서 범위를 지정한다면,
// end 값이 없을때 자동으로 끝까지 범위를 지정하는 듯하다.

/** entries(): Create Iterator Object  */
//
// Array.prototype.fill();
// --------------------------------------------------------------------
// return:    iterator
// --------------------------------------------------------------------
//
// iterator Object 는 { key: value } 형태이며, index 가 key 가 되고,
// 배열의 element 값이 value 가 된다.

let values = [ 10, 20, 30 ],
    iterator = values.entries();
console.log( 'iterator.next: ', iterator.next() );
console.log( 'itertor: ', iterator );

for ( let [ key, value ] of iterator ) {
    console.log( key, value );
}

// Array.prototype.entries()

values = [ 10, 20, 30 ];
iterator = values.entries();

console.log( iterator.next() ); // value: [0, 10]
//
// 재미있는 code 이다.
// iterator.next() 하면, value 값에 2개의 값이 들어있는 것을 알수 있다.
// 이는 기존의 array[Symbol.iterator]() 를 통해 만든 iterator obejct 와는 다른 형태이다.
// array[Symbol.iterator]() 의 iterator object 에서는 value 값에 값 1개만 존재하기 때문이다.
// 하지만 entries() 를 사용해 terator 를 만들면 value 값이 배열로 변경된다.
// iterator.next() 를 사용하면 [ 0, 10 ] 을 반환한다.
// 여기서 0 은 index 값이고, 10 은 value 값이다.
// index 까지 고려한 배열을 만들어 준다.

for ( let [ key, value ] of iterator ) {
    console.log( "for-of: ", key, value ); // for-in 1 20
                                           // for-in 2 30 
}

//
// 여기서 재미있는 상황이 나온다.
// 우리가 앞에서 배운 destructuring 을 사용하면 iterator 가 반환한 배열에서
// 값을 변수에 대입할 수 있다.
// for-of 문을 사용하여 iterator 의 value 값을 destructuring 한 key, value 변수에
// 대입하여, 해당 index 와 vlaue 값을 쉽게 구한다.
//
// ( 위의 값에서 0 10 이 제외된것을 볼 수 있다.  이는 앞서 iterator.next() 를 실행하여
// 다음 vlaue 로 넘어갔기 때문이다. )
//

values = [ 10, 20, 30 ];

for ( let i in values ) {
    console.log( 'for-in: ', i, values[ i ] );
}

//
// for-in 문으로도 동일한 결과를 나타낼수 있다.
// 하지만 이는 iterable object 의 장점을 살리지 못했을 뿐더러,
// 객체(Object) 에 맞는 방식이다.
// 이는 key 값을 받아 values[ key ] 에서 
// 값을 받는 형태이다.
// 사실 이렇게 해도 상관없다. 내 개인적으로는 이러한 식의 방법이 더 익숙하다.
// 하지만 destructur 방식과 for-in 문 iterable object 를 활용하는것이
// 장기적으로 봤을때 활용도가 높을것 같기는하다.
// 아직 쉽게 쉽게 쓰기에는 부족한 실력이지만...
//

//
/** Array.prototype.keys() */
//
// 이는 말그대로 index 값을 내놓는다.
// 이 역시 iterator 와 연관되어 있다.
// 해당 Array 를 iterator object 로 만들지만,
// enteries 와는 다르게 value 값이 index 값이다.
// 앞에서 살펴보았지만, enteries() 에서는 value 값이 [ index, value ] 이다.
// 아래 예시를 보자.

iterator = [ 10, 20 ,30 ].keys();
for ( let i of iterator ) {
    console.log( 'key: ', i ); // key: 0
                               // key: 1
                               // key: 2 
}

// iterator.next() 를 해보면 객체의 value 값이 index 값 하나만 있는것을 알수 있다.
// 물론 위와 같이 for-of 문을 사용해 나열 가능하다.

//
/** Array.prototype.values() */
// 위를 보았다면 이 역시 예상가능하다.
// 이번엔 key 값이 아닌 value 값을 반환한다.
// Array 를 iterator 화 시킨후 next() 해보면
// value 값이 Array의 value 값을 가지고 있음을 알수 있다/
//
console.log( '.....................................' );

iterator = [ 10, 20, 30 ].values();
console.log( "values: ", iterator.next() );

for ( let val of iterator ) {
    console.log( "values: ", val );
}
//
// 사실 이 값은 Array[Symbol.iterator]() 를 사용해 반환하는
// value 값과 같다.

iterator = [10, 20, 30][Symbol.iterator]();
console.log( "Symbol.iterator: ", iterator.next() );

for ( let val of iterator ) {
    console.log( "Symbol.iterator: ", val );
}

//
/** find(): element 값 비교, 반환 */
//
// callback 함수에서 true 를 반환하면,
// 처리 중인 배열 인덱스를 반환한다.
//
// callback 함수에서 true 를 반환하면 처리중인 배열 index 를 반환한다.
//

let arr = [ 10, 20, 30 ];
result = arr.find( function( val, index, obj ) {
    return val === 10;
} );

console.log( result ); // 10;

result = arr.find( function( val, index, obj ) {
    return val === this.val;
}, { val: 30 } );

console.log( result ); // 30

/** Array.prototype.findIndex() */

arr = [ 10, 20, 30, 40, 50 ];
result = arr.findIndex( function( val, index, obj ) {
    return val === 20;
});

console.log( result ); // 1 ( index 값 )

result = arr.findIndex( function( val, index, obj ) {
    return val === this.val;
}, { val: 50 } );

console.log( result ); // 4 ( index 값 )

