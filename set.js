// set object
// set object 는 map 과 비슷히지만,
// [ key, value ] 가 아닌,
// [ value ] 만을 작성한다.
// Map Object 에 Array 기능을 추가한 오브젝트이다.
//

// Set Object 는 Array 와 비슷하지만, Array Object 없는 특성이 있다.
// Set Object 는 [ value1, value2, ... ] 와 같이 값을 배열로 작성한다.
// Set Object 에 추가한 순서대로 index 를 부여하여 저장한다.
// 따라서 순서대로 읽히는것을 보장한다.
//

// Set Object 는 Key 개념을 갖고 있으며,
// Value1, Value2 가 값이면서 key 역할을 한다.
// 역할을 하는 것이지 key 가 별도로 존재하는 것은 아니다.
// 이런 특징으로 인해 value 값이 같으면 나중에 추가한 값이 추가되지 않는다.
//

// [ value1, value2 ] 에 string, number, symbol 등의 프리미티브 데이터 타입을
// 작성할 수 있다. null 은 undefined 로 취급된다.
// 이점도 Map 과 비슷하다.
//

// Array Object 의 element 를 삭제하려면 배열을 반복하면서
// 값의 일치여부를 비교해야 한다.
// 같은 값이 여러개 있을 수 있으므로 모두 삭제하려면 계속 비교하면서
// 삭제해야 한다.
// 반면 Set Object 는 value 값이 같은 것이 없으므로,
// 삭제를 한 번만 실행하면 된다.
// 이점이 Array Object 와 다르며 Map Object 와 같다.
//

/** new Set(): set instance 생성 */
//
// Set instance 를 생성하여 반환한다.
// new Set()
// 파라미터: { 선택 }, 값
// 반환: Set instance

// 파라미터는 선택으로 이터러블 오브젝트를 작성하고,
// 그안에 value 를 0개 이상 작성해야 한다.
//

let setObj,
    newSet;

setObj = new Set();
newSet = new Set( [1, 2, 1, 2, '스포츠' ] );

console.log( 'size: ', newSet.size );

for ( let elem of newSet ) {
    console.log( elem );
}

//
// 다시한번 이야기하지만,
// value 값이 key 이자 value 이다.
// 해당 instnace 구조를 보면
// 배열처럼 숫자가 배정되는데, 이는 Set Object 가 추가한 순서에 맞도록
// 번호를 지정한것 뿐이지 이는 key 값이 아니다.
//

// 또한 Set Object 의 파라미터는 중복된 값을 허용하지 않는다.
// 나중에 추가한 중복된 값이 추가되지 않는 규칙을 갖고 있다.
//

/** add(): value 추가 */
//
// Map 에서 set() 과 비슷한 역할을 하는 add() 이다.
// 즉 값을 추가하는 method 이다.
//

// Set instance 에 추가할 String, Object 등의 value 를 지정한다.
// Map 의 set() 과 다른점이 있다면,
// 값을 추가한후 Set instance 를 반환한다. 따라서 Method chainig 방법이로
// Set instance 의 method 를 호출할 수 있다.
//

console.log( '------------- add() -------------' )
newSet = new Set();
newSet.add( '축구' ).add( '농구' );
newSet.add( '축구' );

for ( let elem of newSet ) {
    console.log( elem );
}

// 앞에서 설명했듯이 중복된 값은 추가되지 않는다.
// 

newSet = new Set();
let music = () => {};

newSet.add( music );

for ( let elem of newSet ) {
    console.log( elem ); // [Function: music]
}

/** has(): value 존재 여부 */
//

// Set instance 에서 value 의 존재 여부를 반환한다.
// 반환값은 Boolean value 이다.
//
console.log( '------- has() ------------');
newSet = new Set();
newSet.add( 'sports' );
console.log( newSet.has( 'sports' ) );

/** entries(): iterator object 생성 */
//

// iterator object 를 생성하여 반환한다.
//

// 생성한 iterator object 의 next() 를 호출하면 Set instace 에 작성된
// 순서로 [ key, value ] 를 반환한다.
// Set instance 에 key 를 저장하지 않지만
// value 를 key 에 설정하여 반환한다.
//
newSet = new Set( ['one', () => {} ] );
let iteratorObj = newSet.entries();

console.log( iteratorObj.next() ); // { value: [ 'one', 'one' ], done: false }
console.log( iteratorObj.next() ); // { value: [ [ Function ], [ Function ] ], done: false }

// entries() 를 사용해 itertor object 로 만들었으며
// 해당 iterator Object 를 iteratorObj 에 할당했다.
// 

