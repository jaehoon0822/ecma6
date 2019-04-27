let [ one, two, five = 5 ] = [ 1, 2 ];
console.log( one, two, five ); // 1, 2, 5

[ one, two, five = 5 ] = [ 1, 2, 10 ];
console.log( one, two, five ); // 1, 2, 10 

// 변수 파라미터 프로퍼티에 값이 할당되지 않을때
// 사전에 정의한 값이 할당된다.
// 이를 defualt value 라고 한다.
// 사실 변수에 값을 설정하지 않는다면, undefined 를 반환한다.
// 하지만, defualt value 는 let 변수를 선언하면서,
// 값이 설정되지 않았을때 할당될 값을 작성해 두는 형태이다.
// 위의 destructuring 을 본다면 이해할 수 있다.
// 이러한 형태는 destructur 를 통해 빛을 본다.

let { three, four, six = 6 } = { three: 3, four: 4, six: 66 };
console.log( three, four, six ); // 3, 4, 66
( { three, four, six = 6 } = { three: 3, four: 4 } );
console.log( three, four, six ); // 3, 4, 6 ==> default value

// 이런식으로 array 뿐만 아니라 Object 에도 적용 가능하다.
// default value 에는 적용순서가 존재한다.
// 이러한 방식으로도 설정가능하다.

[ one, two = one + 1, five = two + 3 ] = [ 1 ];
console.log( one, two, five ); // 1, 2, 5
// 재미있게 표현식을 사용하여 만든 defualt value 이다.
// 이는 1개의 값만을 전달한후,
// 그 1개값을 받은 변수를 사용하여 나머지 값을
// 설정할 수 있음을 보여준다.
// 이때 적용순서는 왼쪽의 [ 1 ] 에서 1이 왼쪽 처음의 one 변수애 할당된다.
// 이어서 two = one + 1 을 통해 two 변수에 값이 할당되고,
// five 변수에 two + 3 으로 값이 할당된다.
// 여기서 할당된 값들은 one 을 제외하고 전부 default vlaue 이다.
// 이처럼 왼쪽에서 오른쪽으로 이동하면서 default value 가 적용되는것을 알 수 있다.

// 이는 함수를 사용할 때 더욱 빛을 낸다.
/** Default Prarameter */
// 
// 호출받는 함수의 parameter 에 defualt value 를 작성할 수 있다.
// 이는 매우 편리한 기능이다.
// 보통 함수를 설정할때, 변수애 어떤 type 이 설정될지 몰라 항상 검사한다.
// 또한 만약 해당 값이 undefined 일때는 error 를 발생하도록 명령하기도 한다.
// 이러한 type 검사를 더원활하게 할수도 있을것 같다는 생각이 든다. 
// ( 물론.. 이는 현실적이지는 않을 것 같다... )
// 또한 무엇보다 중요한 함수내부의 변수 선언을 더욱 줄일 수 있다는 생각도 든다.
// ( 아이고...  함수형 자바스크립트를 다시 살펴보아야 겠구나 싶다.. ) 
// 여태까지 헛소리한듯 싶다.. 논리적이지 않다.
// 아휴...
// 
// 여하튼 기본값을 설정한다는건 매우 유용해보인다.
// 쓸데없이 arguments 를 길게 작성하지 않더라도, 자동으로 값을 할당해준다.
// curry function 이 생각나기도 한다.
// 다음 예제를 보자.

let add = ( one, two = 2 ) => console.log ( one + two );
add( 1 ); // 3

// 만약 비슷한 상황을 기존의 방법으로 만든다면 밑과 같다.

add = function( two ) {
    return function( one ) {
        console.log( one + two );
    }
};
add1 = add( 2 );
add2 = add1( 1 ); // 3

