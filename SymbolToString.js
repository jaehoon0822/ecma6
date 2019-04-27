// Well-Known Symbol ( 잘 알려진 상징 ㅋㅋㅋ )
//
// ES6 Spec 에서 @@iterator 형태로 작성된 것을 볼 수 있으며,
// @@ 은 Symbol 대신 사용하며, @@ iterator 는 Symbol.iterator 와 같다.
// 
// @@iterator 형태는 Spec 에서 사용하며, Symbol.iterator 형태는
// 내부 프로퍼티인 [[Description]] 에 저장되는 형태이다. 
//
// ( Description 이 무엇인가 처음에 이해가 안갔는데 Description 형태는 
//  console.dir( Object ( Symbol( 'description' ) ) ) 해보면 알수 있다.
// 사실 앞전에도 설명이 나왔는데 휴.. 다시보니 헷갈렸네...  )
//
// 개발자 코드는 Symbol.iterator 형태를 사용한다.
//
// p265 에서 볼수 있듯이 11 개의 Symbol.property 가 존재한다.
// 이를 Well-Known Symbol 이라 한다.
//

// Well-Known Symbol 은 spec 에서 처리 알고리즘을 구분하기 위해 부여한
// 이름이다. 즉, 자바스크립트 엔진이 default 처리하는 algorism 유형 이름이다.
// 자바스크립트 프로그램에 같은 이름의 Well-Known Symbol 을 작성하면 엔진의 디폴트
// 처리를 실행하지 않고 프로그램에 작성된 코드를 실행한다.
// 이는 Symbol 이 overriding 되는 것과 같다. 즉, 프로그램에 같은 이름을 작성하여
// Well-Known Symbol 기능을 대체할 수 있다.
// 이런 가변성가 유용성을 제공하는 것이 Well-Known Symbol 의 목적이다.
// 

/** toStringTag */
// [ object Object ] 형태에서 Object 를 Symbol.toStringTag 값으로 표시한다.
// Object.prototype.toString() 과 기능이 비슷하다.
// toString() 은 인스턴스/오브젝트 를 문자열로 반환하며, [ object Object ] 형태로 반환한다.
// 하지만, function Object 역시 [ object Object ] 로 표시된다.
// Object.prototype.toString( funcion() {} ) 을 해보면 알수 있다.
// 이를 통해 명확하게 Object 를 구분할 수 없다는 점을 알수 있다.
//
// 이때 사용할수 있는 방법으로, Symbol.toStringTag 를 사용하여,
// [ object Object ] 의 Object 에 표시될 문자열을 지정할 수 있다.
// 사실 만약 위의 상황이라면, Object.prototype.toString.call( function() {} ) 을 통해
// this 값을 Object 가 아닌 Function 으로 지정해주면 [ object Funciotn ] 이라 나온다.
// 물론 이는 해당 타입에 대해 구분할때 사용하는 방법이기도 하다.
// Symbol.toStringTag 와는 많이 다르다.
// 왜냐하면 Symbol.toStringTag 는 해당 타입 name 을 완전히 바꾸어 버리기 때문이다.
//
// 일단 Symbol.toStringTag 도 있고, Symbol.prototype.toStringTag() 도 있다.
// Symbol.prototype 에 연결된 toStringTag() 는 method 이므로,
// instance 에서 호출할때 사용한다.
// 프로퍼티와 메서드로 사용할수 있다.
//

let Sports = function() {};
let sportsObj = new Sports;
console.log( sportsObj );
console.log( sportsObj.toString() ); // [ object Object ]

Sports.prototype[ Symbol.toStringTag ] = "Sports-Function";
console.log( sportsObj.toString() ); // [ object Sports-Function ];

