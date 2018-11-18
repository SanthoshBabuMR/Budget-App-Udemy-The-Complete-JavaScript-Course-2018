// Destructuring: https://www.udemy.com/the-complete-javascript-course/learn/v4/t/lecture/6034316?start=0

////////////////////////////////
// Lecture: let and const

// ES5
var name5 = 'Jane Smith';
var age5 = 23;
name5 = 'Jane Miller';
// console.log(name5);

// ES6
const name6 = 'Jane Smith';
let age6 = 23;
// name6 = 'Jane Miller';
// console.log( name6 );

// ES5
function driversLicence5( passedTest ) {

  if ( passedTest ) {
    var firstName = 'John';
    var yearOfBirth = 1990;
  }
  // console.log( firstName + ' born in ' + yearOfBirth + ', is now officially allowed to drive a car.');

}

driversLicence5( true );

// ES6
function driversLicence6( passedTest ) {

  if ( passedTest ) {
    let firstName = 'John';
    const yearOfBirth = 1990;
  }

  // console.log( firstName + ' born in ' + yearOfBirth + ', is now officially allowed to drive a car.');

}

driversLicence6( true );


let i = 23;

for( let i = 0; i < 5; i += 1 ) {
  // console.log( i );
}
// console.log( i );

////////////////////////////////
// Lecture: Blocks & IIFEs

(function() {
  var c = 10;
})();
// console.log( c );

// ES5
{
  let a = 14;
  const b = 3;
};
// console.log( a );
// console.log( b );


////////////////////////////////
// Lecture: Strings

let firstName = 'John';
let lastName = 'Smith';
const yearOfBirth = 1990;

function calcAge ( year ) {
  return 2016 - year;
}

// ES5
// console.log('This is ' + firstName + ' ' + lastName + '. He was born in ' + yearOfBirth + '. Today, he is ' + calcAge( yearOfBirth) + ' years old.')

// ES6
// console.log(`This is ${firstName} ${lastName}. He was born in ${yearOfBirth}. Today, he is ${calcAge( yearOfBirth)} years old.`);


const n = `${firstName} ${lastName}`;
// console.log( n.startsWith('J') );
// console.log( n.startsWith('John') );
// console.log( n.endsWith('H') );
// console.log( n.endsWith('h') );
// console.log( n.includes('oh') );
// console.log( n.includes('n S') );
// console.log( firstName.repeat(5) );
// console.log( `${firstName} `.repeat(5) );


////////////////////////////////
// Lecture: Arrow Functions

const years = [ 1990, 1965, 1982, 1937 ];

// ES5
var ages5 = years.map(function ( el ) {
  return 2018 - el;
});
// console.log( ages5 );

// ES6
let ages6 = years.map(el => 2018 - el);
// console.log( ages6 );

ages6 = years.map(( el, index ) => `Age element ${index + 1}: ${2018 - el}.`);
// console.log( ages6 );

ages6 = years.map(( el, index ) => {
  const now = new Date();
  const age = now.getFullYear() - el;
  return  `Age element ${index + 1}: ${age}.`;
});
// console.log( ages6 );


// ES5
var box5 = {
  color: 'green',
  position: 1,
  clickMe: function () {
    // required, since event callback resets `this` to point to DOM element
    var self = this;
    document.querySelector('.green').addEventListener( 'click', function () {
      console.log(this);
      var str = 'This is box number ' + self.position + ' and it is ' + self.color;
      alert(str);
    });
  }
};

box5.clickMe();


// ES6
const box6 = {
  color: 'blue',
  position: 2,
  clickMe: function () {
    document.querySelector('.blue').addEventListener( 'click', () => {
      const str = `This is box number ${this.position} and it is ${this.color}`;
      alert(str);
    });
  }
};

box6.clickMe();


// ES6
// const box66 = {
//  color: 'orange',
//  position: 2,
//  clickMe() {
//    document.querySelector('.orange').addEventListener( 'click', () => {
//      const str = `This is box number ${this.position} and it is ${this.color}`;
//      alert(str);
//    });
//  }
// };

// box66.clickMe();


function Person ( name ) {
  this.name = name;
}

