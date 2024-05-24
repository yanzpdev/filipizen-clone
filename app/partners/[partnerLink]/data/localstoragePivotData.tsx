registerLicense('Ngo9BigBOggjHTQxAR8/V1NBaF1cXmhPYVJwWmFZfVpgdV9CZlZRRGYuP1ZhSXxXdkBiXn9fdHJVR2hVVkY=');
import { pivotData } from './data';
import './pivot.css';
import { PivotViewComponent, FieldList, CalculatedField, Inject } from '@syncfusion/ej2-react-pivotview';
import { useState, useEffect } from 'react';
import { registerLicense } from '@syncfusion/ej2-base';

const PIVOT_TABLE_CONFIG_KEY = 'pivotTableConfig'; 

const PivotTable = () => {
  const [height, setHeight] = useState<number>();
  const [pivotRows, setPivotRows] = useState<any>([]);
  const [pivotCols, setPivotCols] = useState<any>([]);
  const [pivotValues, setPivotValues] = useState<any>([]);
  const [pivotFilters, setPivotFilters] = useState<any>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      var height = window.innerHeight - 50;
      setHeight(height);
    }

    const storedConfig = localStorage.getItem(PIVOT_TABLE_CONFIG_KEY);
    if (storedConfig) {
      const { rows, columns, values, filters } = JSON.parse(storedConfig);
      setPivotRows(rows);
      setPivotCols(columns);
      setPivotValues(values);
      setPivotFilters(filters);
    }
  }, []);

  const handleFieldListChange = (args: any) => {
    const newConfig = {
      rows: args.dataSourceSettings.rows || [],
      columns: args.dataSourceSettings.columns || [],
      values: args.dataSourceSettings.values || [],
      filters: args.dataSourceSettings.filters || []
    };
    
    setPivotRows(newConfig.rows);
    setPivotCols(newConfig.columns);
    setPivotValues(newConfig.values);
    setPivotFilters(newConfig.filters);
    
    localStorage.setItem(PIVOT_TABLE_CONFIG_KEY, JSON.stringify(newConfig));
  };

  return (
    <PivotViewComponent
      height={`${height}px`}
      width="100%"
      dataSourceSettings={{
        dataSource: pivotData,
        rows: pivotRows,
        columns: pivotCols,
        values: pivotValues,
        filters: pivotFilters,
        calculatedFieldSettings: [{
          name: "Total",
          formula: '"Sum(Taxable Type)" + "Sum(Property Type)"'
        }]
      }}
      showFieldList={true}
      allowCalculatedField={true}
      fieldListRefreshed={handleFieldListChange}
    >
      <Inject services={[FieldList, CalculatedField]} />
    </PivotViewComponent>
  )
}

export default PivotTable