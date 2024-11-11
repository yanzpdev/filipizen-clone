import { 
  ChartComponent, 
  SeriesCollectionDirective, 
  SeriesDirective, 
  Inject, 
  ColumnSeries, 
  Category, 
  Tooltip, 
  Legend, 
  LineSeries,
  ScatterSeries,
  AccumulationChartComponent,
  AccumulationLegend,
  AccumulationTooltip,
  PieSeries,
  AccumulationSeriesCollectionDirective,
  AccumulationSeriesDirective
} from '@syncfusion/ej2-react-charts';
import { registerLicense } from '@syncfusion/ej2-base';
import ContentWrapper from './ContentWrapper';
import Link from 'next/link';
import Image from 'next/image';

registerLicense('ORg4AjUWIQA/Gnt2UFhhQlJBfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hTX5UdExjWn5fc3dWRGFU');
interface BarData {
  x: string;
  y: number;
  y1: number;
}

const ChartDataComponent = ({pivotData}: any) => {

  const barData: BarData[] = pivotData.map((item: any) => ({
    x: item['Property Type'],
    y: item['Assessed Value'],
    y1: item['Market Value']
  }));
  
  const chartData = barData;
  return (
    <>
      {/* <ContentWrapper className='flex items-end gap-2 text-xs mb-5'>
        Powered by 
        <Link href='https://www.syncfusion.com'>
          <Image 
            src={`/assets/syncfusion.svg`}
            alt={`Syncfusion`}
            width={100}
            height={100}
            className='h-7 w-auto'
          />
        </Link>
      </ContentWrapper> */}
      {/* <ContentWrapper className='flex items-center justify-center w-full gap-5'>
        <button>Bar</button>
        <button>Pie</button>
        <button>Line</button>
      </ContentWrapper> */}
      <ChartComponent
        id="charts"
        primaryXAxis={{ valueType: 'Category', labelStyle: { fontFamily: 'Arial, sans-serif' } }}
        primaryYAxis={{ labelStyle: { fontFamily: 'Arial, sans-serif' } }}
        title="Asset Distribution"
        titleStyle={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}
        tooltip={{ enable: true, textStyle: { fontFamily: 'Arial, sans-serif' } }}
        legendSettings={{ visible: true, textStyle: { fontFamily: 'Arial, sans-serif' } }}
      >
        <Inject services={[ColumnSeries, Category, Tooltip, Legend]} />
        <SeriesCollectionDirective>
          <SeriesDirective dataSource={chartData} xName="x" yName="y" name="Assessed Value" type="Column" />
          <SeriesDirective dataSource={chartData} xName="x" yName="y1" name="Market Value" type="Column" />
        </SeriesCollectionDirective>
      </ChartComponent>
    </>
  )
}

export default ChartDataComponent