// javascript primitive 값은 총 5개 였다.
// String, Number, Boolean, undefined, null
// 이중 undefined 와 null 을 제외한 나머지 3개는 wrapper object 가 존재한다.
// wrapper Object 로 값을 만들때 vlaueOf() 로 ( or toString() ) 으로 값을 구할 수 있었다.
// 물론 primitive value 는 객체가 아니며 원시타입이라 불린다.
// 원래부터 존재하는 data value 라는 것이다.
// wrapper Object 는 javascript 의 편의성에 의해 만들어진 객체이다.
// 그로인해 해당 타입의 method 를 바로바로 사용가능하다.
// 임시 객체로서 사용된다고 생각하는 것이 좋을듯 싶다.
// 하지만, 이러한 wrapper object 를 따로 호출해서 쓸수 있다는 점 또한 
// javascript 의 매력일 것이다.
// 
// ES6 에서는 새로운 primitive type 을 추가하였다.
// 이 6번째 type 의 이름은 Symbol 이다.
// Symbol 은 다른 type 과는 좀 차이가 있다.
// 사실 다른 타입들은 순수한 타입으로 Object 가 아니다.
// 하지만 Symbol 은 자체가 Object 타입과 비슷하다... Object 라고 얘기하기 뭐하지만 아무리 봐도 object 이다.
//
// 참고로, valueOf() 를 사용하더라도, Symbol 값을 반환하지 못한다.
//

/** Symbol() */
//
// Symbol 값을 생성하여 반환한다.
//

// let sym = Symbol(); 형태로 작성하며 Symbol 값을 생성하여
// sym 에 할당한다. new Symbol() 과 같이 new 연산자를 사용할 수 없다.
// Symbol() 로 생성된 값은 프로그램 전체를 통해 유일하며,
// 값을 변경할 수 없다.
// 생성한 Symbol 에 property 를 설정할 수 없으며 strict mode 에서는 TypeError 가 발생한다.
// 

// Symbol() 로 반환된 값이 Object 가 아니므로, Object 를 생성하나다고 할수 없다.
// Symbol 을 생성하나다는 것은 늬앙스의 차이가 있다고 하네..
// Symbol 값을 생성한다는 표현이 적절할 것이다.
// 

// Symbol 은 String"", Array[], Object{}, Boolean( true/false ) 와 같이 Object 를 생성하는
// liternal 이 없다. udnefined 와 null 과 같이 그 자체가 되는 값이 되는 것도 아니다.
// Symbol() 과 같이 함수로 호출해야 값을 생성하여 반환한다.
//

const sym = Symbol();
console.log( "1: ", sym ); // Symbol()
console.log( "2: ", typeof sym ); // symbol
console.log( "3: ", Symbol( '주석' ) ); // Symbol(주석)
console.log( "4: ", sym == Symbol() ); // false

//
// Symbol 을 호출하면 Symbol 값을 생성하여 반환한다.
// 생성한 값은 변경 불가능 하다.
// 그러므로 상수와 같으니 const 로 할당하는 것이 좋을 듯 싶다.
//

// 첫번째 console.log 는 말그대로 Symbol() 을 생성하여 반환한다.
//       Symbol() 로 값을 생성했는데 값이 출력되지 않고 Symbol() 로 출력된다.
//       Symbol 값을 구하면 Symbol() 로 생성한 값을 반환하지 않고,
//       Symbol 값을 생성했던 형태를 반환한다.
//       이것이 Symbol 의 특징이다.
// 두번재 console.log 는 sym 의 typeof 를 확인한다. 타입은 symbol 이다.
// 세번재 console.log 는 Symbol 에 parameter 로 '주석' 을 넣었다.
//       Symbol() parameter 는 선택적으로 Symbol() 로 생성한 값의 설명이나
//       주석을 문자열로 작성한다.
//       Symbol 값을 생성하는데 영향을 미치지 않는다.
//       Symbol 값을 외부에 제공하지 않으므로 디버깅할 때 유용하다.
//       parameter 를 작성하지 않으면 undefined 로 인식한다. 
//       주석이 작성된 Symbol 값을 출력하면 Symbol 값을 생성할 때의 형태를 반환한다.
//       다음과 같이 말이다..  Symbol(주석) .. 
// 네번째 앞에서 생성한 Symbol() 인 sym 과 새로운 Symbol() 값을 비교한다.
//       Symbol() 은 유일한 값이므로, false 이다.
//       이는 program 전체를 통해 유일한 값을 생성한다. 
//  
// 여태껏 Symbol 의 특징을 알아보았다.
//
//


