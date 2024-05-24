'use client';
import { pivotData } from './data';
import './pivot.css';
import { PivotViewComponent, FieldList, CalculatedField, Inject } from '@syncfusion/ej2-react-pivotview';
import { useState, useEffect } from 'react';
import { registerLicense } from '@syncfusion/ej2-base';

registerLicense('Ngo9BigBOggjHTQxAR8/V1NBaF1cXmhPYVJwWmFZfVpgdV9CZlZRRGYuP1ZhSXxXdkBiXn9fdHJVR2hVVkY=');

const PivotTable = () => {
  const [height, setHeight] = useState<number>();

  useEffect(() => {
    if (typeof window !== "undefined") {
      var height = window.innerHeight - 50;
      setHeight(height);
    }
  }, []);

  return (
    <PivotViewComponent
      height={`${height}px`}
      width="100%"
      dataSourceSettings={{
        dataSource: pivotData,
        rows: [],
        columns: [],
        values: [],
        filters: [],
        calculatedFieldSettings: [{
          name: "Total",
          formula: '"Sum(Taxable Type)" + "Sum(Property Type)"'
        }]
      }}
      showFieldList={true}
      allowCalculatedField={true}
    >
      <Inject services={[FieldList, CalculatedField]} />
    </PivotViewComponent>
  )
}

export default PivotTable