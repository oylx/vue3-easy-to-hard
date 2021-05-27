export default [{
  url: '/api/users',
  method: 'get',
  response: req => {
    return {
      codeL: 0,
      date: [{ name: 'tom' }, { name: 'jerry' }],
    };
  },
}];
