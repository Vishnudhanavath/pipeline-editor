import React from 'react';
function StatusBanner({ validation }) {
  return (
    <div className={`dag-status ${validation.isValid ? 'valid' : 'invalid'} status`}>
      {validation.isValid
        ? "Valid DAG"
        : `Invalid DAG: ${validation.reason}`}
    </div>
  );
}

export default StatusBanner;