// ES5
Person.prototype.myFriends5 = function ( friends ) {
  // retain context
  var self = this;
  var arr = friends.map( function ( friend ) {
    return self.name + ' is friends with ' + friend;
  });
  return arr;
}

// ES5
Person.prototype.myFriends55 = function ( friends ) {
  // retain context
  var arr = friends.map( function ( friend ) {
    return this.name + ' is friends with ' + friend;
  }.bind( this ));
  return arr;
}


// ES6
Person.prototype.myFriends6 = function ( friends ) {
  return friends.map( friend => `${this.name} is friends with ${friend}` );
}


var friends = [ 'Bob', 'Jane', 'Mark' ];

// console.log( new Person( 'Foo' ).myFriends5( friends ) );
// console.log( new Person( 'Bar' ).myFriends55( friends ) );
// console.log( new Person( 'Baz' ).myFriends6( friends ) );


////////////////////////////////
// Lecture: Destructuring

// ES5
var john = ['John', 26];
var name = john[0];
var age = john[1];

// ES6
const [ userName, userAge ] = john;

// console.log( name );
// console.log( age )
// console.log( userName );
// console.log( userAge );

const obj = {
  userFN: 'John',
  userLN: 'Smith'
};

const { userFN, userLN } = obj;
// console.log( userFN );
// console.log( userLN );

const { userFN: userFN1, userLN: userLN1 } = obj;
// console.log( userFN1 );
// console.log( userLN1 );


function calcAgeRetirement ( year ) {
  const age = new Date().getFullYear() - year;
  return [ age, 65 - age ];
}

var [age, retirement] = calcAgeRetirement ( 1998 );

// console.log( age );
// console.log( retirement );


////////////////////////////////
// Lecture: Arrays

const boxes = document.querySelectorAll( '.box' );

// ES5
var boxesArr5 = Array.prototype.slice.call( boxes );

// boxesArr5.forEach(function ( box ) {
//   box.style.backgroundColor = 'dodgerblue';
// });

// ES6
const boxesArr6 = Array.from( boxes );
// boxes.forEach( box => box.style.backgroundColor = 'orangered' )



// ES5
// for( var j = 0; j < boxesArr5.length; j += 1 ) {
//   if ( boxesArr5[j].className === 'box blue') {
//     continue;
//   }
//   boxesArr5[j].style.backgroundColor = 'dodgerblue';
// }

// ES6
// for( const cur of boxesArr6 ) {
//   if ( !cur.className.includes( 'blue' ) ) {
//     cur.textContent = 'I changed to blue!'; 
//   }
// }


// ES5
{
  var ages = [ 12, 17, 8, 21, 14, 11 ];
  var full = ages.map(function (age) {
    return age >= 18;
  });
  // console.log( full );

  // console.log( full.indexOf( true ) );

  // console.log( ages[full.indexOf( true )] );
}

// ES6
{
  const ages = [ 12, 17, 8, 21, 14, 11 ];
  const index = ages.findIndex( age => age >= 18 );
  // console.log( index );
  // console.log( ages[index ] );

  const age = ages.find( age => age >= 18 );
  // console.log( age );
}


////////////////////////////////
// Lecture: Spread operator
{

  function addFourAges (a, b, c, d) {
    return a + b + c + d;
  }

  // ES5
  var sum1 = addFourAges( 18, 30, 12, 21 );
  // console.log( sum1 );
  
  var ages = [ 18, 30, 12, 21 ];
  var sum2 = addFourAges.apply( null, ages );
  // console.log( sum2 );

  // ES6
  const sum3 = addFourAges( ...ages );
  // console.log( sum3 );

  const familySmith = [ 'John', 'Jane', 'Mark' ];
  const familyMiller = [ 'Mary', 'Bob', 'Ann'];

  const bigFamily = [ ...familySmith, 'Lily', ...familyMiller ];
  // console.log( bigFamily );

  const title = document.querySelector( 'h1' );
  const boxes = document.querySelectorAll( '.box' );
  // Using spread operator with NodeList
  const all = [ title, ...boxes ];
  // all.forEach( item =>  item.style.backgroundColor = 'gold' );

}

