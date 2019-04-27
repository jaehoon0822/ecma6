// Object destructuring

let { one, two } = { one: 1, nine: 9 };
console.log( one, two ); // 1 undefined 

// 오른쪽에 Object 가 있다면 왼쪽에도 Object 로 작성해야한다.
// 같은 이름으로 작성되어야 값이 할당된다.
// 위의 값은 one 에 1 이 할당되며,
// two 에는 같은 key 가 존재하지 않으므로,
// undefined 이다.

// 변수를 할당하기 전에 선언하지 않고, 변수 선언과 할당을 한번에 하려면,
// let { one, two } 형태와 같이 Object 리터럴 앞에 let 및 const 키워드를
// 사용할 수 있다.

let three, four;
( { three, four } = { three: 3, four: 4 } );
console.log( three, four );

// Object  destructuring 에서 사전에 선언된 변수를 사용하려면,
// 소괄호 (), 안에 할당 코드를 작성해야 한다.

let five, six;
( { one: five, two: six } = { one: 10, two: 20 } );
console.log( five, six ); // 10, 20

// 왼쪽과 오른쪽 Object 에 one 이 있다.
// 이 형태에서 one 은 변수가 아닌 프로퍼티 key 이다.
// two 도 마찬가지이다.
// property key 값이 같은 five 변수에 10 을,
// six 변수에 20 을 할당한다.

let { nine, plus: { ten } } = { nine: 9, plus: { ten: 10 } };
console.log( nine, ten );
// 왼쪽과 오른쪽 Object 에 nine 이 있으므로, 9가 왼쪽의 nine 에 할당된다.
// ten 은 경로구조상에 Plus key vlaue  안의 Object 내부의 ten 이 존재한다.
// 이러한 경로구조를 정확히 맞추어 주어야 한다.
// 만약 plus key 로 하여 propery 값을 출력하면 ReferenceError 가 발생한다. ( plus: ten  == ReferenceError )
// plus: { ten } 을 통해 plus key value 의 객체 안에 ten 을 할당한다.

// 사실 위의 five, six 부분이 조금 헷갈리는 부분이 있다.
// 오른쪽의 Object 의 key 값을 사용햐 참조한다고 생각하는 것이 좋을까?
// 그게 맞는듯 싶다.
//

// parameter destructuring assignment

// 호출하는 함수의  parameter 에 Obejct 를 작성할 수 있다.
// 호출하는 함수의 파라미터를 Object destructuring 형태로 작성하면
// 함수 블록에서 직접 property name 을 사용할 수 있다.
// 개 대박이다.!!!

function total( { one, plus: { two, five } }) {
    console.log( 'total: ', one + two + five );
}

total( { one: 1, plus:{ two: 2, five: 5 } } );