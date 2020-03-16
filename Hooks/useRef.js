import React, { useRef, forwardRef, useImperativeHandle } from "react";

function Child(props, ref) {
  const oneRef = useRef();
  const twoRef = useRef();
  useImperativeHandle(ref, () => {
    return {
      focus() {
        oneRef.current.focus();
      },
      setValue(newValue) {
        twoRef.current.value = newValue;
      },
      // twoRef
    };
  });
  return (
    <>
      <input ref={oneRef} />
      <input ref={twoRef} />
    </>
  );
}
let FrowardChildRef = forwardRef(Child);

function App() {
  const parentRef = useRef();
  const handleClick = () => {
    parentRef.current.focus();
    parentRef.current.setValue(123);

    // parentRef.current.twoRef.current.value = "00000";
    console.log(parentRef);
  };
  return (
    <div className="App">
      <FrowardChildRef ref={parentRef} />
      <button onClick={handleClick}>事件</button>
    </div>
  );
}