// 물론 약간 다른상황이다.
// 위의 함수는 2번함수를 호출한다.
// 이는 curring function 이라 하는데
// two 라는 변수에 2이를 할당하고, function 을 return 하여
// closure 를 통해 상위함수의 변수 객체에 접근하여 two 변수값을 가져온다.
// closure 로 인해 two 는 고정값이 되어 버린다.
// 이제 반환된 함수의 arguments 로 1 을 작성하면 마치 위와 같은 형태로서 사용된다.
// 물론 이 방식은 defualt Parameter  에 비해 유연하지 못하며, 비효율적이다.
// 함수를 다시한번 호출하여 값을 설정해야만 하다. 또한
// default parameter 는 고정되지 않은 값이다. default value를 arguments 수정이 가능하다.
// 다른 값을 대입하면 다른값이 적요된다는 말이다. 
// ( 물론, curring 함수에서 two 값을 변경가능하긴 하다. 하지만 이러한 변경은 함수코드 내부에서 변경해야 하므로
// Default Parameter 처럼 arguments 로 변경하지 못한다. -> 이는 당연하게도 함수를 호출한 다음( add1 ) 함수를 반환했을때 상황( add2 )을 말한다.)

/****** for-of */
//
// for-of 는 iterable Object 를 반복하여 처리한다.
// 알다시피 map, get, set, string, nodeList, HTMLElementCollection, Array 등등 은
// iterable Object 이다.
// 이러한 값들의 특징은 바로 나열가능하다는 것이다.
// 반복에 특화되어 있다고도 볼 수 있다,
// 사실 javascript 는 array 를 나열하기에 좋은 방법이 없었다.
// 기껏해야 for 문이나 while 문 혹은 for in 문이 전부였지만,
// 사실 불편하기 짝이 없는 방법이었다.
// 왜냐하면 array 를 순환하여 값을 얻기 위해서는 항상 array[ i ] 같은
// 표현식을 적어야만 했기 때문이다.
// 사실 for in 문 역시 array 에 특화되었다기 보다는 object 에 잘맞는 방식이라고 본다.
// for in 문을 사용하면 해당 변수에 객체 key 값이 들어가서 object[ i ] 로 찾는 방식이다.
// 이는 Object 특성상 key 값을 얻어야 하므로 이러한 특성에 맞도록 설계된듯 싶다.
// key 값이 예상가능한 array 에 걸맞는 방식이라 보기는 어렵다고 본다.
// 그러므로 index 값을 구하기 보다는 array vlaue 값을 바로 나열하는 방법이 더 적합하다고 본다.

// ( 물론 array index 값을 얻어야 하는 상황이 생기기도 하지만 그럴때는 for in 문을 사용하면 쉽게 얻을 수 있다.
// 혹은 indexOf 나 lastIndexOf 나 함수형 자바스크립트인 underscore 나 lodash 같은 함수형을 사용해도 매우 좋은 방법으로 얻을수 있다.)

// 일단 for-of 가 어떠한 방식으로 작동하는지 살펴보자.
// for ( let i of iterable Object ) {
//    ...
// }
// for-in 문과 거의 비슷하지만 들어가는 Object 가 iterable Object 이다.
// iterable object 는 Symbol.iterator() 가 존재하는 object 이다.
// 알다시피 array 가 대표적이며,  Array instance 에 Symbol.iterator() 를 실행하면
// 해당 객체는 iterator object 가 된다.
// 위의 for-of 의 iterable Object 는 방금 설명한 iterator Object 로써 변경된다.
// 이러한 iterable Object 를 사용하여 각 값을 variable i 에 할당한다고 보면 된다.
// 그래서 실제로 실행시켜보면 i 의 값에 iterator Object 의 value 값을 대입한것을 확인할 수 있다.
// 책에서 설명할때는 iterable object 라고 자꾸 설명하는데 이 iterable obejct 가 
// iterator object 즉, Symbol.iterator() 를 사용한 object 를 말하는듯 싶다.
// 개인적으로 iterable object 는 iterable 한 객체를 뜻하고, 
// Symbol.iterator()를 사용한 object 를 iterator object 로 정의했다.
// 물론, 이부분역시 더 정확한 개념을 이해하기 위한 초석이다.
// 언제든지 수정 가능하며 잘못된 양념일 수 있다는점을 명심하자. 
// ( 이역시 나의 상상력이 가미된 양념일 수 있다. 일단 이해하기로는 위와 같이 이해하였다. 
//   만약 내가 생각한 방법대로 움직였다면 이해안가는 부분도 있다. 항상 iterator value 값의 마지막은 undefined 이다.
//   해당 vlaue 값을 항상 i 에 적용했다면 마지막 값이 undefined 였을 것이다. 이것은 그냥 생각했을때이지만 언제든지
//   코드로 가공할 수 있는 것이라...  별 의미는 없다고 본다. 실제 코드를 보고 살펴봐야 정확히 알수 있는 부분이다. 휴..
//   그정도 까지 모든 코드를 보고 이해할수 있는 수준이 될수 있으면 정말 좋겠다. )

