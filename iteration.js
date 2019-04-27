/** iteration is iterator and iterable */

// Strign, Array, Map, Set, TypedArray( == ArrayLike), Arguments, NodeList, HTMLElementCollection
// 는 iterable 하다.
// 즉, key 가 숫자로 인해 나열할수 있으며,
// 이를 반복실행 가능한 객체를 iterable object 라고 명명한다.

// ex) Object 는 나열할수 없다. ( key 값이 string 이므로.. )
//     function 은 나열할 수 없다. ( function 은 내용을 변경하는 특별한 객체이므로.. )
// 반면, arraylike 객체들은 나열가능하다. ( key 값이 숫자이므로 예상가능한 key 값을 내놓는다. )
// 이러한 arrayLike( Array and String 을 포함한.. ) 객체들에 ecma6 에서는
// Symbol.iterator 메서드를 추가했다.
// 이는 built in function 으로 이러한 iterator 가 있다면 해당 객체는 iterable Object 라고 한다.

let arrayObj = [];
let result = arrayObj[Symbol.iterator];
console.log( result ); // function ( native value )
console.dir( result ); // __proto__ ->> .. Symbol.iterator ..
// array 는 iterable object 이다.

let objectObj = {};
let objResult = objectObj[ Symbol.iterator ];
console.log( objResult ); // undefined
console.log( objResult ); // __proto__ ->> .. Symbol.iterator 가 존재하지 않는다..
// Object 는 iteraable Object 가 아니다.


