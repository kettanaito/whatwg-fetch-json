const { fetch: fetchPolyfill } = require('whatwg-fetch')

test('produces [object Object] out of the non-stringified request body', async () => {
  let xhrMock = {
    open: jest.fn(),
    setRequestHeader: jest.fn(),
    onreadystatechange: jest.fn(),
    send: jest.fn(),
    readyState: 4,
    status: 200,
  }

  window.XMLHttpRequest = jest.fn(() => xhrMock)

  fetchPolyfill('https://httpbin.org/post', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: { a: 1 },
  })

  expect(xhrMock.send).toBeCalledWith('[object Object]')
})

test('produces [object Array] out of the non-stringified request body', async () => {
  let xhrMock = {
    open: jest.fn(),
    setRequestHeader: jest.fn(),
    onreadystatechange: jest.fn(),
    send: jest.fn(),
    readyState: 4,
    status: 200,
  }

  window.XMLHttpRequest = jest.fn(() => xhrMock)

  fetchPolyfill('https://httpbin.org/post', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: [1, 2, 3],
  })

  expect(xhrMock.send).toBeCalledWith('[object Array]')
})
