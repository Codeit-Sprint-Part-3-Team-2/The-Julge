import React, { useState, useEffect } from 'react';
import { PulseLoader } from 'react-spinners';

const LoadingSpinner = ({ size = 15, color = '#ea3c12' }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setData('');
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      {loading ? <PulseLoader color={color} size={size} /> : <p>{data}</p>}
    </div>
  );
};

export default LoadingSpinner;
