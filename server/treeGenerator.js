var express = require('express');
var path = require('path');
var Promise = require('bluebird');

var utils = require('./familyUtils.js');

var familyGenerator = express.Router();

var startingGenerations = {
		1: 2000,
		2: 1950,
		3: 1900,
		4: 1850,
		5: 1800,
		6: 1750,
		7: 1700,
		8: 1650,
		9: 1600,
		10: 1550,
};

var Person = function(name,last, bio, born){
		this.name = name;
		this.last = last;
		this.bio = bio;
		this.born = born;
		this.children = [];
};

Person.prototype.haveChildren = function(){
	if(!this.partner){return}
	var childNumber = Math.floor(Math.random() * (4));
	var momBirthYear = this.bio === 'male' ? this.partner.born : this.born;
	var childLast = this.bio === 'male' ? this.last : this.partner.last;
	for(var children = 0 ; children < childNumber; children++){
		var childBio = utils.generateBio();
		this.children.push(new Person(utils.generateName(childBio),childLast, childBio, utils.generateBorn(momBirthYear)));
	}
}

Person.prototype.generatePartner = function(){
  var bio;
  var birthYear;
  if(this.bio === 'male'){
    bio = 'female';
    birthYear = this.born + (Math.floor(Math.random() * 14 ) );
  }else{
    bio = 'male';
    birthYear = this.born - (Math.floor(Math.random() * 14) );
  }

  var partner = new Person(utils.generateName(bio), utils.generateLast(), bio, birthYear);
  this.partner = partner;
}


var Family = function(gen){
	if(gen >10){
		gen = 10;
	}
	this.gen = gen;
	this.root = null;
};

Family.prototype.createRoot = function(){
	if(!this.root){
		var rootBio = utils.generateBio();
		this.root = new Person(utils.generateName(rootBio), utils.generateLast(),rootBio, startingGenerations[this.gen])
		this.root.generatePartner();
		if(this.root.born + 100 <= 1917){
			var died = utils.generateDied(this.root.born);
			while(died - this.root.born < 18 ){
				died = utils.generateDied(this.root.born);
			}
			this.root.died = died;
		}
		// generate children
  	this.root.haveChildren();
	}
};
Family.prototype.populate = function(person, gen){

  if(gen <= 0){return};
  if(person.children.length <= 0 ){return};

  for(var i = 0 ; i< person.children.length; i++){
  	var child = person.children[i]
  	 // if(child.born + 100 <= 1917){
  		child.died = utils.generateDied(child.born);
  		console.log(child.died);
  	// }
  	if(child.died - child.born > 13 || child.died === undefined){
  		child.generatePartner();
  		child.haveChildren();
  		this.populate(child, gen - 1);
  	}else{
  		return;
  	}
  }
  return;
}


familyGenerator.get('/new', (req, res)=>{
	var fam = new Family(3);
	fam.createRoot();
	fam.populate(fam.root, fam.gen);
	res.json(fam);

	// console.log(JSON.stringify(fam))

})

	module.exports = familyGenerator;