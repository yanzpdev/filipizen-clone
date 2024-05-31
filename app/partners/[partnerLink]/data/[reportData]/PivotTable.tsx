'use client';
import { flattenedData } from './data';
import './pivot.css';
import { PivotViewComponent, FieldList, CalculatedField, Inject, ValueSortSettings } from '@syncfusion/ej2-react-pivotview';
import { useState, useEffect } from 'react';
import { registerLicense } from '@syncfusion/ej2-base';
import { FilterType } from '@syncfusion/ej2-pivotview';

registerLicense('Ngo9BigBOggjHTQxAR8/V1NBaF1cXmhPYVJwWmFZfVpgdV9CZlZRRGYuP1ZhSXxXdkBiXn9fdHJVR2hVVkY=');
const PIVOT_TABLE_CONFIG_KEY = 'pivotTableConfig'; 

const PivotTable = ({data}: any) => {
  const [height, setHeight] = useState<number>();
  const [pivotRows, setPivotRows] = useState<any>([{name: 'Property Class', caption: 'Property Class'}, {name: 'Property Type', caption: 'Property Type'}]);
  const [pivotCols, setPivotCols] = useState<any>([{name: 'Year', caption: 'Year'}, {name: 'Month', caption: 'Month'}]);
  const [pivotValues, setPivotValues] = useState<any>([{name: 'Market Value', caption: 'Market Value'}, {name: 'Assessed Value', caption: 'Assessed Value'}]);
  const [pivotFilters, setPivotFilters] = useState<any>([]);
  const currentYear = new Date().getFullYear();
  const yearsToShow = Array.from({length: 5}, (_, i) => (currentYear - i).toString());

  const pivotdata = data;
  const dataSourceSettings = {
    dataSource: pivotdata,
    expandAll: false,
    rows: pivotRows,
    columns: pivotCols,
    enableSorting: false,
    values: pivotValues,
    filters: pivotFilters,
    filterSettings: [
      { name: 'Year', type: 'Include' as FilterType, items: yearsToShow }
    ],
    // sortSettings: [{name: 'Year', mode: 'Ascending'}, {name: 'Month', mode: 'Descending'}],
    formatSettings: [
      {name: 'Assessed Value', format: '#,##0.00'}, 
      {name: 'Market Value', format: '#,##0.00'}
    ],
    calculatedFieldSettings: [{
      name: 'Total',
      formula: 'assessedValue + marketValue'
    }]
  };

  console.log(pivotdata);
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
      dataSourceSettings={dataSourceSettings}
      showFieldList={true}
      allowCalculatedField={true}
      fieldListRefreshed={handleFieldListChange}
    >
      <Inject services={[FieldList, CalculatedField]} />
    </PivotViewComponent>
  )
}

export default PivotTable