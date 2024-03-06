import { useEffect, useState } from "react";
import { diffWordsWithSpace } from "diff";

function App() {
  const [originalText, setOriginalText] = useState("");
  const [modifiedText, setModifiedText] = useState("");
  const [diff, setDiff] = useState("");

  useEffect(() => {
    const diffResult = diffWordsWithSpace(originalText, modifiedText);
    const formattedDiff = diffResult
      .map((part) => {
        const style = part.added
          ? "underline text-green-500"
          : part.removed
          ? "underline text-red-500"
          : "text-gray-900";
        return `<span class="${style}">${part.value}</span>`;
      })
      .join("");
    setDiff(formattedDiff);
  }, [originalText, modifiedText]);

  const copyToClipboard = () => {
    const diffResult = diffWordsWithSpace(originalText, modifiedText);
    const formattedDiff = diffResult
      .map((part) => {
        return part.added
          ? `<u>${part.value}</u>`
          : part.removed
          ? ""
          : part.value;
      })
      .join("");
    navigator.clipboard.writeText(formattedDiff);
  };

  return (
    <div className="flex justify-center items-center min-h-screen w-full">
      <div className="bg-white shadow-lg rounded-lg p-5 w-5/6">
        <h1 className="text-xl font-semibold mb-4 text-center">
          "UNDERLINE THE PARTS YOU CORRECTED"
        </h1>
        <div className="flex flex-col md:flex-row md:space-x-4">
          <div className="w-full">
            <label
              htmlFor="originalText"
              className="block text-sm font-medium text-gray-700"
            >
              Original
            </label>
            <textarea
              id="originalText"
              className="m-2 p-4 border border-gray-300 rounded w-full h-64 resize-none"
              placeholder="Original Text"
              value={originalText}
              onChange={(e) => setOriginalText(e.target.value)}
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="modifiedText"
              className="block text-sm font-medium text-gray-700"
            >
              Modified
            </label>
            <textarea
              id="modifiedText"
              className="m-2 p-4 border border-gray-300 rounded w-full h-64 resize-none"
              placeholder="Modified Text"
              value={modifiedText}
              onChange={(e) => setModifiedText(e.target.value)}
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="diffResult"
            className="block text-sm font-medium text-gray-700"
          >
            Diff
          </label>
          <div
            id="diffResult"
            className="m-2 p-4 border border-gray-300 rounded w-full h-64 overflow-auto"
            dangerouslySetInnerHTML={{ __html: diff }}
          />
        </div>
        <div className="flex justify-between items-center">
          <button
            className="my-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition-colors"
            onClick={copyToClipboard}
          >
            Copy
          </button>
          <p className="text-sm text-gray-600">
            ... this can be directly pasted into Jupiter
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
