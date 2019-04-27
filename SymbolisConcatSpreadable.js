// Array Object 의 concat() 에서 배열을 결합할때
// 결합하는 배열의 펼침 여부를 지정한다.
//

// 구문
// Symbol.isConcatSpreadable = true/false, DEFAULT true
// 
// 프로퍼티에 false 를 할당하면,
// one.concat( two ) 에서 two 배열을 펼치지 않고 그대로
// one 배열 끝에 첨부한다.
// 프로퍼티로만 사용할 수 있으며,
// 함수로 사용할 수 없다.
// Array-like Object 에서 사용할 수 있으며,
// 상속받을 class 에 사용할 수 있다.
//

let one = [ 11, 12 ],
    two = [ 13, 14 ];

let result = one.concat( two );
console.log( '1: ', result, result.length );

two[ Symbol.isConcatSpreadable ] = false;
result = one.concat( two );
console.log( '2: ', result, result.length );
two[ Symbol.isConcatSpreadable ] = true;
result = one.concat( two );
console.log( '3: ', result, result.length );

// Array-like 에 사용한 예

let arrLike = { 0: 1, 1: 2, length: 2 };
result = one.concat( arrLike );
console.log( result ); // [ 11, 12, { 0: 1, 1: 2, length: 2 } ];

arrLike[ Symbol.isConcatSpreadable ] = true;
//
// Defulat 값은 ture 라고 했지만, Array-like 객체는
// Array 가 아니므로 false 라고 생각했다. 
// 그 이유는 마치 false 인듯 행동하기 때문이다.
// Object 에도 Symbol.isConcatSpreadable 이 있는지는
// 아직 잘 모르겠다. 일단 위에서 같이 나열되지 않고,
// 마치 Symbol.isConcatSpreadable = false 인듯
// 작동되기에 그렇다고 예상해 본다.
// 근데 재미있는건 Symbol.siConcatSpreadable = true 를
// 지정한순간,  concat이 나열된다는 것이다.
//

result = one.concat( arrLike );
console.log( result ); // [ 11, 12, 1, 2 ];
// 이는 책에서 설명한 예제와 다르게
// 내가 작성한 예제이다.
// 책 268p 를 다시한번 훑어 보는것도 좋을것 같다.
// 근데 상속받을 class 에서 사용할수 있다는데..
// 이거 예상이 잘 안간다...
//

