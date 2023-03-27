import { useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import WittyWishesLogo from "./assets/WittyWishes.png";
import { BiCopy } from "react-icons/Bi";
import { HiSparkles } from "react-icons/hi";

//open ai config
const configuration = new Configuration({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
});
const apiClient = new OpenAIApi(configuration);

const App = () => {
  const [personName, setPersonName] = useState("");
  const [relation, setRelation] = useState("");
  const [response, setResponse] = useState("");

  const handlePersonNameChange = (event) => {
    setPersonName(event.target.value);
  };

  const handleRelationChange = (event) => {
    setRelation(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const completions = await apiClient.createCompletion({
        model: "text-davinci-003",
        prompt: `write a birthday message to my ${relation} whose name is my ${personName} and add emojis to make it more fun.`,
        max_tokens: 1080,
        temperature: 0.7,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });
      console.log(completions);
      setResponse(completions.data.choices[0].text);
    } catch (error) {
      console.log(error);
    }
  };

  const isDisabled = personName.trim() === "" || relation.trim() === "";

  return (
    <div className="flex flex-col items-center justify-center px-4 sm:p-0">
      <img
        src={WittyWishesLogo}
        alt="WittyWishes Logo"
        className="h-20 mb-10 mt-40 "
      />

      <form onSubmit={handleSubmit} className="w-80 max-w-lg">
        <div className="flex items-center border-b-2 border-indigo-600 py-2">
          <input
            className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Enter the name of the person"
            value={personName}
            onChange={handlePersonNameChange}
          />
        </div>
        <div className="flex items-center border-b-2  border-indigo-600 py-2">
          <input
            className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="what is your relation with this person"
            value={relation}
            onChange={handleRelationChange}
          />
        </div>
        <div className="flex justify-center items-center py-2">
          <button
            className="flex items-center  bg-indigo-600 hover:bg-indigo-700 border-indigo-600 hover:border-indigo-700 text-sm border-4 text-white py-1 px-2 rounded "
            type="submit"
            disabled={isDisabled}
          >
            Generate <HiSparkles className="ml-1" />
          </button>
        </div>
      </form>

      {response && (
        <div className="w-full max-w-lg mt-4">
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 relative">
            <p className="text-gray-700 text-base">{response}</p>
            <button
              onClick={() => navigator.clipboard.writeText(response)}
              className="absolute buttom-0 right-0  rounded-full h-8 w-8 flex items-center justify-center hover:bg-gray-300"
            >
              <BiCopy />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
