// Unscopable ( 범위 미지정 )

// with 문에서 사용하며 값이 true 이면 프로퍼티를 전개하지 않는다.
// 사실 with 문에 대한 지식이 많이 없다.
// 그냥 해당 객체의 scope 에 쉽게 접근가능한 표현문이라는 것만 안다.
// 책에서는 사용하지 않는 것을 권장하여.. 대략적으로 훑고 넘겼는데...
// 알아두는것도 중요한것 같다..
// 사실 사용법은 그다지 어렵지 않고 간편하다.
// 성능상에 문제가 있으며, 복잡해지면 알아보기 힘들다는 이유를 봤던거 같은데..
// 잘 기억은 안난다.

// 구문
// Symbol.unscopables = true/false

// Symbol.unscopables 값이 ture 이면,
// with 문에서 property 를 전개하지 않는다.
// Object 오브젝트의 프로퍼티 키를 사용하면 error 가 발생한다.
//

let sports = { 
    soccer: '축구',  
    baseball: '야구',
}

with( sports ) {
    console.log( soccer, baseball );
}
// with 문을 실행하면 파라미터에 자성한 sports 오브젝트의 프로퍼티가
// 펼쳐진 상태가 된다. 따라서 프로퍼티 값을 구할때
// sports[ 'soccer' ] 형태가 아닌, soccer 만 작성해야 한다.

sports[ Symbol.unscopables ] = { baseball: true };
// with( sports ) 에서 전개하지 않을 프로퍼티를 작성한다.
// baseball property 에 true 를 설정하면,  with( sprots ) 문에 
// baseball property 가 전개되지 않는다.

try {
    with( sports ) {
        console.log( soccer );
        let value = baseball;
    }
} catch ( err ) {
    console.log( err.message );
}

//
// with 에서 baseball porperty 가 전개되지 않는다.
// 그러므로, value 값에 들어갈 baseball 은 존재하지 않아 
// error 가 발생한다.
// 생각해보면, with 문에서는 항상 존재하는 property 값을
// 사용해야 하는구나 싶다.
// 자동으로 undefined 를 설정하지 않는다는 점을 알수 있다.
//

