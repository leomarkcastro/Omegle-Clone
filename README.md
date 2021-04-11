# Omegle Clone

This is an 'attempt' to clone omegle by creating an interface in React (global states handled by Redux) and where the backend APIs are from the omegle website itself(sniffed by using mitmproxy)

## You can...

- Create chat sessions (with topics and no topics). Topics are only currently separated by space so 'abc def' will be considered as topic 'abc' and 'def'.
- Receive typing, connected and message updates in real-time
- Send message (this though i dont know if it reaches the stranger)

## Current Bugs

- Upon starting of a succesful chat, will crash at approximately 30 seconds.
- Crashes 50% of the time
- If the chat ended, you need to refresh the whole page
