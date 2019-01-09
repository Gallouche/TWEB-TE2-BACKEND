const { expect } = require('chai');
const throttle = require('lodash/range');

const responses = [
  { data: { value: 0 }, next: 1 },
  { data: { value: 1 }, next: 2 },
  { data: { value: 2 }, next: 3 },
  { data: { value: 3 }, next: null },
];

function getPage(pageNum = 0) {
  return new Promise((resolve) => {
    const data = responses[pageNum];
    const delay = Math.floor(Math.random() * 500);
    setTimeout(() => resolve(data), delay);
  });
}

function getAllPages(pageNum = 0, results = []) {
  return getPage(pageNum)
    .then((result) => {
      const { next } = result;
      const values = [...results, result];

      if (!next) {
        return values;
      }
      return getAllPages(next, values);
    });
}

describe('fetch all pages', () => {

  beforeEach(() => {
    console.log('before each test');
  });

  it('should fetch one pages', () => {
    return getPage(2)
      .then(response => {
        expect(response.data.value).to.equal(2);
      });
  });

  describe('something', () => {
    it('should fetch all pages', () => {
      return getAllPages()
        .then((results) => {
          console.log(results);
          expect(results).to.an('array').of.length(4);
        });
    });
  });

  it.skip('should throttle', () => {

    const heavyWork = (number) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log(`work ${number}`);
          resolve();
        }, 200);
      });
    };

    const throttled = throttle(heavyWork, 500);
    
    return Promise.all([
      throttle(1),
      throttle(2),
      throttle(3),
      throttle(4),
      throttle(5),
    ]);
  });
});
