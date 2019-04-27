let emptyMap = new Map();
let newMap = new Map( [
    [ 'key1', 'value1' ],
    [ 'key2', 'value2' ],
    [ 'key1', 'sports' ]
] );

for ( let val of newMap ) {
    console.log( val );
    // [ 'key1', 'sports' ]
    // [ 'key2', 'value2' ]
}

// 보면 알겠지만, Map prameter 가 iterable object 이어야 하므로,
// 대괄호 []를 작성하였다. 그 안에 [ 'key', 'value' ] 형태로 작성된다.
// key1 이 key 가 되고 value1 이 value 가 된다.
// 만약, key 값이 동일하다면 기존에 있던 값을 지우고 값을 추가하는 형태가 아니라
// key 값은 그대로 두고 value 만 수정한다.
// ES3 나 ES5 에서 이로인한 논란이 있었나보다.
// 원래 ES3 에서는 이름이 같아도 새로운 값이 추가되었으며,
// ES5 에서는 strict mode 에서는 추가되지 않았다고 한다.
// ES3 에서의 추가는 override 되는 형태이지 않았을까? 아니면 기존의 값을 지우고
// 새로 추가했던가... 내가볼때는 전자이지 않을까 싶다.. ES3 를 사용해 보지 않아서
// 확실치 않다.
// 만약 override 되는 형태라면, 이는 문제가 있을수 있다.
// 기존의 값은 그대로 두고 새롭게 동일한 key 값을 가진 프로퍼티가 존재한다는것은
// 객체의 메모리 낭비면이나, 관리하는 데도 문제가 있을듯 싶다.
// 그렇다고 기존의 값을 지우고 새로 추가한다면,
// 그만큼 엔진에 부담이 되는 과정이지 않을까도 싶다.
// ES5 strict mode 에서 동일한 키값을 가진 프로퍼티를 막는다는 것에어 알수 있다.
// 하지만, 기존의 key 값은 그대로 두고 value 값만 수정하는 좋은 알고리즘이 
// 있다면( 엔진에 부담이 덜가는 알고리즘이 있다면... ) 이는 아주 좋은 방법일 것이다.
// Map 이 바로 그러한 방식으로 사용된다.
// 이를 알려면 Map 의 코드를 보아야 할것같다.
//

// newMap: Map
// size( ... )
// __proto__: Map
//      entries: function entries()
//      ...
// [[Entires]]: Array[2]
//      0: { 'key1' => 'sprots' }
//          key: 'key1'
//          value: 'sprots'
//      1: { 'key2' => 'value2' }
//          key: 'key1'
//          value: 'value2'
//      length: 2 

// newMap 의 instance 구조이다.
// 재미 있는사실은 [[Entries]]: Array[2] 라는 것이다.
// Array.entries() 가 생각나는 구조이다.
// 실제로 __proto__ 에는 entries method 가 존재한다.
// 하지만 Array.entries() 와는 확연히 다르다.
// Array.entries 는 iterator Object 를 반환하며,
// 해당 iterator Object 의 next() 는 { vlaue: '' done: false/true }
// 형태를 반환한다.
// 하지만 newMap 은 마치 객체를 가진 배열을 가지고 있는듯하다.
// 앞서서 이야기 했던 부분을 생각해보자.
// newMap 은 같은 key 가 존재한다면 key 는 그대로 두고
// value 만 변경한다고 했다.
// 위의 instance 구조를 보면 확실히 알수 있다.
// 0 번째의 key1 의 원래 값은 value1 이었다.
// 하지만 새롭게 key1, sports 를 추가함으로
// 값이 변경되었다. 만약 기존의 key1 을 제거하고
// 새롭게 추가했다면, 순서는 1번째가 되었을 것이다.
// 하지만 0번째에 그대로 있으며 value 값만 변경된것을 확인할수 있다.
// ( 물론 queue 형태의 구조라면 말이다.. 사실 기존의 index 에 추가할수 있는
// 메커니즘은 상당히 많을것이다. 아주 단순하게 queue 형태로 말했는데 
// 이는 아닐수 있다. 그리고 위의 설명은 내 생각을 적은거지만 논리가 빈약하다.)