// 첫번째 value 인 'one' 을 반환하며 실행 결과에 { value: Array[2], done: false } 가 출력된다.
// value 를 반환하므로 { value: 'one', done: false } 형태로 반환되어야 하지만,
// value 를 key 에 반환하므로 { value: [ 'one', 'one' ], done: false } 형태를 갖는다.
// 이렇게 [ key, value ] 를 반환한는 것은 Map Object 와 형태를 맞추기 위한 것으로 생각한다.
// 책에는 위와 같이 적혀있다.
// 참..  뭐라 해야 할지.. 일단 구색 맞추기 같은 느낌인듯 싶다.
// 뭐 사용하는 메커니즘이 이렇게 구성할수 밖에 없을지도 모르고,, 
// 아~!! 알고리즘 공부해서 코드 잘짜보고 싶다...
// 해야할게 참으로 많구나...
// 일단 entries 로 iterator 로 만들며 Set 의 element 들은 값이 key 이며 value 이다.
// 그러므로 next() 로 반환되는 Object 의 value 는 key 와 value 를 전부 값으로 설정한다.
// 요정도가 point 일지도..
//

//
/** values(): value 반환 이터레이터 오브젝트 생성 */
//
// value 값을 반환하는 iterator object 를 생성하여 반환한다.
// 뭐 이부분도 Map 의 values() 와 비슷할 것 같다.
//

console.log( '--------------- values() --------------' );
newSet = new Set( [ 'one', () => {} ] );
iteratorObj = newSet.values();
// values() 를 사용하면 value 만 가진 iteraotr object 를 반환한다.
// 뭐.. 그래봤자 값이 value 이자 key 이지만..

console.log( iteratorObj.next() ); // { value: 'one', done: false }
console.log( iteratorObj.next() ); // { valeu: [Function], done: false }

//
// 앞전에 Array[2] 였던것과 차이가 있다.
// 말그대로 value 만 호출하기 때문이다.
//

/** keys(): key 반환 iterator Object 생성 */
//

// 생성한 iterator object 의 next() 를 호출하면 Set instance 에 작성된 순서로
// key 값을 반환한다. Set instance 에 value 만 설정되므로,
// value 를 key 로 하여 반환한다.
// 그다지 의미가 없는것 같지만, ( 책에서 자꾸 이부분을 강조하네...? )
// Map instance Method 와 반환 구조를 맞추기 위한 것으로 생각된다.
// ( 뭐.. 메커니즘 문제인가.. 싶네,,? )
//

console.log( '----------- keys() ---------------' );

newSet = new Set( [ 'one', () => {} ] );
iteratorObj = newSet.keys();

console.log( iteratorObj.next() ); // { value: 'one', done: false }
console.log( iteratorObj.next() ); // { value: [Function], done: false }
 
// 자~ 크롬 53 버전에서 vlaue 에 함수를 넣으면 출력되지 않고 done: false 만 출력된다고 한다.
// 참고해 두자.

/** forEach() */
//
// forEach() 는 Map 의 forEach() 와 비슷하다.
// Map 에서 처럼 forEach() 가 실행중에 추가된 value 는 처리된다.
// 왜냐하면, iterable object 의 끝에 첨부되기 때문이다.
// ( 순서있게 추가되는게 이러한 장점이 있나부다.. )

// forEach() 의 callback function 의 prameter 의 순서는 
// 역시나, value, key, setIsntance( object ) 이다.
// 이는 공통인듯 싶다.
//
console.log( '------------ forEach() ----------------' );

newSet = new Set( [ 'one', 'two' ] );
newSet.forEach( (val, key, set ) => {
    console.log( val, this );
}, { member: 10 } ); 

// forEach 에서도 Arraw Function 을 조심하자.
// this 값이 2 번재 인자의 객체가 아니게 된다.
// Arrow Fucntion 에 대해서 더 공부해야 겠다.
// 뭐 일단 Arrow Function 은 넘기고,
// val 과 key 는 값이 같다는것은 당연히 알것이다.
//

//** delete(): element 삭제 */
//
// Set.prototype.delete()
// Map 의 delete() 와 기능이 같다.
//

newSet = new Set( [ 'one', 'two' ] );
console.log( newSet.size ); // 2

newSet.delete( 'one' );
console.log( newSet ); // Set{ 'two' }

// 삭제했다.

/** clear(): 모든 value 지움 */
//

newSet = new Set( [ 'one', 'two', 3, function() {}, ()=>{} ] );
console.log( newSet.size ); // 5 

newSet.clear();
console.log( newSet.size ); // 0


