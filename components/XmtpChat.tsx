import React, { useState } from "react";
import { useAccount } from "wagmi";
//import { useDynamicContext } from "@dynamic-labs/sdk-react-core";

function Chat({ client, messageHistory, conversation }) {
  const { primaryWallet } = client;
  // const address = primaryWallet?.address;
  const { address, isConnecting, isDisconnected } = useAccount()
  console.log("primary wallet", address)
  const [inputValue, setInputValue] = useState("");
  const [viewMode, setViewMode] = useState(false);

  if (!viewMode) {
    return (
      <button
        onClick={() => setViewMode(true)}
        className="bg-blue-500 text-black p-2 rounded hover:bg-blue-600"
      >
        Open Chat
      </button>
    );
  }


  // Function to handle sending a message
  const handleSend = async () => {
    if (inputValue) {
      await onSendMessage(inputValue);
      setInputValue("");
    }
  };

  // Function to handle sending a text message
  const onSendMessage = async (value) => {
    return conversation.send(value);
  };

  // MessageList component to render the list of messages


  const MessageList = ({ messages }) => {
    // Filter messages by unique id
    messages = messages.filter(
      (v, i, a) => a.findIndex((t) => t.id === v.id) === i
    );

    console.log(messages)

    return (
      <ul className="messageList bg-gray-300 rounded-lg p-6 w-80  border border-black-200 z-50">
        {messages.map((message, index) => (
          <li
            key={message.id}
            className="messageItem mb-4 last:mb-0 cursor-pointer hover:bg-gray-100 p-2 rounded-lg"
            title="Click to log this message to the console"
          >
            <strong className="mr-2">
              {message.senderAddress === address ? "You" : "User"}:
            </strong>
            <span className="text-gray-700">{message.content}</span>
            <span className="date text-sm text-gray-500 ml-2"> ({message.sent.toLocaleTimeString()})</span>
            <span className="eyes text-xl ml-2" onClick={() => {console.log(message)}}>
              👀
            </span>
          </li>
        ))}
      </ul>
    );
};


  // Function to handle input change (keypress or change event)
  const handleInputChange = (event) => {
    if (event.key === "Enter") {
      handleSend();
    } else {
      setInputValue(event.target.value);
    }
  };
  return (
    <div className="bg-gray-100 rounded-lg shadow-2xl w-100">
    <div className="bg-black rounded-lg shadow-md overflow-y-auto max-h-60">
        <MessageList messages={messageHistory} />
    </div>
    <div className="mt-4 flex items-center">
        <input
            type="text"
            className="flex-grow border rounded-l-lg p-2 focus:outline-none focus:border-indigo-500"
            onKeyPress={handleInputChange}
            onChange={handleInputChange}
            value={inputValue}
            placeholder="Type your text here..."
        />
        <button
            className="bg-indigo-500 text-black px-6 py-2 rounded-r-lg hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600 active:bg-indigo-700 transition duration-150"
            onClick={handleSend}
        >
            &#128073;
        </button>
    </div>
</div>


  );
}

export default Chat;
