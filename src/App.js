import React, { useState } from "react";
import LinkShortener from "./components/LinkShortener";

import CopyToClipboard from "react-copy-to-clipboard";
import "./App.css";

function App() {
  const [shortLink, setShortLink] = useState("");
  const [error, setError] = useState(null);
  const [copy, setCopy] = useState(false);

  const shortenLinkHandler = async (urlLink) => {
    try {
      const response = await fetch(
        `https://api.shrtco.de/v2/shorten?url=${urlLink}`
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      setShortLink(data.result.full_short_link2);
    } catch (error) {
      setError(error.message);
    }
  };

  function copyLinkHandler() {
    setCopy(true);
  }
  function hideSection() {
    setShortLink("");
    setCopy(false);
    setError(null);
  }

  return (
    <React.Fragment>
      <section>
        <LinkShortener
          onGenerateLink={shortenLinkHandler}
          hideSection={hideSection}
        />
      </section>
      {shortLink && (
        <section>
          <p>{shortLink}</p>
          <CopyToClipboard text={shortLink} onCopy={copyLinkHandler}>
            <button>{copy ? "Copied" : "Copy"}</button>
          </CopyToClipboard>
        </section>
      )}
      {error && (
        <section>
          <p>{error}</p>
        </section>
      )}
    </React.Fragment>
  );
}

export default App;
