import { HashLoader } from 'react-spinners';

interface LoadingInPageProps {
  message?: string;
}

export default function LoadingInPage({ message }: LoadingInPageProps) {
    return (
      <div className="m-2">
        {message && <p>{message}</p>}
        <HashLoader loading={true} color={'#687387'} />
      </div>
    );
}