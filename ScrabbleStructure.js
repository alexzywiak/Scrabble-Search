var ScrabbleStructure = function(letter) {
  // var tree = Object.create(ScrabbleStructure.prototype);
  // first node is an empty string
  //tree.childNodes = {};
  this.letter = letter || '';
  this.isWord = false;
  // childNodes --> possible next letters
  // tree.childNodes = {a: Node(a), b: Node(b)}
  // value of the node is the letter
  // Indicate if it's a complete word
  // return tree;
};

// Adds a new word into the prefix tree
ScrabbleStructure.prototype.insert = function(word) {
  var currentNode = this;
  var newNode;
  var ch;
  // loop through the letters (for-->charAt)
  for (var i = 0; i < word.length; i++) {
    ch = word.charAt(i);
    // Next letter node exists already
    // Move current node to that node
    if (currentNode[ch]) {
      // Move current node on to the next child node corresponding to next letter
      currentNode = currentNode[ch];
      // Next letter node DOESN'T exists
    } else {
      // create a new child node for the next letter
      // move current node on to the new node
      newNode = new ScrabbleStructure(ch);
      currentNode[ch] = newNode;
      currentNode = newNode;
    }
    // 
    if (i === word.length - 1) {
      currentNode.isWord = true;
    }
  }
};

// Runs and returns a callback on a word if it exists in the prefix tree otherwise returns false
ScrabbleStructure.prototype.traverse = function(word, cb) {
  var currentNode = this;
  var ch;

  for (var i = 0; i < word.length; i++) {
    ch = word.charAt(i);
    if (!currentNode[ch]) {
      return false;
    } else {
      currentNode = currentNode[ch];
    }
    if (i === word.length - 1 && currentNode.isWord) {
      return cb(currentNode, word);
    }
  }
  return false;
};

// Check if word exists in Prefix tree
ScrabbleStructure.prototype.contains = function(word) {
  return this.traverse(word, function(currentNode, word) {
    return true;
  });
};

ScrabbleStructure.prototype.remove = function(word) {
  return this.traverse(word, function(currentNode, word) {
    currentNode.isWord = false;
    return word;
  });
};

ScrabbleStructure.prototype.scrabbleSearch = function(letters) {
  var words = [];

  letters = letters.split('');

  var recurse = function(node, word, letters) {

    for (var i = 0; i < letters.length; i++) {
      var ch = letters[i];
      if (node[ch]) {
        letters.splice(i, 1);
        word += ch;
        if (node[ch].isWord) {
          words.push(word);
        }
        recurse(node[ch], word, letters.slice());
        word = word.substr(0, word.length - 1);
        letters.splice(i, 0, ch);
      }
    }
  };

  recurse(this, '', letters)

  return words;
};
