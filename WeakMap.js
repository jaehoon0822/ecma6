// WeakMap Object 
//
// WeakMap Object 는 Map Object 와 작성 방법과 형태가
// 같다. 그런데도 별도 오브젝트로 분리된 것은 하나의
// 오브젝트로 처리할 수 없는 환경 때문이다.
// 이에 대한 개념과 WeakMap Object 를 제어하는
// 'Method' 를 다루어보자.
//

// WeakMap 은 Map 과 같아보이지만 Weak( 약한 )Map Object 이다.
// ( 제약을 덜 주었다는 건가?? )
// Map 과 작성방법과 형태는 같지만, 약한 점이 있다.
// WeakMap Object 의 Key 에 object 만 지정할 수 있으며,
// string, number, symbol 과 같은 값을 작성할 수 없다.
// value 는 타입에 제한이 없다.
// key 에 object 만 지정할 수 있는 것이 중요하며,
// 이유를 이해하는 것이 WeakMap 오브젝으의 상요 핵심이다.
//

// GC( Garbage Collection )
// 간단히 말하면 GC 는 메모리에 저장된 객체를 더이상 아무도 참조하지 않을때
// 필요없어진 객체를 제거하는 역할은 한다.
// 객체를 생성할때 engine 은 객체를 메모리상에 저장하고,
// 변수에 저장한다면, 객체의 Memory Address 를 할당한다.
// 그래서 우리는 변수에서 객체를 참조할 수 있다.
// 만약 이러한 변수참조가 없다면, GC 가 필요없어진 객체라고 생각하여
// 삭제해 버린다. 이렇게 일일히 메모리관리를 하지 않아도 되도록 만든
// 매우 편리한 녀석이다.
// GC 가 없다면 사용하지 않는 메모리가 쌓이게 되고 Memory Leak( 메모리 누수) 이 발생한다. 
// 근데 왜 WeakMap 에 대해 설명하는데 GC 를 이야기하는가 싶을것이다.
// WeakMap 은 위에서 말했듯이 key 로 Object 만을 저장한다.
// 이말은 객체의 Memory Address 를 가진 변수를 key 값으로 가진다는 의미이다.
// Map 에서는 객체를 가진 변수를 사용하지 않아도, 
// ( ex: new Map ( [ {}, 'object' ] ) 같은..)
// Object 자체를 key 값으로 가질 수 있었다.
// 그리고, string, number, boolean, null, undefined, symbol 들을
// 사용가능했다.
// 하지만 Weak( 약한 )Map 은 그렇게 하지 못한다.
// 객체의 Memory Address 를 가진 변수만을 key 값으로 사용 가능하다.
// 그런데 만약 GC 가 해당 변수를 삭제한다면?
// 그때, WeakMap 에 저장한 key, value 도 GC 대상이 된다.
// 왜냐하면, key 값이 사라져버렸기 때문이다.
// 이말은 개발자코드로 일일히 삭제하지 않아도 된다는 말이다.
// 어찌보면 편할지도...

// 이러한 목적과 기능으로 인해 WeakMap Object 에서 제공하는 메소드는
// 간편할 따름이다.
// 단순한 가장 기본적인 CRUD 만을 제공한다.
// set(), get(), has(), delete() 만을 가지고 있다.
// 

// Map 오브젝트는 size proeprty 가 있어
// 현재의 [ key, vlaue ] 수를 알수 있으나,
// WeakMap Object 는 size Propery 가 없어서
// 현재의 [ key, vlaue ] 를 알수 없다.
// 브라우저 개발자도구에 length porperty 가 표시되지만 실제로
// 사용하면 undefined 를 반환한다.
//

//** new WeakMap(): WeakMap 인스턴스 생성 */
console.log( '-------- WeakMap()------------' );

let emptyWeakMap,
    obj,
    newWeakMap;

emptyWeakmap = new WeakMap();
obj = {};
newWeakMap = new WeakMap( [
    [ obj, '오브젝트' ]
] );

/** set(): key, value */
//
// WeakMap instance 에 key와 value 를 설정
//

// set( [ Object,Function 등], value )
//

