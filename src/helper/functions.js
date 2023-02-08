const deCodeString = (string) => {
  const textArea = document.createElement("textarea");
  const newText = (textArea.innerHTML = string);

  return newText;
};

export { deCodeString };
