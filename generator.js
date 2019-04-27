// function* 키워드로 이를 사용한 함수를 generator function 이라 한다.
// 다음과 같이 3가지 형태로 generator function 을 작성할 수 있다.

// 1. function* 선언문
// 2. function* 표현식
// 3. GeneratorFunction

//
// function* 선언문과 function* 표현식은 function 선언문, function 표현식과
// 형태가 같다.
// 다만, function* 을 사용하는 것이 다르다.
// GeneratorFunction 은 new Function() 과 같으며 Parameter 에 지정한 문자열로
// GeneratorFunction 을 생성하여 반환한다.
//

// GeneratorFunction 을 호출하면 GeneratorObjct 를 생성하여 반환한다.
// function() 을 호출하면 함수 블록을 실행하지만, GeneratorFunction 은 함수 블록을 실행하지 않고,
// GeneratorObject 를 생성하여 반환한다.
// 생성한 GeneratorObject 에 호출한 함수에서 넘겨준 Parameter 값이 설정된다.
//

// 생성된 GeneratorObject 는 IteratorObject 이다.
// IteratorObject 의 method 를 호출했을때,
// GeneratorFunction Block 을 실행한다.
// GeneratorFunction Block 에 yield Keyword 를 작성하면 function block code 를
// 모두 실행하지 않고, yield Keyword 단위로 나누어 실행한다.
// GeneratorFuncion 은 new Operator 를 사용할수 없으며
// 사용하면 TypeError 가 발생한다.
//

/** function* 선언문 */
//
// 선언문 형태의 Gernerator Function 을 정의
//

function* sports( one, two ) {
    console.log( '함수 블록' );
    yield one + two;
};

console.log( typeof sports ); // Function

let genObj = sports( 1, 2 );
console.log( typeof getObj ); // Object

// console.log 의 결과값을 보면 알수 있다.
// function* 을 사용해 만든 generatorFunction 인 sports 는
// 자체적으로 사용하면 Function 이다.
// 하지만, sports 를 호출하고 getObj 에 할당하면,
// 값이 Object 로 변한것을 볼수 있다.
// 이는 위에 설명했듯이 Function block 을 실행시키지 않고,
// 호출함과 동시에 GeneratorObject 로 만든후,
// yield keyword 를 만나, 해당 라인을 실행시킨다.
// 여기서 주목해야할 부분은 일반 sports 내부의 console.log 가 실행되지 않았다는 점이다.
// 이는 GerneratorObject 의 yield keyword 만 읽는 것인지,
// 생각해 보아야 할 상황이다.
//
// 책의 설명으로는 생성한 GeneratorObject 를 사용하여
// GeneratorFunction 을 호출했을때 추가 처리를 하지 않아도
// Parameter 를 사용할수 있다.
// 생성한 GeneratorObject 의 typeof 는 obejct 이다.
// 이는 new 연산자로 생성한 인스턴스와 타입이 같다.
// 인스턴스 형태로 생성되지만, 이 책에서는 new operator 를 사용하여 생성한 것을
// instance 로 표기하므로, GeneratorObject 로 표기한다.
// 다른 책에서는 instance 로 표기하는지 알아봐야 겠다.
//

/** function* expression */
//
// expression 형태로 GeneratorFunction 을 정의한다.

sports = function*( one, two ) {
    console.log( '함수 블록' );
    yield one + two;
}

genObj = sports( 10, 20 );
console.log( genObj.next() );

// 이야~ 이부분 많이 공부해야 할것같다.
// 보면 볼수록 generator 부분이 헷갈리는 부분이 많다.
// 일단 위의 function* expression 을 정리해보면 간단하다.
// function 을 쓸때 표현식형태로 쓸때 function name 없이 variable 에 담아 쓰지 않는가?
// 이와 같이 변수에 담는 방법을 function* expression 이라고 한다.
// 물론 function 과 같이 function name 을 사용하여
// 재귀함수로 사용가능하다.
// 일단 일반 함수와 그렇게 큰 차이는 존재하지 않는다.
// 단지 hoisting 문제가 있으려나?
// 

// generator 를 사용해서 console.dir 을 찍어보면 ( chrome 에서 찍는다. )
// 재미있는 상황이 생긴다.
// 일단 sports 만 변수명을 적어서 console.dir 을 사용해보면
//
// prototype: Generator
// __proto__ : GeneratorFunction
//
// 이렇게 prototype 과 __proto__( prototype link 라고 해야 겠다, ) 가 있다.
//
// prototype 객체는 
//
// prototype: Generator
//   __proto__: Generator
//      constructor: GeneratorFunction
//      ...
//
// 으로 이루어져 있다.
// 또한 __proto__  는 GeneratorFunction 에 link 되어 있는데
// 이는 당연히 GeneratorObajct 로 변환하기전의 GeneratorFunction 이니
// GeneratorFunction 에 __proto__ 로 연결되어 있음을 예상해 본다.
// 
// 이제 sports 를 호출해보면 sports 의 __proto__ 가 다음과 같이 변해있다.
// 
// __proto__: Genrator
//   __proto__: Genrator
//      constructor: GeneratorFunction
//      ...
//
// 이제 알겠는가.
// 이 부분은 마치 new 연산자를 사용하여 Instance 를 생성할때의 상황과 똑같다.
// __proto__ 가 sprots 의 prototype 을 참조하고 있는것을 알수 있다.
// 단순하게 new 연산자를 쓰지 않은 Generator instance 라고 생각하면 될것 같다.
//
/** GeneratorFunction(): GeneratorFunction 함수 생성 */
//
// new 연산자로 GeneratorFunction() 함수를 호출할 수 없다.
// 이름 없는 GeneratorFunction 을 생성하고, 여기에 연결된 constructor 를 사용하여
// GeneratorFunction 을 생성한다.
// ES5 의 new Function() 과 같이 문자열로 파라미터와 함수 블록의 코드를 작성한다.
//

let GenConst = Object.getPrototypeOf( function*(){} ).constructor;
sports = new GenConst( "one", "two", "console.log( 'GenConst' ); yield one + two ");
genObj = sports( 3, 4 );
console.log( genObj.next() );