newWeakMap = new WeakMap();

( function() {
    var obj = { item: 'WeakMap' };
    newWeakMap.set( obj, 'GC' );
})();

let newMap = new Map();

( function() {
    var obj = { item: 'map' };
    newMap.set( obj, 'Keep' );
} )();

setTimeout( function() {
    console.log( '1: ', newWeakMap );
    console.log( '2: ', newMap );
}, 1000 )

// 이 상황은 GC 에 대해 알지못한다면 이해하기 힘들수 있겠다.
// 여기서 다시한번 내부동작에 대해 공부해야 한다는것을 느낀다.
// 위의 코드를 보면 자기실행함수 ( IIFE ) 의 스코프에 접근하여,
// WeakMap.set( obj, 'GC' ) 을 한다.
// 이는 함수내부의 obj 를 set 한다.
// 하지만, 앞에서 설명했듯이 WeakMap 의 key 로 설정된
// Object 를 참조하는 변수가 없다면 ( 삭제되었다면 ),
// 즉, 더이상 Object 의 Memory Address 를 가진 변수가 없다면,
// WeakMap 에 set 했던 해당 변수 key 와 value 역시 GC 대상이 된다.
// 이 상황이 바로 WeakMap 이 GC 대상이 되는 예이다.
// IIFE 함수를 실행하고 스코프를 빠져나오는 순간,
// 스택구로로 이루어진 스코프에서 참조하고 있던 IIFE 변수객체를
// 없애버린다.
// 즉, Memory Address 를 가진 변수 obj 를 더이상 참조할 수 없는것이다.
// 그로인해 WeakMap 의 key 인 obj 는 GC 대상이 되며 해당 key 와 value 를
// 자동으로 없앤다.
// 

// 근데 헷갈리는 상황이 발생하기도 한다.
// console.log 해 보면 알겠지만, IIFE 의 실행이 끝나고
// 변수객체의 obj 가 사라졌다고 생각했는데, 그리고 GC 대상으로 작동되어
// 값이 없어진다고 생각했는데..
// newWeakMap 에 여전히 해당 key 와 value 가 객체형식으로 존재한다.
// 이건 뭥미..? 처음에 맨붕이었지만.. chrome developer tool 을 작동시키면서 
// 이해가 되기 시작한다. 이유는
// GC 가 대상으로 삼고 아직 삭제하기 전이기 때문이다.
// 컴퓨터 성능에 따라 빨리 삭제시키겠지만 현재 이컴퓨터는 성능이 좋지는않다.
// GC 삭제 시간이 좀 걸린다.
// 앞에 코드를 보면 console.log 하는데 setTimeout 을 1000ms 로 설정한것이
// GC 가 삭제할 시간을 준것이다.
// ( 그럼 이 컴퓨터는 그 시간안에도 삭제 못한건가..? )

// 여하튼, 이런 현상은 Chrome developer tool 을 사용하여
// Debbuger 하다보면 GC 가 그시간동안 삭제하드라...
// ( Debbuging 은 확인하다보면 1초보다는 더 걸린다. )

// 더 자세한걸 알고 싶다면, 336p 를 보자.
// 아주 잘 설명되어 있다.
//

console.log( '--------------------------' );
newWeakMap = new WeakMap();
obj = {};
newWeakMap.set( obj, 'object-1' );
obj = {};
newWeakMap.set( obj, 'object-2' );

setTimeout( () => {
    console.log( 'set: ', newWeakMap );
}, 1000);

// 이 부분도 1초가 지났는데 GC 의 영향을 받지 않으면,
// set 한 2개의 key 가 존재한다.
// 하지만 시간이 지나면 GC 가 알아서 삭제한다.
// 근데 이 컴퓨터는 좀 오래걸리네...
//

/** get() */
console.log( '------------ get() -----------');
console.log( newWeakMap.get( obj ) ); // object-2

/** has() */
console.log( '----------- has() ------------');
console.log( newWeakMap.has( obj ) ); // true

/** delete() */
console.log( '-------- delete() ---------');
console.log( newWeakMap.delete( obj ) ); // true