// 일단 위의 설명은 확실한 설명은 아니다.
// 그냥 이에 대해서 생각나는대로 적은것이다. 메커니즘이 queue 형태를 띈다고 가졍하는것도
// code 를 보며 분석한 것이 아니기에.. 매우 빈약한 설명이다.
// 그냥 이렇게 생각하자.
// new Map 은 임의로 숫자를 설정하여, 작성된 순서를 보장한다.
// 또한, 같은 key 이름을 가진 값을 추가하면 key 값은 그대로 두고 value 만 변경한다.
// 그러므로, 위의 key1 은 순서상 그대로 지켜지며, vlaue 만 수정된것을 확인할 수 있다.
// 

// 책에서는 이렇게 설명한다.
// 인덱스는 Map parameter 가 작성한 값이 아니며,
// 엔진이 파라미터의 이터러블 오브젝트에 작성한 순서로 인덱스를 부여한다.
// 따라서 작성한 순서대로 읽을수 있다.
// ( 그전에는 Object 를 읽을때 작성한 순서대로 읽기 보다는 브라우저마다 읽는 순서가 달랐던 것 같다. )
//
console.log( '-----------------------------------------' );

for ( let elem of newMap ) {
    elem.forEach( ( value, index, obj ) => {
        console.log( index, value );
    } );
}
for ( let [ key, val ] of newMap ) {
    console.log( key, val );
}

// 첫번째는 newMap 의 value 를 elem 에 할당한다.
// elem 은 배열이므로 forEach 를 사용할수 있다.
// 하지만 이는 순회하면서 index 값과 value 값을 Map 에서 의도한대로
// 이해하지 못하며, 단지 배열형태의 key 값과 value 를 반환한다.
// ( key 가 Key1 이 아니라 index 값인 0 이며, value 가 key1 이다. 
//  이는 배열이 숫자 인덱스와 값을 갖는구조로 인해 발생한다. )
//
// 하지만 destructuring 을 사용하여 해당 배열에서 키와 값을
// 변수에 할당하여 사용가능하다.
// forEach 를 사용하지 않아도 된다는 말이다.
//

try {
    new Map( ['one', 1 ] );
} catch ( e ) {
    console.log( '1: ', '[ one, 1 ]' );
} // error

try {
    new Map( {'one': 1 } );
} catch ( e ) {
    console.log( '2: ', '{ one: 1 }' );
} // error

try {
    newMap = new Map( [ { 'one': 1 } ] );
    console.log( newMap ); // { undefined => undefined}
} catch ( e ) {
    console.log( '3: ', '[ { one: 1 } ]' );
}

// set(): key 와 value 설정
//
// Map instance key 와 value 를 설정한다.
// 
console.log( '---------------------------' );
newMap = new Map();
newMap.set( 'one', 100 );
console.log( newMap.size );

newMap.set( {}, '오브젝트' );
newMap.set( function() {}, 'Function' );
newMap.set( new Number( 123 ), 'Instance' );
newMap.set( NaN, 'Not a Number' );
for ( let [ key, value ] of newMap ) {
    console.log( key, value );
}

// newMap.set 은 key 와 value 값을 설정한다.
// newMap.size 를 사용하면 Map instance 의 element 수를 반환한다.
// 이는 수정할수 없다. 만약 size 값을 수정하려 한다면,
// error 가 발생한다.
//

// key 값으로 어떠한 것이든 올수 있다.
// 심지어 Object, Function, Number, NaN, Array, undefined, Null, String 등등 말이다.
// newMap instance 를 for-of 문으로 반복하면 추가한 순서대로 전개된다.
//

console.log( '----------------------------' );
newMap = new Map();
newMap.set( 'one', 100 );
newMap.set( 'one', 123 ); // one 의 마지막 변경값을 value 에 변경

