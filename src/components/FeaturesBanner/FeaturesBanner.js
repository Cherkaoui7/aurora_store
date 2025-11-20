import React from 'react';
import { FiTruck, FiShield, FiRefreshCw } from 'react-icons/fi';
import styles from './FeaturesBanner.module.css';

const FeaturesBanner = () => {
  return (
    <div className={styles.banner}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.feature}>
          <FiTruck className={styles.icon} />
          <span><strong>Fast Delivery:</strong> 2-3 day shipping.</span>
        </div>
        <div className={styles.feature}>
          <FiShield className={styles.icon} />
          <span><strong>Secure Payment:</strong> 100% secure checkout.</span>
        </div>
        <div className={styles.feature}>
          <FiRefreshCw className={styles.icon} />
          <span><strong>Easy Returns:</strong> 30-day return policy.</span>
        </div>
      </div>
    </div>
  );
};

export default FeaturesBanner;