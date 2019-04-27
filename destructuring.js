// 다음과 같은 형태가 destructuring 이다.

// let one, two
// [ one, two ] = [ 1, 2 ];

// 위 코드를 실행하면 one 변수에 1 이 할당되고,
// two 변수에 2 가 할당된다.
// ES6 스펙에서 이를 Destructuring Assignment 로 표기한다.

// destructure 의 사전적 의미는 '.. 의 구조를 파괴하다.' 이다.
// 파괴는 있는 것이 없어지는 뉘앙스를 풍기며, ES6 의 destructuring 기능과는 차이가 있다.
// 파괴가 아닌 재할당이라는 점이다.
// 오른쪽에 있는 값들을 분할하여, 왼쪽의 변수에 재할당한다.
// 이는 분할 할당이 맞는 표현일 것이다.
// 이 책에서는 Destructuring Assignment 를 분할 할당 또는 destructuring 이라 표기한다..

let one, two, three, four, five;
const values = [ 1, 2, 3 ];

[ one, two, three ] = values;
console.log( "A: ", one, two, three ); // 1, 2, 3

[ one, two ] = values;
console.log( "B: ", one, two ); // 1, 2

[ one, two, three, four ] = values;
console.log( "C: ", one, two, three, four ); // 1, 2, 3, undefined
// ------------------------ 여기까지는 뭐 예상가능하다. --------------------------

// 근데 잉? 이건 뭥미?
[ one, two, [ three, four ] ] = [ 1, 2, [ 73, 74 ] ];
console.log( "D: ", one, two, three, four ); // 1, 2, 73, 74

// [ one, two, [ three, four ] ] = [ 1, 2, 73, 74 ]; // error 가 난다.
                                                  // 해당하는 배열 ( 2차원 배열 ) 이 없으므로 error 가 난다.
                                                  // 이는 규칙으로 알아두어야 겠다,
                                                  // 정리하면 해당하는 배열이 존재하지 않으면 error 가 난다.
console.log( 'E: ', one, two, three, four );

// 왼쪽과 오른쪽 배열 차원에 맞추어 값을 할당한다.
// one, two 는 1 차원 배열로 1이 one 에 , 2가 two 에 할당한다.
// [three, four ] 와 [ 73, 74 ] 가 2차원 배열이지만,
// 차원이 같으므로 73 이 three, 74 가 four 에 할당한다.

[ one, , ,four ] = [ 1, 2, 3, 4 ]; // variable 없이 comma 로 건너띄면 해당 index 를 건너띈다.
console.log( one, four ); // 1, 4

[ one, ...other ] = [ 1, 2, 3, 4 ];
// 뭐 위의 값은 rest 로 작동될거 같다.
// 즉, 구조분해된 배열을 각 값에 대입하고, 나머지 부분을 배열로 ...other 에 넣는 방식인듯 싶다.
console.log( one, other ); // 1 [ 2, 3, 4 ];


