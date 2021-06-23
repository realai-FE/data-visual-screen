import React from 'react';
import Container from '@/components/Container';
import TestExample from '@/components/TestExample';

import styles from './index.less';

export default () => {
  return (
    <div className={styles.wrap}>
      <Container className={styles.container}>
        <>
          <TestExample />
        </>
      </Container>
    </div>
  );
};