let sportsObj = { sports: '스포츠' };
newMap.set( sportsObj, 'sprotsObj' );
// sportsObj Object 를 key 로 사용
// 이는 참조값으로의 객체를 key 로 갖는다.
// 설명하자면, Object 의 Memory Address 를 key 값으로 사용한다는 것이다.
// 여기서 말하는 Memory Address 란 sportsObj 를 말한다.
// engine 은 { sprots: '스포츠' } 객체를 메모리에 설정하고,
// 이를 변수명 sportsObj 에 { sports: '스포츠' } 가 위치한 메모리 주소가 설정된다.
newMap.set( sportsObj, 'sprots Object-변경' ); // sportsObj 에 마지막 변경값을 vlaue 에 변경

newMap.set( {}, 'Object-1' ); // Object 를 키로 가짐
newMap.set( {}, 'Object-2' ); // Object 를 키로 가짐 ( 이는 다른 Object 를 사용하므로, 다른 key 를 가진다. )
                              // 고급지게 얘기하면 메모리 주소가 다르기에 value 가 대체되지 않는다.
 
for ( let [ key, elem ] of newMap ) {
    console.log( key, elem );
}

/** get(): key 가 같은 value 반환 */
//

// 말그대로 해당 key 를 주면 Map 에서 같은 key 값의 value 를 반환한다.
// 존재해지 않으면 udnefined 를 반환하며, key 의 값/타입 까지 체크한다.
// 예를 들어 123 이 key 값인데 get( "123" ) 을 하게되면 type 이 다르므로,
// 해당하는 key 를 찾지 못한다. 해당하는 key value 가 없으므로 undefined 가 반환된다.
//

newMap = new Map();
newMap.set( 'one', 100 );
console.log( newMap.get( 'one' ) ); // 100
console.log( newMap.get( 'two' ) ); // udnefined

sportsObj = { sports: '스포츠' };
newMap.set( sportsObj, 'Sports Object' ); 
console.log( newMap.get( sportsObj ) ); // Sprots Object

// 이는 위에 적은대로 출력된다.
// 뭐 별다르게 특별난 것 없는 code 이다.
// 이제 별다르게 특별난 상황을 만들어보자.

newMap = new Map();

newMap.set( {}, 'Obejct' );
console.log( newMap.get( {} )); // undefined

newMap.set( 123, '값 123' );
console.log( newMap.get( 123 ) ); // 값 123
console.log( newMap.get( '123' ) ); // undefined

newMap.set( NaN, 'Not a Number' );
console.log( newMap.get( NaN ) ); // Not a Number

// 자 특별한 상황이다.
// 일단 {} 를 key 값으로 불러왔을때 를 보자.
// 이는 앞전에도 설명했지만, Object 를 생성하면 engine 은 memory 에 
// Object 를 설정하고, 변수에 담아 Memory Address 를 저장한다.
// 즉, 위의 get( {} ) 에 사용된 Object 는 기존의 newMap 에서 사용한 key{} 가 아니다.
// newMap key 인 {} 은 Memory 에 저장한 {} 이며,
// 밑의 get( {} ) 역시 Memory 에 저장한 {} 이다.
// 같아 보이지만, 다른 Memory 에 저장된 Object 이다.
// 그러므로, get( {} ) 은 존재하지 않는다.
// 
// 2번째로는 123 이라는 숫자를 저장한 newMap 이다.
// 앞전에 설명했듯이 type 마저도 비교하기 때문에, 아래의 "123" 은 존재하지 않는다.
//
// 3번째로는 NaN 이다.
// 사실 이부분은 내생각과 많이 달랐다.
// NaN === NaN 은 false 이다.
// 그러므로 isNaN 이나, Obejct.is 나, Number.isNaN 이 생겨나
// NaN 을 비교하기 위한 용도로 만들어졌다.
// 그렇다면 NaN 은 서로 다른 값을가진 전역객체의 속성이지 않을까?
//
// 책에서는 간단하게 get( NaN ) 이니 Not a Number 가 반환되었다고 한다.
// 물론 내가 언급한 상황에 대해서도 곁들여 설명해준다. ( 다행이다...ㅠㅠ )
// 책에서는
// " ES5 에서 ( NaN === NaN ) 이 ture 가 아닌 문제가 있었지만 Map Object 에 반영되었다."
// 라고 설명한다. 즉 true 라는 건가?

/** has(): key 존재 여부 */
//
// Map instance 에서 key 존재 여부를 반환한다.
// 존재하면 true 존재하지 않으면 false 를 반환한다.
//

