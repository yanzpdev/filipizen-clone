import Custom404 from '@/app/components/layout/Custom404';

interface DynamicPageProps {
  params: {serviceUrl: string}
}

const page:React.FC<DynamicPageProps> = async({params}) => {
  const acceptedUrlParams: string[] = [];
  
  if (acceptedUrlParams.includes(params.serviceUrl)) {
    return (
      <div>{params.serviceUrl}</div>
    )
  }

  else {
    return <Custom404 />
  }
}

export default page