////////////////////////////////
// Lecture: Rest Parameters

// ES5
function isFullAge5 () {
  const args = arguments;
  var argsArr = Array.prototype.slice.call( args );

  argsArr.forEach( function ( year ) {
    console.log( 2016-year >= 18 );
  });
}

// console.group('ES5: isFullAge5');
// isFullAge5( 1990, 1999, 1965 );
// isFullAge5( 1990, 1999, 1965, 2016, 1987 );
// console.groupEnd();

// ES6
// console.group('ES6: isFullAge6');
function isFullAge6 ( ...years ) {
  years.forEach( year => console.log( 2016 - year >=18 ) );
}

// isFullAge6( 1990, 1999, 1965 );
// isFullAge6( 1990, 1999, 1965, 2016, 1987 );
// console.groupEnd();

// ES5
function isCustomizedFullAge5 ( limit ) {
  const args = arguments;
  var argsArr = Array.prototype.slice.call( args, 1 );

  argsArr.forEach( function ( year ) {
    console.log( 2016 - year >= limit );
  });
}

// console.group('ES5: isCustomizedFullAge5');
// isCustomizedFullAge5( 21, 1990, 1999, 1965 );
// isCustomizedFullAge5( 30, 1990, 1999, 1965, 2016, 1987 );
// console.groupEnd();

// console.group('ES6: isCustomizedFullAge6');
// ES6
function isCustomizedFullAge6 ( limit, ...years ) {
  years.forEach( year => console.log( 2016 - year >= limit ) );
}

// isCustomizedFullAge6( 21, 1990, 1999, 1965 );
// isCustomizedFullAge6( 30, 1990, 1999, 1965, 2016, 1987 );
// console.groupEnd();

////////////////////////////////
// Lecture: Default Parameters

// ES5
function SmithPerson5 (firstName, yearOfBirth, lastName, nationality) {
  this.firstName = firstName;
  this.yearOfBirth = yearOfBirth;
  this.lastName = lastName === undefined ? 'Smith' : lastName;
  this.nationality = nationality === undefined ? 'American' : nationality;
}

var john5 = new SmithPerson5('John', 1990);
var emily5 = new SmithPerson5('Emily', 1983, 'Diaz', 'Spanish');
// console.log( john5 );
// console.log( emily5 );


// ES6
function SmithPerson6 (firstName, yearOfBirth, lastName = 'Smith', nationality = 'American') {
  this.firstName = firstName;
  this.yearOfBirth = yearOfBirth;
  this.lastName = lastName;
  this.nationality = nationality;
}

const john6 = new SmithPerson6('John', 1990);
const emily6 = new SmithPerson5('Emily', 1983, 'Diaz', 'Spanish');
// console.log( john6 );
// console.log( emily6 );


////////////////////////////////
// Lecture: Maps

let question = new Map();
question.set('question', 'What is the official name of the latest major JavaScript version?');
question.set(1, 'ES5');
question.set(2, 'ES6');
question.set(3, 'ES2015');
question.set(4, 'ES7');
question.set('answer', 3);
question.set(true, 'Correct :D');
question.set(false, 'Incorrect. Please try again!');

// get size
// console.info(`question.size: ${question.size}`)

// contains a specific key
// console.info(question has key 4: ${question.has(4)}`)

// delete an entry
if (question.has(4)) {
  // console.info(`delete key 4: ${question.delete(4)}`)
}

// access an entry
// console.log(`question.get(4): ${question.get(4)}`);

// looping all entries using forEach
// console.info('looping all entries using forEach:');
// question.forEach( (value, key) => console.log(`${key}: ${value}`));

// looping all entries using for of
// console.info('looping all entries using for of:');
// for( [key, value] of question.entries() ) {
//   console.log(`${key}: ${value}`);
// } 

// console.log(question.get('question'));

for( [key, value] of question.entries() ) {
  if (typeof key === 'number')
    // console.log(`${key}: ${value}`);
}

// let answer = parseInt(prompt('Choose the correct answer'), 10);

// console.log(question.get(answer === question.get('answer')));















































