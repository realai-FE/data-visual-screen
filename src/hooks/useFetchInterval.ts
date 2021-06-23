import { useState, useEffect, useRef } from 'react';
import isEqual from 'lodash/isEqual';
function useFetchInterval(
  service: (...args: any[]) => Promise<any>,
  wait?: number,
): any {
  const preDataRef = useRef<any>();
  const timerRef = useRef<any>(null);
  const [resData, setResData] = useState([]);
  useEffect(() => {
    const fetch = (...args: any[]) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      service(...args)
        .then((res) => {
          if (res.code === 0) {
            const { data } = res;
            if (isEqual(preDataRef.current, data)) {
              return;
            } else {
              preDataRef.current = data;

              setResData(data);
            }
            preDataRef.current = data;
          }
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          if (wait) {
            timerRef.current = setTimeout(() => {
              fetch(...args);
            }, wait);
          }
        });
    };
    fetch();
    return () => {
      clearTimeout(timerRef.current);
    };
  }, [service]);
  return resData;
}

export default useFetchInterval;
