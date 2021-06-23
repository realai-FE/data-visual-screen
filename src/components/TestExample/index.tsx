import * as React from 'react';
import { useEffect } from 'react';
import resources from '@/api';
const { testFetch } = resources;

export interface IAppProps {}

export default function TestExample(props: IAppProps) {
  useEffect(() => {
    testFetch().then((res: any) => {
      console.log('res', res);
    });
  }, []);
  return <div></div>;
}
