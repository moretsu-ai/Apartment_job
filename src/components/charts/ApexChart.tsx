import React from 'react';
import Chart from 'react-apexcharts';
import { Props as ApexProps } from 'react-apexcharts';

export const ApexChart: React.FC<ApexProps> = (props) => {
  return (
    <div className="apexcharts-wrapper">
      <Chart {...props} />
    </div>
  );
};