for ( let i of [ 1, 2, 3] ) {
    console.log( i ); // 1 
                      // 2 
                      // 3
}

// for ( let j of { 1: 1, 2: 2} ) {
//     console.log( j );
// }
// 한번 궁금해서 Object 를 사용해보았다.
// 사용하는 순간 TypeError 가 나온다.
// TypeError: (intermedate value)(intermediate values)[Symbol.iterator] is not a function
//
// Object 에는 Symbol.iterator 함수가 없기 때문이다.
// for-of 는 iterable object 를 사용해야 한다.
// 다른 iterable object 인 String 을 사용해 보자.

for ( let i of 'ABC' ) {
    console.log( i ); // A
                      // B
                      // C
}
// 역시 문자열을 하나씩 분리하여 variable i 에 대입하여 반복한다.
// 문자열 뿐만 아닌 NodeList 에도 적용가능하다.
// 귀찮으므로, 적용만 가능하다는 점만 알아두자.
// html 사용하기 귀찮다.

/** distructuring */
//
let values = [
    { 'gift': '선물 1', amount: { apple: 10, orange: 20 }},
    { 'gift': '선물 2', amount: { apple: 20, orange: 10 }},
]

for ( let { 'gift': one, amount: { apple: two, orange: three } } of values ) {
    console.log( one, two, three ); // 선물 1 10 20
                                    // 선물 2 20 10
}

// for-of 와 for-in 의 차이
// 앞에서 주구장창 설명했지만, 이 책에서도 마지막 마무리로 둘의 차이점을 말한다.
// 1. for-in 은 열거가능한 프로퍼티를 전부 대상이다. 이말은 prototype 에 연결된 프로퍼티도 열거 대싱이라는 말이다.
//    보통 prototype 의 프로퍼티는 열거되지 않기를 바란다. 만약 열거되지 않도록 만들려면 enumerable 을 false 로 
//    변경하면 된다.
// 2. for-of 는 객체의 property 만 열거한다.
//    또한 iterable obejct 만 열겨 가능하다.
//    변수에 key 값을 저장하지 않고 value 값을 저장한다.

let values2 = [ 20, 30, 40];

Array.prototype.music = function() {
    return '음악';
}
Array.prototype.math = function() {
    return '수학';
}

for ( let i in values2 ) {
    console.log( i, values2[ i ] ); // 값이 길다. 실행해 볼것.
}
for ( let i of values2 ) {
    console.log( i ); // 20
                      // 30
                      // 40
}

/** for-of 로 Object 열거 */
// 앞서서 얘기했듯이 Object 는 iterable object 가 아니므로,
// 열거할 수 없다.
// 하지만 개발자 코드로 사전 처리하면 for-of 문으로 열거할 수 있다.

let sports = {
    soccer: '축구',
    baseball: '야구',
},
    keyList = Object.keys( sports ); // Object.keys 를 사용하여 sports 의 key 값을 배열형태로 반환한다.
for ( let i of keyList ) {  // keyList 는 key값을 가진 배열이므로, iterable Object 이다.
    console.log( i, sports[ i ] ); // soccer: 축구
                                   // baseball: 야구
}
