var PriorityQueue = module.exports = function(size) {
  var me = {}, slots, i, total = null;

  // initialize arrays to hold queue elements
  size = Math.max(+size | 0, 1);
  slots = [];
  for (i = 0; i < size; i += 1) {
    slots.push([]);
  }

  //  Public methods
  me.size = function () {
    var i;
    if (total === null) {
      total = 0;
      for (i = 0; i < size; i += 1) {
        total += slots[i].length;
      }
    }
    return total;
  };

  me.enqueue = function (obj, priority) {
    var priorityOrig;

    // Convert to integer with a default value of size - 1 (lowest priority).
    priority = (priority !== undefined) ? + priority | 0 : size - 1;

    // Clear cache for total.
    total = null;
    if (priority) {
      priorityOrig = priority;
      if (priority < 0 || priority >= size) {
        priority = (size - 1);
        // put obj at the end of the line
        console.error("invalid priority: " + priorityOrig + " must be between 0 and " + priority);
      }
    }

    slots[priority].push(obj);
  };

  me.dequeue = function (callback) {
    var obj = null, i, sl = slots.length;

    // Clear cache for total.
    total = null;
    for (i = 0; i < sl; i += 1) {
      if (slots[i].length) {
        obj = slots[i].shift();
        break;
      }
    }
    return obj;
  };

  return me;
};