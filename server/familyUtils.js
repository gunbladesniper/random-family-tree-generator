
var names = {
	male:['Adam', 'Bruce', 'Dave', 'Ethan', 'Greg', 'Harry', 'Ian', 'John', 'Kevin', 'Larry', 'Mike', 'Neil', 'Phil', 'Randy', 'Steve', 'Tom', 'Vlad', 'Walter', 'Zack'],
	female:['Ashley', 'Beth', 'Candice', 'Deborah', 'Ellie', 'Francis', 'Ginny', 'Harriet', 'Izzy', 'Joan', 'Kelly', 'Laura', 'Mary', 'Nicole', 'Ophelia', 'Penny', 'Ruth', 'Samantha', 'Tasha', 'Victoria', 'Winifred', 'Zoe '],
	last: ['Adams', 'Bryant', 'Cole', 'Davidson', 'Ericson', 'Green', 'Harris', 'Iverson', 'Kline', 'Louis', 'Michaels', 'Nelson', 'Owens','Prince', 'Queen', 'Ryan', 'Storm', 'Trace', 'Ulver', 'Willson', 'Yardly', 'Zoan']
};

var bio = ['male', 'female'];

exports.generateBorn = function(motherBorn){
	var age = Math.floor(Math.random() * (35 - 14 + 1)) + 14;
	return motherBorn + age;
}

exports.generateDied = function(bornDate){
  return bornDate + Math.floor(Math.random() * 101);
}

exports.generateName = function(gen){
	var random = Math.floor(Math.random() * names[gen].length) ;
	return names[gen][random];
}

exports.generateLast = function(){
	var random = Math.floor(Math.random() * names.last.length)
	return names.last[random];
};
exports.generateBio = function(){
  var random = Math.floor(Math.random() * bio.length)
  return bio[random];
}

exports.generatePartner = function(person , Constr){
  var bio;
  var birthYear;
  if(person.bio === 'male'){
    bio = 'female';
    birthYear = person.born + (Math.floor(Math.random() * 14 ) );
  }else{
    bio = 'male';
    birthYear = person.born - (Math.floor(Math.random() * 14) );
  }

  var partner = new Constr(exports.generateName(bio), exports.generateLast(), bio, birthYear);
  person.partner = partner;
}

exports.generateChildren = function(person, Constr){
	if(!person.partner){return}
	var childNumber = Math.floor(Math.random() * 5 );
	var momBirthYear = person.bio === 'male' ? person.partner.born : person.born;
	var childLast = person.bio === 'male' ? person.last : person.partner.last;
	for(var children = 0 ; children < childNumber; children++){
		var childBio = exports.generateBio();
		person.children.push(new Constr(exports.generateName(childBio),childLast, childBio, momBirthYear))
	}
}

