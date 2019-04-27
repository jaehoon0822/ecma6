// Symbol 값 변경
//
// Symbol() 로 생성한 Symbol 값을 변경할 수 없다.
// Symbol 값에 문자열을 연결할 수 있으나, String() 또는 toString() 을 사용해야 한다.
// 그렇다고 Symbol 값이 연결되는 것은 아니며, Symbol 값을 생성할 때의 형태를 연결한다.
// + 연산자로 문자열을 연결하면 에러가 발생한다.
// Symbol 값을 Template 에 사용할 수 없다.
//

let sym = Symbol();
try {
    +sym;
} catch ( err ) {
    console.log( "+stm 사용불가" ); 
    // 단항 연산다를 사용하여 Number 타입으로 변환하면 에러 
};
try {
    sym | 0;
} catch ( err ) {
    console.log( "sym | 0 사용불가" ); 
    // Symbol 과 비트 or 연산자를 사용하면 에러
};

console.log( '-------------------------------------' );

sym = Symbol();
try {
    sym + '문자열';
} catch {
    console.log( '문자열 연결 불가' );
};

console.log( String( sym ) + "연결" );
console.log( sym.toString() + "연결" );

// 일반 문자열을 + 연산자로 연결하려 하면 error 가 나지만,
// String Object 를 사용하여 문자열화 시킨후 + 연산자와 문자열을 연결하면,
// 문자열을 연결할 수 있다.
// toString() 으로도 Symbol 값을 문자열로 변환하면 문자열을 연결할 수 있다.

sym = Symbol( '123' );
try {
    `${ sym }`;
} catch ( err ) {
    console.log( '`${ sym }` 불가' );
}

// 위에서 설명했듯이.
// Template 를 사용하면 error 가 난다.
// Template 에 반연되면 문자열 값으로 변환되어 외부에 노출되기 때문이다.
// Symbol 값을 생성한 형태마저도 반영되지 않는다.
// Symbol 값을 외부에 노출시키지 않는 것이 Symbol 의 특징이다.