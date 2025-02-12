
const url = "http://localhost:11434/api/chat"



fetch(url, {
  method: 'POST', // Specify the HTTP method
  headers: {
    'Content-Type': 'application/json', // Inform the server about the data type
  },
  body: JSON.stringify({
    "model": "mistral",
    "messages": [
      {
        "role": "user",
        "content": "why is the sky blue?"
      }
    ],
    "stream" : false,
}), // Convert the JavaScript object to a JSON string
}).then(res => res.json())
.then(res => console.log(res));