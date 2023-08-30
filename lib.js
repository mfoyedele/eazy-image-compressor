function distance(a, b) {
  const [x1, y1, z1] = a;
  const [x2, y2, z2] = b;
  return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2 + (z1 - z2) ** 2);
}

function listToTriple(arr) {
  const [a, b, c] = arr;
  return [a, b, c];
}

function getArray(xs, b) {
  return xs.map((color) => distance(color, b));
}

function getAverage(list) {
  const sum = list.reduce((acc, val) => acc + val, 0);
  return Math.round(sum / list.length);
}

function getCentroidIndex(centroid, point) {
  const distances = getArray(centroid, point);
  const minDistance = Math.min(...distances);
  return distances.indexOf(minDistance);
}

function insertAt(newElement, index, arr) {
  if (index === null || index < 0 || index > arr.length) {
    return arr;
  }
  const copy = [...arr];
  copy.splice(index, 0, newElement);
  return copy;
}

function createList(centroid, colors, list) {
  return colors.reduce((acc, c) => {
    const centroidIndex = getCentroidIndex(centroid, c);
    return insertAt(c, centroidIndex, acc);
  }, list);
}

function createFinalList(centroid, pixels, list) {
  return pixels.reduce((acc, p) => {
    const centroidIndex = getCentroidIndex(centroid, p[1]);
    return insertAt(p, centroidIndex, acc);
  }, list);
}

function recenterCentroids(centroidLists) {
  return centroidLists.map((centroidList) => {
    const transposed = centroidList.reduce(
      (acc, color) => color.map((val, i) => val + (acc[i] || 0)),
      []
    );
    return transposed.map((val) => Math.round(val / centroidList.length));
  });
}

function recalculateCentroids(centroids, colors) {
  const centroidLists = createList(centroids, colors, centroids.map(() => []));
  return recenterCentroids(centroidLists);
}

function loop(centroids, colors) {
  const lists = [];
  while (true) {
    const newCentroids = recalculateCentroids(centroids, colors);
    lists.push(newCentroids);
    if (JSON.stringify(centroids) === JSON.stringify(newCentroids)) {
      break;
    }
    centroids = newCentroids;
  }
  return lists;
}

export {
  distance,
  listToTriple,
  loop,
  createFinalList,
  recenterCentroids,
  getCentroidIndex,
  insertAt,
};
