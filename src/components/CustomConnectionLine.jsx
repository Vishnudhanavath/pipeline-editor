import React from 'react';

function CustomConnectionLine({
  fromX,
  fromY,
  toX,
  toY,
  connection,
  isValidConnection
}) {
  const isValid = connection && isValidConnection
    ? isValidConnection(connection)
    : true;

  const path = `M${fromX},${fromY} C ${fromX + 100},${fromY} ${toX - 100},${toY} ${toX},${toY}`;

  return (
    <path
      fill="none"
      stroke={isValid ? 'green' : 'red'}
      strokeWidth={2}
      strokeDasharray={isValid ? '0' : '5,5'}
      d={path}
    />
  );
}

export default CustomConnectionLine;
