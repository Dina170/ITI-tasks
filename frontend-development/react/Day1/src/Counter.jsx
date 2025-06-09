import React, { useState } from "react";

function Counter() {
  const [count, setCount] = useState(1);
  return (
    <div className="counter">
      <button onClick={() => setCount(count + 1)}>+</button>
      <p>{count}</p>
      <button onClick={() => setCount(count - 1)}>-</button>
    </div>
  );
}

export default Counter;
