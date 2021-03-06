/*
  Object oriented design is commonly used in video games.  For this part of the assignment you will be implementing several constructor functions with their correct inheritance heirarchy.

  In this file you will be creating three constructor functions: GameObject, CharacterStats, Humanoid.  

  At the bottom of this file are 3 objects that all end up inheriting from Humanoid.  Use the objects at the bottom of the page to test your constructor functions.
  
  Each constructor function has unique properites and methods that are defined in their block comments below:
*/
  
/*
  === GameObject ===
  * createdAt
  * dimensions
  * destroy() // prototype method -> returns the string: 'Object was removed from the game.'
*/
const GameObject = function(attributes) {
	console.log(this, attributes);
	this.createdAt = attributes.createdAt;
	this.dimentions = attributes.dimensions;
}

GameObject.prototype.destroy = function() {
	return 'Object was removed from the game.';
}

/*
  === CharacterStats ===
  * hp
  * name
  * takeDamage() // prototype method -> returns the string '<object name> took damage.'
  * should inherit destroy() from GameObject's prototype
*/
const CharacterStats = function(attributes) {
	GameObject.call(this, attributes);
	this.hp = attributes.hp;
	this.name = attributes.name;
}

CharacterStats.prototype = Object.create(GameObject.prototype);	// Inherit GameObjects prototypes

CharacterStats.prototype.takeDamage = function(amountOfDmg) {
	/* Stretch Code */
	this.hp -= amountOfDmg;
	if (this.hp <= 0) {
		this.destroy();
	}
	/* End stretch code */
	
	return `${this.name} took damage.`;
}

/*
  === Humanoid ===
  * faction
  * weapons
  * language
  * greet() // prototype method -> returns the string '<object name> offers a greeting in <object language>.'
  * should inherit destroy() from GameObject through CharacterStats
  * should inherit takeDamage() from CharacterStats
*/
 const Humanoid = function(attributes) {
	 CharacterStats.call(this, attributes);
	 this.faction = attributes.faction;
	 this.weapons = attributes.weapons;
	 this.language = attributes.language;
 }

 Humanoid.prototype = Object.create(CharacterStats.prototype);	// Inherit ChracterStats prototypes
 
 Humanoid.prototype.greet = function() {
	return `${this.name} offers a greeting in ${this.language}`;
 }

 
 /* Stretch goals */
 const Hero = function(attributes) {
	 Humanoid.call(this, attributes);
 }
 
Hero.prototype = Object.create(Humanoid.prototype);

Hero.prototype.Attack = function() {
	return Math.floor(Math.random() * 5);
}

 const Villain = function(attributes) {
	 Humanoid.call(this, attributes);
 }
 // Copied hero prototype functions into villain to gain access to the Attack function
 Villain.prototype = Object.create(Humanoid.prototype);
 Villain.prototype.Attack = function() {
	return Math.floor(Math.random() * 5);
}
 
/*
  * Inheritance chain: GameObject -> CharacterStats -> Humanoid
  * Instances of Humanoid should have all of the same properties as CharacterStats and GameObject.
  * Instances of CharacterStats should have all of the same properties as GameObject.
*/

// Test you work by uncommenting these 3 objects and the list of console logs below:


  const mage = new Humanoid({
    createdAt: new Date(),
    dimensions: {
      length: 2,
      width: 1,
      height: 1,
    },
    hp: 5,
    name: 'Bruce',
    faction: 'Mage Guild',
    weapons: [
      'Staff of Shamalama',
    ],
    language: 'Common Toungue',
  });

  const swordsman = new Humanoid({
    createdAt: new Date(),
    dimensions: {
      length: 2,
      width: 2,
      height: 2,
    },
    hp: 15,
    name: 'Sir Mustachio',
    faction: 'The Round Table',
    weapons: [
      'Giant Sword',
      'Shield',
    ],
    language: 'Common Toungue',
  });

  const archer = new Humanoid({
    createdAt: new Date(),
    dimensions: {
      length: 1,
      width: 2,
      height: 4,
    },
    hp: 10,
    name: 'Lilith',
    faction: 'Forest Kingdom',
    weapons: [
      'Bow',
      'Dagger',
    ],
    language: 'Elvish',
  });

  console.log(mage.createdAt); // Today's date
  console.log(archer.dimensions); // { length: 1, width: 2, height: 4 }
  console.log(swordsman.hp); // 15
  console.log(mage.name); // Bruce
  console.log(swordsman.faction); // The Round Table
  console.log(mage.weapons); // Staff of Shamalama
  console.log(archer.language); // Elvish
  console.log(archer.greet()); // Lilith offers a greeting in Elvish.
  console.log(mage.takeDamage()); // Bruce took damage.
  console.log(swordsman.destroy()); // Sir Mustachio was removed from the game.


  // Stretch task: 
  // * Create Villian and Hero constructor functions that inherit from the Humanoid constructor function.  
  // * Give the Hero and Villians different methods that could be used to remove health points from objects which could result in destruction if health gets to 0 or drops below 0;
  // * Create two new objects, one a villian and one a hero and fight it out with methods!
const hero = new Hero({
	createdAt: new Date(),
    dimensions: {
      length: 1,
      width: 2,
      height: 4,
    },
    hp: 10,
    name: 'Austin',
    faction: 'Forest Kingdom',
    weapons: [
      'Bow',
      'Dagger',
    ],
    language: 'Elvish',
  });
  
const drEvil = new Villain({
	createdAt: new Date(),
    dimensions: {
      length: 1,
      width: 2,
      height: 4,
    },
    hp: 10,
    name: 'Dr. Evil',
    faction: 'Evil',
    weapons: [
      'Bow',
      'Dagger',
    ],
    language: 'British English',
});

while(hero.hp > 0) {
	let damage = drEvil.Attack();
	hero.takeDamage(damage);
	console.log(`${hero.name} took ${damage} points of damage! HP left: ${hero.hp}`);
	if (hero.hp <= 0) {
		hero.destroy();
	}
}