//
// 이를 보면 알수 있듯이
// sportsObj.toString() 의 [ obejct Object ] 에서 Object 를 완전히 바꾸어 버린다.
// Object 에 표시할 문자열이 Sports-Function 으로 변경된것을 확인할 수 있다.
// 
// 이는 Well-Known Symbol 에서 설명했듯이,
// 엔진에서 제공하는 default Symbol.toStringTag 값을 반환하기 전에
// 우선 sportsObj 에서 Symbol.toStringTag 의 작성 여부를 체크한다. 
// 값이 작성되어 있으면 default Symbol.toStringTag 값을 반환하지 않고,
// Sports.prototype[ Symbol.toStringTag ] 값을 반환한다.
//  
// 자~ 여기까지 내용 이해를 정리해보자..
// 일단 내가 이해하기로는 내가 여태껏 썼던 default 값들이 사실
// Symbol[[Description]] 형태로 저장되어 있었고,
// 우리는 Symbol 이라는 Primitive type 을 사용해 default 값들을
// 재지정 할 수 있다.
// 
// 위의 예에서 Symbol.toStringTag 가 그 예이다.
// new 생성자를 사용하여 Object 를 생성한후,
// Object.prototype.toSting 값은 [ object Object ] 로 default 값이 지정된다.
// 이는 만듬과 동시에 지정되는 타입값이다.
// 하지만 Well-Known Symbol 에 따르며, 해당 defalut 값을
// Well-Known Symbol 을 통해 override 가능하다.
// 그 첫번째 배운 tag 가 바로 Symbol.toStringTag() 이다.
// 이는 위에 작성한대로,
// javascript engine 이 sportsObj 의 Symbol.toStringTag() 가 작성되어 있는지 확인한다.
// 만약 없다면 default Symbol.toStringTag() 를 반환하지만,
// --> 사실 이부분에는 확신이 없다.
//     혹시몰라 각 객체마다 Symbol.toStringTag 를 확인해 보았지만,
//     undefiend 값이다. 이는 단순히 [object Object] 의 값이 default 값으로 
//     보고 설명하는 듯하다. 예외는 있다 Map 이 예외이다.
//     Map 은 Symbol.toStringTag 를 반환한다. 
// 작성되어 있다면, default Symbol.toStringTag() 를 반환하지 않고,
// 작성한 Symbol.toStringTag() ( Sports.prototype[ Symbol.toStringTag] ) 를 반환한다.
// 마치 Prototype 상속과 같이 Override 하는 것 같다.
// 만약 객체의 property 로써 작성하게 되면 어떠한 상황이 나올까?

sportsObj = new Sports;
sportsObj[ Symbol.toStringTag ] = 'Object-Value';
console.log( sportsObj );
console.log( sportsObj.toString() ); // [ object Object-Vlaue]

// override 되어 prototype 까지 검색범위가 확장되지 않는다.
//

/** Class Method 로 사용 */
class Book {};
let bookObj = new Book();
console.log( bookObj.toString() ); // [ object Object ]
// instance 로 toString() 을 실행하면 위의 결과가 나온다.
// 이는 Object 오브젝트 와 Function 오브젝트를 구분할수 없다. 
// 처음에는 무슨 엿같은 해석인가 싶었다..
// new 연산자를 만났으니 당연히 Object 로 해석되겠지!!
// 하지만 다시 생각해보니, 필자가 생각하는것이 혹시나 class 로 인한 혹은 생성자로 인해
// 생성된 instance 를 구분하지 못한다는 말인가? 싶다.
// 단순히 말하면, instance 인지, 아닌지 구분할 수 없다는 얘기 같다.
// 물론, 이것역시 나의 상상력과 이해하려는 마음이 합쳐진 생각이다.
// 분명 이 필자는 나보다 많이 알고 있을테니 일단 따르는 수밖에...
// 하지만, 의심하고 또 의심하라. 그러면 더 정확하게 알수 있다.
//
class Member {
    get [ Symbol.toStringTag ]() {
        return "Member-Class";
    }
}

let memberObj = new Member;
console.log( memberObj.toString() ); //  [ object Member-Class ];
console.log( memberObj.__proto__[ Symbol.toStringTag ] ); // Member-Class
console.log( Map.prototype[ Symbol.toStringTag ] ); // Map;
// class 에서 Symbol.toStringTag 를 getter 로 선언하였다.
// return 문에 [ object Object ] 에서 Object 문자열을 작성한다.
// "Sports-class" 가 반환하므로, 쉽게 구분할 수 있다.
// getter 로 작성하지 않고 method 로 작성하면,
// [ object Object ] 가 반환되므로,
// getter 로 작성해야 한다.

// 여기서 재미있는 사실은 Map Object 이다.
// Map Object 는 Builtin Object 이다.
// ES6 일부 Object 에는 Symbol.toStringTag 가 BuiltIn 으로 포함되어 있다.
// 위 코드를 실행하면 포함되어 있는 toStringTag 가 반환된다.
// 


 