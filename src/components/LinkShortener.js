import React, { useRef } from "react";

import classes from "./LinkShortener.module.css";

function LinkShortener(props) {
  const urlRef = useRef("");
  function submitHandler(event) {
    event.preventDefault();

    const urlLink = urlRef.current.value;

    if (urlLink) {
      props.onGenerateLink(urlLink);
      urlRef.current.value = "";
    } else {
      alert("Enter a valid URL!");
      return;
    }
  }

  return (
    <form onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="link">URL Link Shortener</label>
        <input
          type="url"
          id="link"
          ref={urlRef}
          placeholder="Paste a url"
          onChange={props.hideSection}
        />
      </div>
      <button>Generate Link</button>
    </form>
  );
}

export default LinkShortener;
