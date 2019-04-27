// Template Literal 은 문자열 처리를 위한 템플릿을 제공한다.
// 이 책에서는 표기의 편의를 위하 Template Literal 으로 표기한다.
// Array Literal 을 [] 라고 하는것과 같다.

// 구문
// `string`
// `string ${ expression } string`
// tag 'string ${ expression } string'

// `string` 형태에서 ` 는 자판에서 ~과 같이 있는 문자이다.
// SPEC 에서 Template Character 로 표기하고 있다.
// 한글 사전에서 역따옴표를 찾으면 나오지 않지만,
// 개발자들 사이에서 역따옴표로 표기하고 있다.

// `` 안에 `AB${ expression }` 와 같이 문자열과 표현식을 같이 작성할 수 있다.
// 이때 `` 안의 AB 는 문자열이며, ${ expression } 은 표현식으로써 역할을 한다.
// 원래 Template Literal 이 나오기전에는 위와 같은 상황을 이렇게 적었다.
// "AB" + expression 
// 짧을때는 불편한지 모르겠지만, 길어지면 상당히 불편하다.
// 심지어 사용할 변수( 표현식 ) 이 많아지면,  이또한 곤욕이리라...

console.log( "1: ", `123ABC가나다` );
console.log( "2 :", `라인 1\n라인 2`); // ecma5 의 \n으로 인해 개행한다.
console.log( '3: ', `첫 번째 줄
두 번째 줄`); // enter 로 인해 개행한다. ( 주의: 공백역시 인식한다. )

let one = 1, 
    two = 2;

console.log( '4: ', `1 + 2 는 ${ one + two } 이다. `); // ${ expression } 으로 인해 표현식이 사용된다.

// *** tagged Template ***

// 다음 구문과 같이 Template 안에 tag를 작성한 형태를 tagged Template 라고 한다.
// tag `string ${ expression } string`

// tag 위치에 호출할 함수 이름을 작성한다.
// 함수를 호출하기 전에 템플릿에서 문자열과 표현식을 분리하고 이를 파라미터 값으로 넘겨준다.
// 함수 이름이 작성된 템플릿을 태그 탬플릿이라고 하고 호출되는 함수를 태그 함수라고 한다.

one = 1,
two = 2;

function tagFunction( text, value ) {
    console.log( '1: ', text[ 0 ] );
    console.log( '2: ', value );
    console.log( '3: ', text[ 1 ] );
    console.log( '4: ', typeof text[ 1 ] );
}

tagFunction `1 + 2 = ${ one + two } 이다.`;

// 다수의 parameter 형태

// 호출하는 함수에는 문자열을 배열로 넘겨주므로,
// 태그 함수의 파라미터에 이름을 하나만 작성하면 된다.

function tagFunction1( text, plus, minus ) {
    console.log( text[ 0 ], plus, text[ 1 ] );
    console.log( minus, text[ 2 ], text[ 3 ] );
}

tagFunction1 `1 + 2 = ${ one + two } 이고 1 - 2 = ${ one - two } 이다.`;
// text[ 0 ] = " 1 + 2 = " 이 되고,
// text[ 1 ] = " 이고 1 - 2 = " 이다.
// text[ 2 ] = " 이다." 로 끝난다.
// text[ 3 ] = undefined 이다.

// 위에 대해서 배열형태로 구성되므로 이렇다고 보면 된다.
// text = [ "1 + 2 = ", " 이고 1 - 2 = ", " 이다." ];

// 알다시피 Array 에 없는 값을 가져오면 undefined 이다.

// 위의 함수를 기준으로 parameter 값을 만들어보면 이러한 결과가 나온다.
// ( [ "1 + 2 = ", " 이고 1 - 2 = ", " 이다." ], 3, -1 )
// 이러한 parameter 를 구성하여 함수에서 사용한다.

// 위에 있는 parameter 를 좀더 단순화 시켜보면 아래와 같이 사용도 가능하다.

function tagFunction2 ( text, ...rest ) {
    console.log( text[ 0 ], rest[ 0 ], text[ 1 ] );
    console.log( rest[ 1 ], text[ 2 ], text[ 3 ] );
}

tagFunction2 `tag2: 1 + 2 = ${ one + two } 이고 1 - 2 = ${ one - two } 이다.`;
// rest parameter 를 사용하여 더 단순화 시켰다.
// 물론 단순화 시킨만큼 추상적인 부분이 있어서, 코드에 대한 이해역시 필요하다.

/** String.raw ( 말 그대로 가공되지 않은.. ) */ 

// Template expression 은 변환하지만 특수문자와 유니코드는 문자열로 인식한다.
// String.raw 를 작성하고, 이어서 Template Literal 을 작성한다.
// 가급적 Template 를 적용하지 않고 문자열로 표현하려는 경향이 강하다.

console.log( '1: ', String.raw`1 + 2 = ${ one + two }` ); // 1 + 2 = 3

console.log( '2: ', `줄 바꿈 -1\n줄 바꿈 -2`); // 줄바꿈됨
console.log( '3: ', String.raw`줄 바꿈 -1\n줄 바꿈 -2` ); // 줄 바꿈 -1\n줄 바꿈 -2

console.log( '4: ', `Unicode \u0031\u0032` ); // Unicode 12
console.log( '5: ', String.raw`Unicode \u0031\u0032` ); // Unicode \u0031\u0032

// String.raw(): 문자열 전개, 조합

// 첫번째 파라미터의 raw property 값인 문자열을 문자 하나씩 전개하면서
// 두번째 이후의 파라미터를 조합하여 반환한다.

let result = String.raw( { raw: 'ABCDE' }, one, two, 3 );
console.log( result ); // A1B2C3DE

// 위 code 는 다음의 순서와 방법으로 { row: "ABCDE" } 에서 
// 'ABCDE' 의 두번째 이후의 파라미터 값을 조합한다.

// 1. String.raw() 의 두번째 파라미터인 one 변수에 1을 설정한다.
// 2. String.raw() 의 세번째 파라미터인 two 변수에 2를 설정한다.
// 3. { raw: "ABCDE" } 에서 A 를 반환할 버퍼에 추가한다.
// 4. raw() 의 두번째 파라미터인 one 변수 값 1 을 반환 버퍼 끝에 추가한다.
// 5. { raw: "ABCDE" } 에서 B 를 반환 버퍼 끝에 추가한다.
// 6. raw() 의 세번째 파라미터인 two 변수 값 2 를 반환 버퍼의 끝에 추가한다.
// 7. { raw: 'ABCDE' } 에서 C 를 반환할 버퍼에 추가한다.
// 8. raw() 의 네번째 파라미터인 3 을 반환 버퍼에 추가한다.
// 9. { raw: 'ABCDE' } 에서 D 를 반환할 버퍼에 추가한다.
// 10. 추가할 파라미터가 없다.
// 11. { raw: 'ABCDE' } 에서 E 를 반환할 버퍼에 추가한다.
// 12. 추가할 파라미터가 없다.
// 13. 반환 버퍼를 반환한다.