newMap = new Map();
newMap.set( 'one', 100 );
console.log( newMap.has( 'one' ) ); // true

//
/** entries(): iterator Object 생성 */
//
// [ key, value ]를 반환하는 iterator Object 를 생성하여 반환한다.
//

newMap = new Map( [
    [ 'key1', 'value1' ],
    [ 'key2', 'value2' ],
] );

let iteratorObj = newMap.entries(); // iterator Object 로 만든다.
let result = iteratorObj.next();
console.log( result ); // { value: [ 'key1', 'value1' ], done: false }

console.log( iteratorObj.next() ); // { value: [ 'key2', 'value2' ], done: false } 
console.log( iteratorObj.next() ); // { value: undefined, done: true }
//
// iterator Object( MapIterator ) 를 만들어 실행한다.
// iterator 이므로 next() 를 사용하여 object 를 반환한다.
// 
/** keys():key */
//
// key 값을 반환하는 iterator object 를 생성하여 반환한다.
// 처음에 그냥 keys 가 있겠지 싶어서 사용했는데..
// 내 생각되로 안되었던 이유가 있다.
// iterator Object 로 반환되기 때문이었다..
// 이는 array 의 keys 와 같다. 

newMap = new Map( [
    [ 'key', 'value1' ]
] );

newMap.set( {}, '오브젝트' );

iteratorObj = newMap.keys();

console.log( iteratorObj ); // [Map Iterator] { 'key', {} }
console.log( iteratorObj.next() ); // { value: 'key', done: false }
console.log( iteratorObj.next() );// { vlaue: {}, done: false }

//** values(): value 반환 iterator 오브젝트 생성 */
//

console.log( '----------- values() ----------------------');
newMap = new Map( [
    [ 'key', 'vlaue1' ]
] );
newMap.set( {}, '오브젝트' );
iteratorObj = newMap.values();

console.log( iteratorObj ); // [Map Iterator] { 'value1', '오브젝트' }
console.log( iteratorObj.next() ); // { vlaue: 'value1', done: false }
console.log( iteratorObj.next() ); // { vlaue: '오브젝트', done: false }

// values 역시 iterator Object 로 변한후,
// key 를 제외한 vlaue 를 value 값을 저장후 반환한다.

//** forEach(): element 마다 콜백 함수 호출 */
//
// Map instance 를 반목할때 마다 callbakc 함수를 호출한다.
// ( callback 함수란 forEach 에서 사용되는 Function parameter 를 말한다. )
//

// 첫번째 파라미터에 반복할 때 마다, 호출할 콜백 함수를 작성한다.
// 두번째 파라미터는 선택으로 콜백 함수에서 this 로 참조할 object 를 지정한다.
// 뭐 이부분은 array 의 forEach 와 같은것 같은데..

console.log( '---------------------------' );

newMap = new Map( [
    [ 'key1', 'value1' ]
] );
newMap.set( 'one', 'value2' );

newMap.forEach( ( val, key, map ) => {
    console.log( key, val );
} );

/** delete(): element 삭제 */
//
// Map instance 에서 key 값이 같은 element 를 삭제한다.
//

newMap = new Map ( [
    [ 'key1', 'value1' ],
    [ {}, '오브젝트' ]
] );

sportsObj = {};
newMap.set( sportsObj, '추가' );

console.log( newMap.delete( 'key1' ) ); // true
console.log( newMap.delete( {} ) ); // false
console.log( newMap.delete( sportsObj ) ); //true

//
/** clear(): 모든 key, vale 를 지움 */
//
newMap.set( 'one', 'value' );
console.log( newMap.size ); // 1

newMap.clear();
console.log( newMap.size ); // 0
//
/** Symbol.iterator: iterator 오브젝트 생성 */
//
// iterator Object 를 생성하여 반환
// 

newMap = new Map( [
    [ '1', 'music' ],
    [ '2', 'sports' ]
] );

iteratorObj = newMap[ Symbol.iterator ]();

console.log( iteratorObj );
console.log( iteratorObj.next() );
console.log( iteratorObj.next() );
